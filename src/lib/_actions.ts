export function reveal(node: HTMLElement, params = { threshold: 0.1 }) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                node.classList.add('visible');
                observer.unobserve(node);
            }
        });
    }, { threshold: params.threshold });

    node.classList.add('reveal'); 
    observer.observe(node);

    return {
        destroy() {
            observer.unobserve(node);
        }
    };
}