document.addEventListener('DOMContentLoaded', () => {

    /* ── Language toggle ── */
    const savedLang = localStorage.getItem('bespoke-lang') || 'en';

    function applyLanguage(lang) {
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = lang === 'bm' ? (el.dataset.bm || el.dataset.en) : el.dataset.en;
        });
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        localStorage.setItem('bespoke-lang', lang);
        window.__currentLang = lang;
        document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });

    applyLanguage(savedLang);

    /* ── Hamburger / mobile menu ── */
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            hamburger.classList.toggle('open');
        });
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.classList.remove('open');
            });
        });
    }

    /* ── Sticky header shadow ── */
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    /* ── Contact form (basic prevent-default) ── */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Thank you! We will get back to you soon.');
            contactForm.reset();
        });
    }

});
