// Language Toggle Functionality
const translations = {
    en: {
        // Navigation
        "Home": "Home",
        "Services": "Services",
        "About": "About",
        "Contact": "Contact",
        
        // Hero Section
        "Transform Your Business with": "Transform Your Business with",
        "Cutting-Edge IT Solutions": "Cutting-Edge IT Solutions",
        "Your trusted partner for SaaS software, server optimization, custom web applications, mobile development, and comprehensive IT training in Kuala Lumpur.": "Your trusted partner for SaaS software, server optimization, custom web applications, mobile development, and comprehensive IT training in Kuala Lumpur.",
        "Our Services": "Our Services",
        "Get In Touch": "Get In Touch",
        
        // Services Section
        "Our Services": "Our Services",
        "Comprehensive IT solutions tailored for your business needs": "Comprehensive IT solutions tailored for your business needs",
        "SaaS Software Solutions": "SaaS Software Solutions",
        "Scalable cloud-based software solutions for modern businesses": "Scalable cloud-based software solutions for modern businesses",
        "Server Tuning & Optimization": "Server Tuning & Optimization",
        "Maximize performance and efficiency of your server infrastructure": "Maximize performance and efficiency of your server infrastructure",
        "Software & Server Deployment": "Software & Server Deployment",
        "Professional deployment services for software and server environments": "Professional deployment services for software and server environments",
        "Custom Web Applications": "Custom Web Applications",
        "Tailored web applications built to meet your specific requirements": "Tailored web applications built to meet your specific requirements",
        "Mobile App Development": "Mobile App Development",
        "Native and cross-platform mobile applications for iOS and Android": "Native and cross-platform mobile applications for iOS and Android",
        "IT Training Programs": "IT Training Programs",
        "Comprehensive training programs to upskill your team in latest technologies": "Comprehensive training programs to upskill your team in latest technologies",
        
        // About Section
        "About BeSpoke Integrated": "About BeSpoke Integrated",
        "We are a leading IT solutions provider based in Kuala Lumpur, Malaysia, dedicated to helping businesses transform through innovative technology solutions. With years of experience and a team of skilled professionals, we deliver excellence in every project we undertake.": "We are a leading IT solutions provider based in Kuala Lumpur, Malaysia, dedicated to helping businesses transform through innovative technology solutions. With years of experience and a team of skilled professionals, we deliver excellence in every project we undertake.",
        "Projects Completed": "Projects Completed",
        "Happy Clients": "Happy Clients",
        "Years Experience": "Years Experience",
        
        // Contact Section
        "Get In Touch": "Get In Touch",
        "Ready to transform your business? Contact us today!": "Ready to transform your business? Contact us today!",
        "Address": "Address",
        "Phone": "Phone",
        "Email": "Email",
        "Your Name / Nama Anda": "Your Name",
        "Your Email / Emel Anda": "Your Email",
        "Phone Number / Nombor Telefon": "Phone Number",
        "Your Message / Mesej Anda": "Your Message",
        "Send Message": "Send Message",
        
        // Footer
        "Your trusted IT solutions partner in Kuala Lumpur": "Your trusted IT solutions partner in Kuala Lumpur",
        "Quick Links": "Quick Links",
        "Services": "Services",
        "Contact Info": "Contact Info",
        "Laman Utama": "Home",
        "Perkhidmatan": "Services",
        "Tentang": "About",
        "Hubungi": "Contact"
    },
    bm: {
        // Navigation
        "Home": "Laman Utama",
        "Services": "Perkhidmatan",
        "About": "Tentang",
        "Contact": "Hubungi",
        
        // Hero Section
        "Transform Your Business with": "Ubah Suai Perniagaan Anda dengan",
        "Cutting-Edge IT Solutions": "Penyelesaian IT Termaju",
        "Your trusted partner for SaaS software, server optimization, custom web applications, mobile development, and comprehensive IT training in Kuala Lumpur.": "Rakan dipercayai anda untuk perisian SaaS, penoptimuman pelayan, aplikasi web khusus, pembangunan mudah alih, dan latihan IT menyeluruh di Kuala Lumpur.",
        "Our Services": "Perkhidmatan Kami",
        "Get In Touch": "Hubungi Kami",
        
        // Services Section
        "Our Services": "Perkhidmatan Kami",
        "Comprehensive IT solutions tailored for your business needs": "Penyelesaian IT menyeluruh yang disesuaikan untuk keperluan perniagaan anda",
        "SaaS Software Solutions": "Penyelesaian Perisian SaaS",
        "Scalable cloud-based software solutions for modern businesses": "Penyelesaian perisian berasaskan awan yang boleh diskalakan untuk perniagaan moden",
        "Server Tuning & Optimization": "Penalaian & Pengoptimuman Pelayan",
        "Maximize performance and efficiency of your server infrastructure": "Maksimumkan prestasi dan kecekapan infrastruktur pelayan anda",
        "Software & Server Deployment": "Penyediaan Perisian & Pelayan",
        "Professional deployment services for software and server environments": "Perkhidmatan penempatan profesional untuk perisian dan persekitaran pelayan",
        "Custom Web Applications": "Aplikasi Web Khusus",
        "Tailored web applications built to meet your specific requirements": "Aplikasi web yang disesuaikan dibina untuk memenuhi keperluan khusus anda",
        "Mobile App Development": "Pembangunan Aplikasi Mudah Alih",
        "Native and cross-platform mobile applications for iOS and Android": "Aplikasi mudah alih asli dan merentas platform untuk iOS dan Android",
        "IT Training Programs": "Program Latihan IT",
        "Comprehensive training programs to upskill your team in latest technologies": "Program latihan menyeluruh untuk menaikkan taraf kemahiran pasukan anda dalam teknologi terkini",
        
        // About Section
        "About BeSpoke Integrated": "Tentang BeSpoke Integrated",
        "We are a leading IT solutions provider based in Kuala Lumpur, Malaysia, dedicated to helping businesses transform through innovative technology solutions. With years of experience and a team of skilled professionals, we deliver excellence in every project we undertake.": "Kami ialah penyedia penyelesaian IT terkemuka yang berpusat di Kuala Lumpur, Malaysia, berdedikasi untuk membantu perniagaan berubah melalui penyelesaian teknologi inovatif. Dengan tahun pengalaman dan pasukan profesional mahir, kami memberikan kecemerlangan dalam setiap projek yang kami jalankan.",
        "Projects Completed": "Projek Diselesaikan",
        "Happy Clients": "Pelanggan Gembira",
        "Years Experience": "Tahun Pengalaman",
        
        // Contact Section
        "Get In Touch": "Hubungi Kami",
        "Ready to transform your business? Contact us today!": "Sedia untuk mengubah suai perniagaan anda? Hubungi kami hari ini!",
        "Address": "Alamat",
        "Phone": "Telefon",
        "Email": "Emel",
        "Your Name / Nama Anda": "Nama Anda",
        "Your Email / Emel Anda": "Emel Anda",
        "Phone Number / Nombor Telefon": "Nombor Telefon",
        "Your Message / Mesej Anda": "Mesej Anda",
        "Send Message": "Hantar Mesej",
        
        // Footer
        "Your trusted IT solutions partner in Kuala Lumpur": "Rakan penyelesaian IT dipercayai anda di Kuala Lumpur",
        "Quick Links": "Pautan Pantas",
        "Services": "Perkhidmatan",
        "Contact Info": "Maklumat Hubungan",
        "Laman Utama": "Laman Utama",
        "Perkhidmatan": "Perkhidmatan",
        "Tentang": "Tentang",
        "Hubungi": "Hubungi"
    }
};

// DOM Elements
const langButtons = document.querySelectorAll('.lang-btn');
const elementsToTranslate = document.querySelectorAll('[data-en][data-bm]');
const formInputs = document.querySelectorAll('.form-control');

// Current language
let currentLang = 'en';

// Initialize language functionality
function initLanguage() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        currentLang = savedLang;
        updateLanguageToggle();
        translatePage();
        updateFormPlaceholders();
    }
}

// Update language toggle buttons
function updateLanguageToggle() {
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Translate page content
function translatePage() {
    elementsToTranslate.forEach(element => {
        const enText = element.dataset.en;
        const bmText = element.dataset.bm;
        
        if (currentLang === 'en') {
            element.textContent = enText;
        } else {
            element.textContent = bmText;
        }
    });
}

// Update form input placeholders
function updateFormPlaceholders() {
    formInputs.forEach(input => {
        const currentPlaceholder = input.placeholder;
        const translationKey = Object.keys(translations.en).find(key => 
            translations.en[key] === currentPlaceholder || translations.bm[key] === currentPlaceholder
        );
        
        if (translationKey && translations[currentLang][translationKey]) {
            input.placeholder = translations[currentLang][translationKey];
        }
    });
}

// Language toggle event listeners
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentLang = button.dataset.lang;
        localStorage.setItem('preferredLanguage', currentLang);
        updateLanguageToggle();
        translatePage();
        updateFormPlaceholders();
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert(currentLang === 'en' ? 'Please fill in all required fields.' : 'Sila isi semua ruangan yang diperlukan.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(currentLang === 'en' ? 'Please enter a valid email address.' : 'Sila masukkan alamat emel yang sah.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('.btn-primary');
        const originalText = submitButton.textContent;
        submitButton.textContent = currentLang === 'en' ? 'Sending...' : 'Menghantar...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert(currentLang === 'en' 
                ? `Thank you ${name}! Your message has been sent successfully. We'll get back to you soon.` 
                : `Terima kasih ${name}! Mesej anda telah berjaya dihantar. Kami akan menghubungi anda segera.`
            );
            
            // Reset form
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and other elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize language
    initLanguage();
});

// Mobile menu toggle (basic implementation)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Add CSS for mobile menu (if needed)
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            gap: 1rem;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Add some interactive hover effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitleSub = document.querySelector('.hero-title-sub');
    if (heroTitleSub) {
        const originalText = heroTitleSub.textContent;
        setTimeout(() => {
            typeWriter(heroTitleSub, originalText, 100);
        }, 500);
    }
});

// Console welcome message
console.log(`
🚀 BeSpoke Integrated Sdn Bhd - IT Solutions
📍 F-05-06, 5th Floor, Block F, StarParc Point, Jln Taman Ibu Kota, 53300 Kuala Lumpur
📞 017-2388058
✨ Ready to transform your business with cutting-edge IT solutions!
`);