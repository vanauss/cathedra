import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { supabase } from '$lib/supabaseClient';
import { 
    SMTP_HOST, SMTP_USER, SMTP_PASS, RECAPTCHA_SECRET_KEY 
} from '$env/static/private';

/**
 * Pomocná funkce pro prevenci XSS v HTML emailu
 */
function escapeHtml(unsafe: string) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        // 1. Honeypot - okamžitý stop pro boty
        if (data.get('website')) {
            return fail(400, { error: 'Bot detected.' });
        }

        // 2. Sběr dat a důkladný trim
        const name = data.get('name')?.toString().trim() || '';
        const email = data.get('email')?.toString().trim() || '';
        const message = data.get('message')?.toString().trim() || '';
        const project_type = data.get('typ_projektu')?.toString().trim() || '';
        const gdpr = data.get('gdpr') === 'on' || data.get('gdpr') === 'true';
        const token = data.get('recaptcha_token')?.toString();
        const attachments = data.getAll('attachment') as File[];

        // 3. Validace (shodná s frontendem + bezpečnostní limity)
        if (!name || name.length < 2) return fail(400, { error: 'Jméno je příliš krátké.' });
        if (name.length > 100) return fail(400, { error: 'Jméno je příliš dlouhé.' });

        if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            return fail(400, { error: 'Neplatný formát emailu.' });
        }

        if (!message || message.length < 5) return fail(400, { error: 'Zpráva je příliš krátká.' });
        if (message.length > 5000) return fail(400, { error: 'Zpráva je příliš dlouhá.' });

        if (!project_type) return fail(400, { error: 'Vyberte prosím typ projektu.' });
        if (!gdpr) return fail(400, { error: 'Souhlas s GDPR je povinný.' });

        // 4. Filtrace a validace příloh
        const validAttachments = attachments.filter(f => f.size > 0 && f.name && f.name !== 'undefined');
        
        if (validAttachments.length > 4) {
            return fail(400, { error: 'Maximálně lze poslat 4 přílohy.' });
        }

        const allowedTypes = [
            'application/pdf', 'image/jpeg', 'image/png', 'image/webp',
            'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        const totalSize = validAttachments.reduce((acc, f) => acc + f.size, 0);
        if (totalSize > 25 * 1024 * 1024) {
            return fail(400, { error: 'Celková velikost souborů přesahuje 25 MB.' });
        }

        for (const file of validAttachments) {
            if (!allowedTypes.includes(file.type)) {
                return fail(400, { error: `Nepovolený formát souboru: ${file.name}` });
            }
        }

        // 5. reCAPTCHA v3 s timeoutem (5s)
        if (!token) return fail(400, { error: 'Chybí bezpečnostní token.' });
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const resp = await fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`, 
                { method: 'POST', signal: controller.signal }
            );
            clearTimeout(timeoutId);
            
            const recaptchaResult = await resp.json();
            if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
                return fail(400, { error: 'Spamová ochrana vyhodnotila požadavek jako podezřelý.' });
            }
        } catch (e) {
            console.error('reCAPTCHA error:', e);
            return fail(500, { error: 'Selhalo bezpečnostní ověření.' });
        }

        // 6. Nodemailer (Odeslání E-mailu)
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: 465,
            secure: true,
            auth: { user: SMTP_USER, pass: SMTP_PASS }
        });

        try {
            const mailAttachments = await Promise.all(
                validAttachments.map(async (f) => ({
                    filename: f.name,
                    content: Buffer.from(await f.arrayBuffer())
                }))
            );

            const subjectType = project_type.charAt(0).toUpperCase() + project_type.slice(1);

            await transporter.sendMail({
                from: `"Web Cathedra" <${SMTP_USER}>`,
                replyTo: email,
                to: SMTP_USER,
                subject: `Poptávka [${subjectType}]: ${name}`,
                text: `Od: ${name} (${email})\nTyp: ${project_type}\n\nZpráva:\n${message}`,
                html: `
                    <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
                        <h2 style="border-bottom: 2px solid #ccc; padding-bottom: 10px;">Nová poptávka z webu</h2>
                        <p><strong>Od:</strong> ${escapeHtml(name)} (<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>)</p>
                        <p><strong>Typ projektu:</strong> ${escapeHtml(project_type)}</p>
                        <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #333; margin: 20px 0;">
                            <strong>Zpráva:</strong><br>
                            ${escapeHtml(message).replace(/\n/g, '<br>')}
                        </div>
                        <p style="font-size: 0.8rem; color: #888;">
                            Přílohy: ${validAttachments.length} | Velikost: ${(totalSize / (1024 * 1024)).toFixed(2)} MB
                        </p>
                    </div>
                `,
                attachments: mailAttachments
            });

            // 7. Supabase Logování (do inquiry_messages)
            // Používáme as any, pokud TypeScript stále zlobí kvůli neaktualizovaným typům
            const { error: dbError } = await (supabase.from('inquiry_messages') as any).insert({
                name,
                email,
                project_type,
                message,
                gdpr_consent: gdpr,
                attachments_count: validAttachments.length,
                total_size_mb: parseFloat((totalSize / (1024 * 1024)).toFixed(2))
            });

            if (dbError) console.error('Supabase error:', dbError.message);

            return { success: true };
        } catch (e) {
            console.error('Process error:', e);
            return fail(500, { error: 'Chyba při zpracování požadavku.' });
        }
    }
};