import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { supabase } from '$lib/supabaseClient';
import { 
    SMTP_HOST, SMTP_USER, SMTP_PASS, RECAPTCHA_SECRET_KEY 
} from '$env/static/private';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        
        // Honeypot proti botům
        if (data.get('website')) return fail(400, { error: 'Bot detected.' });

        const name = data.get('name')?.toString().trim();
        const email = data.get('email')?.toString().trim();
        const subject = data.get('typ_projektu')?.toString();
        const message = data.get('message')?.toString().trim();
        const gdpr = data.get('gdpr') === 'on' || data.get('gdpr') === 'true';
        const attachments = data.getAll('attachment') as File[];
        const token = data.get('recaptcha_token')?.toString();

        // 1. Validace na straně serveru
        if (!name || name.length < 2) return fail(400, { error: 'Jméno je příliš krátké.' });
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(400, { error: 'Neplatný e-mail.' });
        if (!message || message.length < 5) return fail(400, { error: 'Zpráva je příliš krátká.' });
        if (!gdpr) return fail(400, { error: 'Souhlas s GDPR je povinný.' });

        // 2. ReCAPTCHA ověření
        if (!token) return fail(400, { error: 'Ověření proti spamu selhalo.' });
        
        try {
            const resp = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`, { method: 'POST' });
            const recaptchaResult = await resp.json();
            if (!recaptchaResult.success) return fail(400, { error: 'Spam ochrana vás vyhodnotila jako podezřelý subjekt.' });
        } catch (e) {
            return fail(400, { error: 'Nelze ověřit reCAPTCHA.' });
        }

        // 3. ZÁLOHA DO SUPABASE (Opraveno pro ignorování chyb typů)
        try {
            // Používáme as any, aby TS nekřičel, pokud tabulka ještě neexistuje v typech
            await (supabase.from('contact_messages') as any).insert({
                name, 
                email, 
                subject: subject || 'Bez předmětu', 
                message, 
                gdpr_consent: gdpr
            });
        } catch (e) {
            console.warn('Supabase backup failed. Table might be missing:', e);
            // Nechceme zastavit odesílání mailu, pokud selže jen záloha
        }

        // 4. SMTP ODESLÁNÍ (WP-hosting)
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: 465,
            secure: true,
            auth: { user: SMTP_USER, pass: SMTP_PASS }
        });

        try {
            const mailAttachments = await Promise.all(
                attachments.filter(f => f.size > 0).map(async (f) => ({
                    filename: f.name,
                    content: Buffer.from(await f.arrayBuffer())
                }))
            );

            await transporter.sendMail({
                from: `"Web Cathedra" <${SMTP_USER}>`,
                replyTo: email,
                to: SMTP_USER,
                subject: `[${subject?.toUpperCase() || 'KONTAKT'}] ${name}`,
                text: `Jméno: ${name}\nEmail: ${email}\n\nZpráva:\n${message}`,
                attachments: mailAttachments
            });

            return { success: true };
        } catch (e) {
            console.error('SMTP Mail Error:', e);
            return fail(500, { error: 'E-mail se nepodařilo odeslat. Zkuste to později.' });
        }
    }
};