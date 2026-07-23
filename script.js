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

    /* ── Three.js 3D Interconnected Dynamic Network Background ── */
    const canvas = document.getElementById('three-network-canvas');
    if (canvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 280;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Node points geometry & particles
        const nodeCount = 95;
        const nodes = [];
        const positions = new Float32Array(nodeCount * 3);
        const colors = new Float32Array(nodeCount * 3);

        const colorPalette = [
            new THREE.Color(0x38bdf8), // Cyan
            new THREE.Color(0x818cf8), // Indigo
            new THREE.Color(0xc084fc), // Purple
            new THREE.Color(0x34d399)  // Emerald
        ];

        for (let i = 0; i < nodeCount; i++) {
            const x = (Math.random() - 0.5) * 650;
            const y = (Math.random() - 0.5) * 450;
            const z = (Math.random() - 0.5) * 300;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;

            nodes.push({
                x, y, z,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                vz: (Math.random() - 0.5) * 0.45
            });
        }

        const pointGeometry = new THREE.BufferGeometry();
        pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        pointGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const pointMaterial = new THREE.PointsMaterial({
            size: 4.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending
        });

        const pointCloud = new THREE.Points(pointGeometry, pointMaterial);
        scene.add(pointCloud);

        // Dynamic Connecting Lines
        const maxDistance = 115;
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });

        const lineGeometry = new THREE.BufferGeometry();
        const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lineMesh);

        // Mouse Parallax Interaction
        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
        });

        function animate() {
            requestAnimationFrame(animate);

            const posArr = pointGeometry.attributes.position.array;
            const linePositions = [];

            for (let i = 0; i < nodeCount; i++) {
                const node = nodes[i];

                node.x += node.vx;
                node.y += node.vy;
                node.z += node.vz;

                if (Math.abs(node.x) > 340) node.vx *= -1;
                if (Math.abs(node.y) > 240) node.vy *= -1;
                if (Math.abs(node.z) > 170) node.vz *= -1;

                posArr[i * 3] = node.x;
                posArr[i * 3 + 1] = node.y;
                posArr[i * 3 + 2] = node.z;

                for (let j = i + 1; j < nodeCount; j++) {
                    const node2 = nodes[j];
                    const dx = node.x - node2.x;
                    const dy = node.y - node2.y;
                    const dz = node.z - node2.z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < maxDistance) {
                        linePositions.push(node.x, node.y, node.z);
                        linePositions.push(node2.x, node2.y, node2.z);
                    }
                }
            }

            pointGeometry.attributes.position.needsUpdate = true;
            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

            scene.rotation.y += 0.0008;
            scene.rotation.x += 0.0004;

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    /* ── Interactive 3D Rotation for 4 Hero Showcase Cards ── */
    const heroVisual = document.querySelector('.hero-visual');
    const heroGrid   = document.querySelector('.hero-glass-grid');

    if (heroVisual && heroGrid) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            heroGrid.style.animation = 'none';
            heroGrid.style.transform = `rotateX(${y * -35}deg) rotateY(${x * 35}deg) translateZ(20px)`;
        });

        heroVisual.addEventListener('mouseleave', () => {
            heroGrid.style.transform = '';
            heroGrid.style.animation = 'heroClusterFloat 10s ease-in-out infinite alternate';
        });
    }

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
