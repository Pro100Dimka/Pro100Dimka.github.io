  // ===============================
        // Basic UI + Slider + Forms JS
        // ===============================
        document.getElementById('year').textContent = new Date().getFullYear();

        // MOBILE NAV
        function toggleMobileNav(btn) {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
            const mobile = document.getElementById('mobileNav');
            mobile.style.display = expanded ? 'none' : 'block';
        }
        function closeMobileNav() { document.getElementById('mobileNav').style.display = 'none'; document.querySelector('.hamburger').setAttribute('aria-expanded', 'false') }

        // MODAL helpers
        function openModal(id) {
            document.getElementById('modalBackdrop').style.display = 'flex';
            document.getElementById('modalBackdrop').setAttribute('aria-hidden', 'false');
            const mod = document.getElementById(id);
            mod.style.display = 'block';
            // hide others
            Array.from(document.querySelectorAll('.modal')).forEach(m => { if (m.id !== id) m.style.display = 'none' });
        }
        function closeModal(id) {
            const mod = document.getElementById(id);
            if (mod) mod.style.display = 'none';
            // if no modals open, hide backdrop
            const anyOpen = Array.from(document.querySelectorAll('.modal')).some(m => m.style.display === 'block');
            if (!anyOpen) {
                document.getElementById('modalBackdrop').style.display = 'none';
                document.getElementById('modalBackdrop').setAttribute('aria-hidden', 'true');
            }
        }
        function closeAllModals(e) {
            // close only if clicked backdrop, not modal content
            if (e.target === document.getElementById('modalBackdrop')) {
                Array.from(document.querySelectorAll('.modal')).forEach(m => m.style.display = 'none');
                document.getElementById('modalBackdrop').style.display = 'none';
                document.getElementById('modalBackdrop').setAttribute('aria-hidden', 'true');
            }
        }

        // SLIDER
        let current = 0;
        const slides = document.getElementById('slides');
        const totalSlides = slides.children.length;
        function updateSlider() {
            slides.style.transform = 'translateX(' + (-current * 100) + '%)';
        }
        function nextSlide() { current = (current + 1) % totalSlides; updateSlider(); }
        function prevSlide() { current = (current - 1 + totalSlides) % totalSlides; updateSlider(); }
        // simple auto-advance (optional)
        let sliderTimer = setInterval(nextSlide, 8000);

        // FORM VALIDATION & SUBMISSION hooks
        function validateAndSend(e) {
            e.preventDefault();
            const form = e.target;
            const name = form.name.value.trim();
            const phone = form.phone.value.trim();
            if (!name || !phone) { showFormMsg('formMsg', 'Будь ласка, вкажіть імʼя та телефон.'); return false }
            // Formspree: regular form submit will POST to action URL.
            // If using fetch/ajax: you can send with fetch to Formspree endpoint.
            showFormMsg('formMsg', 'Дякуємо! Ваше повідомлення відправлено (або буде відправлено після налаштування Formspree).');
            // For demo: clear form
            form.reset();
            return false; // prevent actual navigation in demo; set to true to allow default POST
        }
        function showFormMsg(id, text) { const el = document.getElementById(id); if (el) el.textContent = text }

        // Modal forms (simulate submission - replace with API calls or Formspree)
        function submitModalForm(e) {
            e.preventDefault();
            const name = document.getElementById('mname').value.trim();
            const phone = document.getElementById('mphone').value.trim();
            if (!name || !phone) { document.getElementById('modalMsg').textContent = 'Заповніть імʼя та телефон'; return false }
            document.getElementById('modalMsg').textContent = 'Дякуємо! Менеджер звʼяжеться найближчим часом.';
            setTimeout(() => { closeModal('orderModal'); document.getElementById('modalMsg').textContent = ''; }, 1500);
            return false;
        }
        function submitPriceForm(e) {
            e.preventDefault();
            const size = document.getElementById('psize').value;
            document.getElementById('priceMsg').textContent = 'Дякуємо! Ми розрахуємо приблизну вартість і зателефонуємо.';
            setTimeout(() => { closeModal('priceModal'); document.getElementById('priceMsg').textContent = ''; }, 1500);
            return false;
        }
        function submitFeedback(e) {
            e.preventDefault();
            const name = document.getElementById('fname').value.trim();
            const text = document.getElementById('ftext').value.trim();
            if (!name || !text) { document.getElementById('fmsg').textContent = 'Будь ласка, заповніть поля'; return false }
            document.getElementById('fmsg').textContent = 'Дякуємо за відгук!';
            setTimeout(() => { closeModal('feedbackModal'); document.getElementById('fmsg').textContent = ''; }, 1200);
            return false;
        }

        // Optional: stop auto slider on interaction
        document.querySelector('.slider').addEventListener('mouseover', () => clearInterval(sliderTimer));
        document.querySelector('.slider').addEventListener('mouseleave', () => sliderTimer = setInterval(nextSlide, 8000));