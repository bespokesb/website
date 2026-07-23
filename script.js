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

    /* ── Hamburger / Mobile menu drawer ── */
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');

    function closeMobileMenu() {
        if (navMenu && hamburger) {
            navMenu.classList.remove('open');
            hamburger.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    /* ── Sticky header background change on scroll ── */
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    /* ── Active Section Link Tracking (IntersectionObserver) ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${id}`) {
                            navLinks.forEach(l => l.classList.remove('active'));
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    /* ── Subtle Mouse Movement Glow for Glass Cards ── */
    const glassCards = document.querySelectorAll('.glass-card, .hero-glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* ── Contact form handling ── */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const currentLang = localStorage.getItem('bespoke-lang') || 'en';
            const msg = currentLang === 'bm' 
                ? 'Terima kasih! Kami akan menghubungi anda tidak lama lagi.' 
                : 'Thank you! We will get back to you soon.';
            alert(msg);
            contactForm.reset();
        });
    }

});
