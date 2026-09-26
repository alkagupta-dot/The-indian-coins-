/* ==========================================================================
   THE INDIAN COINS - ADVANCED INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE NAVIGATION TOGGLE
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    menuToggle.style.cssText = 'font-size: 1.5rem; color: var(--accent-gold); cursor: pointer; display: none;';
    
    if (navbar) {
        navbar.appendChild(menuToggle);
    }

    function checkResponsive() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            if (navLinks) navLinks.style.display = 'flex';
        }
    }
    
    checkResponsive();
    window.addEventListener('resize', checkResponsive);

    menuToggle.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 12, 16, 0.98)';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid var(--border-color)';
            menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        }
    });

    // 2. STICKY NAVBAR EFFECT ON SCROLL
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
            navbar.style.background = 'rgba(10, 12, 16, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(10, 12, 16, 0.95)';
        }
    });

    // 3. ADVANCED CONTACT FORM VALIDATION & MODAL POPUP
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');

            if (!nameInput || nameInput.value.trim().length < 3) {
                showNotification('Please enter a valid name (at least 3 characters).', 'error');
                return;
            }

            if (!emailInput || !validateEmail(emailInput.value)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            if (!messageInput || messageInput.value.trim().length < 5) {
                showNotification('Please enter a more detailed message.', 'error');
                return;
            }

            showSuccessModal(nameInput.value.trim());
            contactForm.reset();
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // 4. CUSTOM SUCCESS MODAL
    function showSuccessModal(userName) {
        const modalHtml = `
            <div id="customModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 9999; backdrop-filter: blur(5px);">
                <div style="background: var(--bg-secondary); border: 2px solid var(--accent-gold); padding: 40px; border-radius: 12px; max-width: 450px; text-align: center; color: var(--text-main); box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);">
                    <i class="fa-solid fa-circle-check" style="font-size: 4rem; color: #10b981; margin-bottom: 20px;"></i>
                    <h3 style="font-size: 1.8rem; margin-bottom: 10px; color: var(--accent-gold);">Thank You, ${userName}!</h3>
                    <p style="color: var(--text-muted); margin-bottom: 25px; line-height: 1.6;">Your message has been sent to <strong>THE INDIAN COINS</strong>. Our team will contact you shortly.</p>
                    <button id="closeModalBtn" style="background: var(--gradient-gold); color: #000; border: none; padding: 12px 30px; font-weight: 700; border-radius: 5px; cursor: pointer;">Close</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('closeModalBtn').addEventListener('click', () => {
            const modal = document.getElementById('customModal');
            if (modal) modal.remove();
        });
    }

    // 5. TOAST NOTIFICATION SYSTEM
    function showNotification(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: ${type === 'error' ? '#ef4444' : '#10b981'};
            color: #fff;
            padding: 15px 25px;
            border-radius: 6px;
            font-weight: 600;
            box-shadow: 0 10px 25px rgba(0,0,0,0.4);
            z-index: 9999;
            transition: all 0.4s ease;
            transform: translateY(100px);
            opacity: 0;
        `;
        toast.innerText = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // 6. SCROLL REVEAL ANIMATION
    const cards = document.querySelectorAll('.service-card, .team-card, .contact-info-box, .contact-form');
    
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });

});
