/**
 * fumu-sports.js
 * Small page-specific behaviors: skip-link focus, minor UI helpers
 */

document.addEventListener('DOMContentLoaded', () => {
    // Ensure skip link moves focus to main
    const skip = document.querySelector('.skip-link');
    const main = document.getElementById('main');
    if (skip && main) {
        skip.addEventListener('click', (e) => {
            // allow browser to jump, then ensure focus
            setTimeout(() => main.focus(), 50);
        });
    }

    // Add visible focus outlines for keyboard users
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') document.documentElement.classList.add('show-focus');
    }, { once: true });

    // Register service worker (if supported)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(() => console.log('Service worker registered'))
            .catch(err => console.warn('SW registration failed:', err));
    }

    // Contact form client-side handling (for contacts.html)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();
            if (!name || !email || !message) {
                alert('Please complete all fields before sending.');
                return;
            }

            // Join form handling: store applications in localStorage (demo)
            const joinForm = document.getElementById('join-form');
            if (joinForm) {
                joinForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const app = {
                        id: Date.now(),
                        orgName: joinForm.orgName.value.trim(),
                        contactName: joinForm.contactName.value.trim(),
                        email: joinForm.email.value.trim(),
                        phone: joinForm.phone.value.trim(),
                        address: joinForm.address.value.trim(),
                        website: joinForm.website.value.trim(),
                        level: joinForm.level.value,
                        notes: joinForm.notes.value.trim()
                    };
                    const key = 'fumu_membership_apps';
                    const existing = JSON.parse(localStorage.getItem(key) || '[]');
                    existing.push(app);
                    localStorage.setItem(key, JSON.stringify(existing));
                    const msg = document.createElement('p');
                    msg.className = 'contact-confirm';
                    msg.textContent = `Application submitted. Reference: ${app.id}`;
                    joinForm.parentNode.insertBefore(msg, joinForm.nextSibling);
                    joinForm.reset();
                });
            }
            // Simulate form submission (no server) and show confirmation
            contactForm.querySelector('button[type="submit"]').disabled = true;
            const confirmMsg = document.createElement('p');
            confirmMsg.className = 'contact-confirm';
            confirmMsg.textContent = `Thanks ${name}! Your message was recorded locally.`;
            contactForm.parentNode.insertBefore(confirmMsg, contactForm.nextSibling);
            contactForm.reset();
            setTimeout(() => {
                contactForm.querySelector('button[type="submit"]').disabled = false;
            }, 2000);
        });
    }
});
