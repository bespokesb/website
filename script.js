/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #2563eb;
    --primary-dark: #1d4ed8;
    --secondary-color: #f59e0b;
    --accent-color: #10b981;
    --text-dark: #1f2937;
    --text-light: #6b7280;
    --bg-light: #f8fafc;
    --bg-white: #ffffff;
    --border-color: #e5e7eb;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-alt: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    background-color: var(--bg-white);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header Styles */
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
    z-index: 1000;
    transition: all 0.3s ease;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
}

.nav-brand h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-link {
    text-decoration: none;
    color: var(--text-dark);
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

.nav-link:hover {
    color: var(--primary-color);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

.language-toggle {
    display: flex;
    gap: 0.5rem;
}

.lang-btn {
    padding: 0.5rem 1rem;
    border: 2px solid var(--primary-color);
    background: transparent;
    color: var(--primary-color);
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.lang-btn.active,
.lang-btn:hover {
    background: var(--primary-color);
    color: white;
}

.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
    gap: 4px;
}

.hamburger span {
    width: 25px;
    height: 3px;
    background: var(--text-dark);
    transition: all 0.3s ease;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="1" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="1" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
}

.hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 2;
}

.hero-text {
    color: white;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
}

.hero-title-main {
    display: block;
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
}

.hero-title-sub {
    display: block;
    background: var(--gradient-alt);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    line-height: 1.6;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.btn {
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-block;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.btn-primary {
    background: var(--secondary-color);
    color: white;
    box-shadow: var(--shadow);
}

.btn-primary:hover {
    background: #f59e0b;
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
}

.btn-secondary:hover {
    background: white;
    color: var(--primary-color);
    transform: translateY(-2px);
}

.hero-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-illustration {
    position: relative;
    width: 300px;
    height: 300px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
    justify-items: center;
}

.hero-illustration i {
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.8);
    animation: float 3s ease-in-out infinite;
}

.hero-illustration i:nth-child(1) { animation-delay: 0s; }
.hero-illustration i:nth-child(2) { animation-delay: 1s; }
.hero-illustration i:nth-child(3) { animation-delay: 2s; }
.hero-illustration i:nth-child(4) { animation-delay: 0.5s; }

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

/* Services Section */
.services {
    padding: 5rem 0;
    background: var(--bg-light);
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.section-subtitle {
    font-size: 1.2rem;
    color: var(--text-light);
    max-width: 600px;
    margin: 0 auto;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.service-card {
    background: var(--bg-white);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    text-align: center;
    border: 1px solid var(--border-color);
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
}

.service-icon {
    width: 80px;
    height: 80px;
    background: var(--gradient);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
}

.service-icon i {
    font-size: 2rem;
    color: white;
}

.service-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.service-description {
    color: var(--text-light);
    line-height: 1.6;
}

/* About Section */
.about {
    padding: 5rem 0;
    background: var(--bg-white);
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.about-text .section-title {
    margin-bottom: 1.5rem;
}

.about-description {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 2rem;
    line-height: 1.7;
}

.about-stats {
    display: flex;
    gap: 2rem;
}

.stat {
    text-align: center;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.stat-label {
    color: var(--text-light);
    font-weight: 500;
}

.about-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-placeholder {
    width: 400px;
    height: 300px;
    background: var(--gradient);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
}

.image-placeholder i {
    font-size: 6rem;
    color: rgba(255, 255, 255, 0.8);
}

/* Contact Section */
.contact {
    padding: 5rem 0;
    background: var(--bg-light);
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
}

.contact-item {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
    align-items: flex-start;
}

.contact-icon {
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.contact-icon i {
    color: white;
    font-size: 1.2rem;
}

.contact-label {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 0.5rem;
}

.contact-text {
    color: var(--text-light);
    line-height: 1.6;
}

.contact-form {
    background: var(--bg-white);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: var(--shadow);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-control {
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    font-family: inherit;
}

.form-control:focus {
    outline: none;
    border-color: var(--primary-color);
}

.form-control::placeholder {
    color: var(--text-light);
}

/* Footer */
.footer {
    background: var(--text-dark);
    color: white;
    padding: 3rem 0 1rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.footer-subtitle {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: white;
}

.footer-description {
    color: #9ca3af;
    line-height: 1.6;
}

.footer-links {
    list-style: none;
}

.footer-links li {
    margin-bottom: 0.5rem;
}

.footer-links a {
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: var(--primary-color);
}

.footer-contact p {
    color: #9ca3af;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #374151;
    color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .hamburger {
        display: flex;
    }
    
    .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-title-main {
        font-size: 1.8rem;
    }
    
    .hero-buttons {
        justify-content: center;
    }
    
    .about-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .contact-content {
        grid-template-columns: 1fr;
    }
    
    .about-stats {
        justify-content: center;
    }
    
    .services-grid {
        grid-template-columns: 1fr;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .hero-illustration {
        width: 250px;
        height: 250px;
    }
    
    .hero-illustration i {
        font-size: 3rem;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 15px;
    }
    
    .hero {
        min-height: 80vh;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-title-main {
        font-size: 1.5rem;
    }
    
    .hero-description {
        font-size: 1rem;
    }
    
    .btn {
        padding: 0.8rem 1.5rem;
        font-size: 0.9rem;
    }
    
    .service-card {
        padding: 2rem;
    }
    
    .contact-form {
        padding: 2rem;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
}

/* Smooth animations */
@media (prefers-reduced-motion: no-preference) {
    .service-card,
    .btn,
    .nav-link {
        transition: all 0.3s ease;
    }
}

/* Accessibility */
@media (prefers-color-scheme: dark) {
    :root {
        --text-dark: #f9fafb;
        --text-light: #d1d5db;
        --bg-light: #111827;
        --bg-white: #1f2937;
        --border-color: #374151;
    }
    
    .header {
        background: rgba(31, 41, 55, 0.95);
    }
    
    .service-card,
    .contact-form {
        background: var(--bg-white);
    }
}
