/**
 * WAEY LAW FIRM — script.js
 * Premium Arabic Law Firm Website — Interactive Layer
 * ──────────────────────────────────────────────────
 * Modules:
 *  1. App Init
 *  2. Loader
 *  3. Custom Cursor
 *  4. Navbar
 *  5. Mobile Menu
 *  6. Hero Canvas
 *  7. Scroll Reveal
 *  8. Animated Counters
 *  9. Parallax Effects
 * 10. Testimonials Slider
 * 11. Active Nav Tracking
 * 12. Contact Form
 * 13. Back to Top
 * 14. Footer Year
 * 15. Toast Notifications
 */

 'use strict';

 /* ════════════════════════════════════════════════════════════════
    1. APP INIT
    ════════════════════════════════════════════════════════════════ */
 const App = {
   // Cache DOM
   els: {},
 
   init() {
     this.cacheDOM();
     Loader.init();
     Cursor.init();
     Navbar.init();
     MobileMenu.init();
     HeroCanvas.init();
     ScrollReveal.init();
     Counters.init();
     Parallax.init();
     TestimonialsSlider.init();
     ActiveNav.init();
     ContactForm.init();
     BackToTop.init();
     Footer.init();
   },
 
   cacheDOM() {
     this.els = {
       loader:       document.getElementById('loader'),
       cursor:       document.getElementById('cursor'),
       cursorFollow: document.getElementById('cursor-follower'),
       navbar:       document.getElementById('navbar'),
       hamburger:    document.getElementById('hamburger'),
       mobileMenu:   document.getElementById('mobile-menu'),
       menuBackdrop: document.getElementById('menu-backdrop'),
       menuClose:    document.getElementById('menu-close'),
       heroCanvas:   document.getElementById('hero-canvas'),
       backToTop:    document.getElementById('back-to-top'),
       contactForm:  document.getElementById('contact-form'),
       toast:        document.getElementById('toast'),
       yearSpan:     document.getElementById('year'),
       testimTrack:  document.getElementById('testimonials-track'),
       testimDots:   document.getElementById('testimonials-dots'),
       prevBtn:      document.getElementById('prev-btn'),
       nextBtn:      document.getElementById('next-btn'),
     };
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    2. LOADER
    ════════════════════════════════════════════════════════════════ */
 const Loader = {
   init() {
     const loader = App.els.loader;
     if (!loader) return;
 
     // Allow a short min display time for polish
     const minTime = 1200;
     const startTime = Date.now();
 
     window.addEventListener('load', () => {
       const elapsed = Date.now() - startTime;
       const remaining = Math.max(0, minTime - elapsed);
       setTimeout(() => {
         loader.classList.add('hidden');
         // Once hidden, remove from DOM
         setTimeout(() => loader.remove(), 700);
       }, remaining);
     });
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    3. CUSTOM CURSOR
    ════════════════════════════════════════════════════════════════ */
 const Cursor = {
   x: 0, y: 0,
   fx: 0, fy: 0,
   raf: null,
 
   init() {
     const { cursor, cursorFollow } = App.els;
     if (!cursor || !cursorFollow) return;
     // Only on pointer devices
     if (!window.matchMedia('(pointer: fine)').matches) return;
 
     document.addEventListener('mousemove', (e) => {
       this.x = e.clientX;
       this.y = e.clientY;
       cursor.style.left = `${this.x}px`;
       cursor.style.top  = `${this.y}px`;
     });
 
     // Smooth follower
     const animate = () => {
       this.fx += (this.x - this.fx) * 0.1;
       this.fy += (this.y - this.fy) * 0.1;
       cursorFollow.style.left = `${this.fx}px`;
       cursorFollow.style.top  = `${this.fy}px`;
       this.raf = requestAnimationFrame(animate);
     };
     animate();
 
     // Grow on interactive elements
     const interactables = 'a, button, .service-card, .team-card, .testimonials__btn, input, select, textarea';
     document.addEventListener('mouseover', (e) => {
       if (e.target.matches(interactables) || e.target.closest(interactables)) {
         cursor.classList.add('cursor--grow');
         cursorFollow.classList.add('cursor--grow');
       }
     });
     document.addEventListener('mouseout', (e) => {
       if (e.target.matches(interactables) || e.target.closest(interactables)) {
         cursor.classList.remove('cursor--grow');
         cursorFollow.classList.remove('cursor--grow');
       }
     });
 
     // Hide when leaving window
     document.addEventListener('mouseleave', () => {
       cursor.style.opacity = '0';
       cursorFollow.style.opacity = '0';
     });
     document.addEventListener('mouseenter', () => {
       cursor.style.opacity = '1';
       cursorFollow.style.opacity = '1';
     });
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    4. NAVBAR
    ════════════════════════════════════════════════════════════════ */
 const Navbar = {
   init() {
     const { navbar } = App.els;
     if (!navbar) return;
 
     const onScroll = () => {
       navbar.classList.toggle('scrolled', window.scrollY > 30);
     };
 
     window.addEventListener('scroll', onScroll, { passive: true });
     onScroll(); // run immediately
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    5. MOBILE MENU
    ════════════════════════════════════════════════════════════════ */
 const MobileMenu = {
   isOpen: false,
 
   init() {
     const { hamburger, mobileMenu, menuBackdrop, menuClose } = App.els;
     if (!hamburger || !mobileMenu) return;
 
     hamburger.addEventListener('click', () => this.toggle());
     menuClose?.addEventListener('click', () => this.close());
     menuBackdrop?.addEventListener('click', () => this.close());
 
     // Close on nav link click
     mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
       link.addEventListener('click', () => this.close());
     });
 
     // Close on Escape
     document.addEventListener('keydown', (e) => {
       if (e.key === 'Escape' && this.isOpen) this.close();
     });
   },
 
   toggle() {
     this.isOpen ? this.close() : this.open();
   },
 
   open() {
     this.isOpen = true;
     App.els.mobileMenu.classList.add('open');
     App.els.hamburger.classList.add('open');
     App.els.hamburger.setAttribute('aria-expanded', 'true');
     document.body.style.overflow = 'hidden';
   },
 
   close() {
     this.isOpen = false;
     App.els.mobileMenu.classList.remove('open');
     App.els.hamburger.classList.remove('open');
     App.els.hamburger.setAttribute('aria-expanded', 'false');
     document.body.style.overflow = '';
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    6. HERO CANVAS — Particle field
    ════════════════════════════════════════════════════════════════ */
 const HeroCanvas = {
   canvas: null,
   ctx: null,
   particles: [],
   mouse: { x: null, y: null },
   raf: null,
   W: 0, H: 0,
 
   init() {
     this.canvas = App.els.heroCanvas;
     if (!this.canvas) return;
 
     // Respect reduced motion
     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 
     this.ctx = this.canvas.getContext('2d');
     this.resize();
     this.buildParticles();
     this.bindEvents();
     this.loop();
   },
 
   resize() {
     const hero = this.canvas.parentElement.parentElement;
     this.W = this.canvas.width  = hero.offsetWidth;
     this.H = this.canvas.height = hero.offsetHeight;
   },
 
   buildParticles() {
     const count = Math.floor((this.W * this.H) / 12000);
     this.particles = Array.from({ length: Math.min(count, 80) }, () => this.createParticle());
   },
 
   createParticle() {
     return {
       x:    Math.random() * this.W,
       y:    Math.random() * this.H,
       r:    Math.random() * 1.5 + 0.4,
       vx:   (Math.random() - 0.5) * 0.4,
       vy:   (Math.random() - 0.5) * 0.4,
       alpha: Math.random() * 0.5 + 0.1,
     };
   },
 
   bindEvents() {
     window.addEventListener('resize', () => {
       this.resize();
       this.buildParticles();
     }, { passive: true });
 
     this.canvas.parentElement.parentElement.addEventListener('mousemove', (e) => {
       this.mouse.x = e.clientX;
       this.mouse.y = e.clientY;
     });
   },
 
   loop() {
     this.ctx.clearRect(0, 0, this.W, this.H);
 
     // Draw connections
     for (let i = 0; i < this.particles.length; i++) {
       for (let j = i + 1; j < this.particles.length; j++) {
         const a = this.particles[i];
         const b = this.particles[j];
         const dx = a.x - b.x, dy = a.y - b.y;
         const dist = Math.sqrt(dx * dx + dy * dy);
         if (dist < 120) {
           this.ctx.beginPath();
           this.ctx.moveTo(a.x, a.y);
           this.ctx.lineTo(b.x, b.y);
           this.ctx.strokeStyle = `rgba(201,168,76,${(1 - dist / 120) * 0.08})`;
           this.ctx.lineWidth = 0.8;
           this.ctx.stroke();
         }
       }
     }
 
     // Draw & move particles
     this.particles.forEach(p => {
       // Mouse attraction (subtle)
       if (this.mouse.x !== null) {
         const dx = this.mouse.x - p.x;
         const dy = this.mouse.y - p.y;
         const dist = Math.sqrt(dx * dx + dy * dy);
         if (dist < 200) {
           p.vx += dx / dist * 0.015;
           p.vy += dy / dist * 0.015;
         }
       }
 
       // Dampen velocity
       p.vx *= 0.98;
       p.vy *= 0.98;
       p.x  += p.vx;
       p.y  += p.vy;
 
       // Wrap edges
       if (p.x < 0) p.x = this.W;
       if (p.x > this.W) p.x = 0;
       if (p.y < 0) p.y = this.H;
       if (p.y > this.H) p.y = 0;
 
       // Draw dot
       this.ctx.beginPath();
       this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
       this.ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
       this.ctx.fill();
     });
 
     this.raf = requestAnimationFrame(() => this.loop());
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    7. SCROLL REVEAL
    ════════════════════════════════════════════════════════════════ */
 const ScrollReveal = {
   observer: null,
 
   init() {
     if (!('IntersectionObserver' in window)) {
       // Fallback: show all elements immediately
       document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
         .forEach(el => el.classList.add('revealed'));
       return;
     }
 
     this.observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           entry.target.classList.add('revealed');
           this.observer.unobserve(entry.target);
         }
       });
     }, {
       threshold: 0.12,
       rootMargin: '0px 0px -50px 0px'
     });
 
     document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
       .forEach(el => this.observer.observe(el));
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    8. ANIMATED COUNTERS
    ════════════════════════════════════════════════════════════════ */
 const Counters = {
   animated: new Set(),
 
   init() {
     const counters = document.querySelectorAll('.counter, .hero__stat-num');
     if (!counters.length) return;
 
     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting && !this.animated.has(entry.target)) {
           this.animated.add(entry.target);
           this.animateCounter(entry.target);
           observer.unobserve(entry.target);
         }
       });
     }, { threshold: 0.5 });
 
     counters.forEach(el => observer.observe(el));
   },
 
   animateCounter(el) {
     const target = parseInt(el.dataset.count || el.textContent, 10);
     const duration = 2000;
     const start = performance.now();
 
     const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
 
     const step = (now) => {
       const elapsed = now - start;
       const progress = Math.min(elapsed / duration, 1);
       const value = Math.round(easeOutQuart(progress) * target);
       el.textContent = value.toLocaleString('ar-SA');
       if (progress < 1) requestAnimationFrame(step);
       else el.textContent = target.toLocaleString('ar-SA');
     };
 
     requestAnimationFrame(step);
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    9. PARALLAX EFFECTS
    ════════════════════════════════════════════════════════════════ */
 const Parallax = {
   init() {
     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
     if (window.innerWidth < 768) return; // Skip on mobile
 
     const heroFloats = document.querySelectorAll('.hero__float');
 
     window.addEventListener('scroll', () => {
       const scrollY = window.scrollY;
 
       // Hero floats parallax
       heroFloats.forEach((el, i) => {
         const speed = 0.05 + (i * 0.02);
         el.style.transform = `translateY(${scrollY * speed}px)`;
       });
     }, { passive: true });
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    10. TESTIMONIALS SLIDER — RTL-safe
    ════════════════════════════════════════════════════════════════ */
 const TestimonialsSlider = {
   current: 0,
   total: 0,
   autoplayTimer: null,
   AUTOPLAY_DELAY: 5500,
 
   init() {
     const { testimTrack, testimDots, prevBtn, nextBtn } = App.els;
     if (!testimTrack) return;
 
     this.cards = Array.from(testimTrack.querySelectorAll('.testimonial-card'));
     this.total = this.cards.length;
     if (this.total === 0) return;
 
     // Build dots
     if (testimDots) {
       this.cards.forEach((_, i) => {
         const dot = document.createElement('button');
         dot.className = 'testimonials__dot';
         dot.setAttribute('role', 'tab');
         dot.setAttribute('aria-label', `شهادة ${i + 1}`);
         dot.addEventListener('click', () => { this.goTo(i); this.resetAutoplay(); });
         testimDots.appendChild(dot);
       });
     }
 
     // Arrow controls — in RTL layout: "السابق" (right arrow) goes to previous index, "التالي" (left arrow) goes to next
     prevBtn?.addEventListener('click', () => { this.prev(); this.resetAutoplay(); });
     nextBtn?.addEventListener('click', () => { this.next(); this.resetAutoplay(); });
 
     // Swipe
     this.bindSwipe();
 
     // Keyboard nav on buttons
     [prevBtn, nextBtn].forEach(btn => {
       btn?.addEventListener('keydown', (e) => {
         if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
       });
     });
 
     this.goTo(0);
     this.startAutoplay();
 
     // Pause on hover/focus
     const wrapper = testimTrack.closest('.testimonials__wrapper');
     wrapper?.addEventListener('mouseenter', () => this.stopAutoplay());
     wrapper?.addEventListener('mouseleave', () => this.startAutoplay());
     wrapper?.addEventListener('focusin',    () => this.stopAutoplay());
     wrapper?.addEventListener('focusout',   () => this.startAutoplay());
   },
 
   goTo(index) {
     // Clamp & wrap index
     this.current = ((index % this.total) + this.total) % this.total;
 
     // The track direction is forced LTR in CSS, so translateX(-N*100%) always works correctly
     App.els.testimTrack.style.transform = `translateX(-${this.current * 100}%)`;
 
     // Update dots
     App.els.testimDots?.querySelectorAll('.testimonials__dot').forEach((dot, i) => {
       const isActive = i === this.current;
       dot.classList.toggle('active', isActive);
       dot.setAttribute('aria-selected', String(isActive));
     });
 
     // Announce to screen readers
     const card = this.cards[this.current];
     if (card) card.focus({ preventScroll: true });
   },
 
   next() { this.goTo(this.current + 1); },
   prev() { this.goTo(this.current - 1); },
 
   startAutoplay() {
     this.stopAutoplay();
     this.autoplayTimer = setInterval(() => this.next(), this.AUTOPLAY_DELAY);
   },
 
   stopAutoplay() {
     if (this.autoplayTimer) {
       clearInterval(this.autoplayTimer);
       this.autoplayTimer = null;
     }
   },
 
   resetAutoplay() {
     this.stopAutoplay();
     this.startAutoplay();
   },
 
   bindSwipe() {
     const track = App.els.testimTrack;
     if (!track) return;
     let startX = 0, startY = 0, isDragging = false;
 
     track.addEventListener('touchstart', (e) => {
       startX = e.changedTouches[0].clientX;
       startY = e.changedTouches[0].clientY;
       isDragging = true;
     }, { passive: true });
 
     track.addEventListener('touchmove', (e) => {
       if (!isDragging) return;
       const dx = Math.abs(e.changedTouches[0].clientX - startX);
       const dy = Math.abs(e.changedTouches[0].clientY - startY);
       // If horizontal swipe dominates, prevent scroll
       if (dx > dy) e.preventDefault();
     }, { passive: false });
 
     track.addEventListener('touchend', (e) => {
       if (!isDragging) return;
       isDragging = false;
       const dx = e.changedTouches[0].clientX - startX;
       if (Math.abs(dx) > 50) {
         // In LTR track: swipe left (negative dx) = next; swipe right = prev
         dx < 0 ? this.next() : this.prev();
         this.resetAutoplay();
       }
     }, { passive: true });
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    11. ACTIVE NAV TRACKING (Scroll Spy)
    ════════════════════════════════════════════════════════════════ */
 const ActiveNav = {
   sections: [],
   links: [],
 
   init() {
     this.sections = Array.from(document.querySelectorAll('section[id]'));
     this.links = Array.from(document.querySelectorAll('.navbar__link[data-section]'));
     if (!this.sections.length || !this.links.length) return;
 
     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           const id = entry.target.id;
           this.links.forEach(link => {
             link.classList.toggle('active', link.dataset.section === id);
           });
         }
       });
     }, {
       rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 80}px 0px -60% 0px`
     });
 
     this.sections.forEach(s => observer.observe(s));
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    12. CONTACT FORM — Web3Forms Integration
    https://app.web3forms.com  |  key: 109efbd8-59fc-4f10-8e72-df48bb6f7970
    ════════════════════════════════════════════════════════════════ */
 const ContactForm = {
   WEB3FORMS_ENDPOINT: 'https://api.web3forms.com/submit',
 
   init() {
     const form = App.els.contactForm;
     if (!form) return;
 
     form.addEventListener('submit', (e) => {
       e.preventDefault();
       if (!this.validate(form)) return;
       this.submit(form);
     });
 
     // Live validation on blur
     form.querySelectorAll('.contact__input').forEach(input => {
       input.addEventListener('blur', () => this.validateField(input));
       input.addEventListener('input', () => {
         // Clear error state as user types
         if (input.value.trim()) {
           input.style.borderColor = '';
           input.style.boxShadow = '';
         }
       });
     });
   },
 
   validate(form) {
     let valid = true;
     form.querySelectorAll('[required]').forEach(field => {
       if (!this.validateField(field)) valid = false;
     });
     return valid;
   },
 
   validateField(field) {
     const isEmpty   = !field.value.trim();
     const isInvalid = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
 
     if (isEmpty || isInvalid) {
       field.style.borderColor = 'rgba(255, 69, 58, 0.6)';
       field.style.boxShadow   = '0 0 0 3px rgba(255, 69, 58, 0.1)';
       return false;
     }
 
     field.style.borderColor = 'rgba(201, 168, 76, 0.4)';
     field.style.boxShadow   = '0 0 0 3px rgba(201, 168, 76, 0.08)';
     return true;
   },
 
   async submit(form) {
     const btn = form.querySelector('#submit-btn') || form.querySelector('button[type="submit"]');
     const originalHTML = btn.innerHTML;
 
     // ── Loading state ──
     btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
     btn.disabled  = true;
     btn.style.opacity = '0.8';
 
     try {
       const formData = new FormData(form);
       const object   = Object.fromEntries(formData.entries());
       const json     = JSON.stringify(object);
 
       const response = await fetch(this.WEB3FORMS_ENDPOINT, {
         method:  'POST',
         headers: {
           'Content-Type': 'application/json',
           'Accept':       'application/json'
         },
         body: json
       });
 
       const result = await response.json();
 
       if (response.ok && result.success) {
         // ── Success ──
         btn.innerHTML    = '<i class="fas fa-check-circle"></i> تم الإرسال بنجاح!';
         btn.style.background = 'linear-gradient(135deg, #34C759, #28A745)';
         btn.style.opacity    = '1';
 
         Toast.show('✓ شكراً لك! سنتواصل معك في أقرب وقت ممكن.', 'success');
 
         form.reset();
         form.querySelectorAll('.contact__input').forEach(f => {
           f.style.borderColor = '';
           f.style.boxShadow   = '';
         });
 
         setTimeout(() => {
           btn.innerHTML        = originalHTML;
           btn.disabled         = false;
           btn.style.background = '';
           btn.style.opacity    = '';
         }, 4000);
 
       } else {
         throw new Error(result.message || 'فشل الإرسال');
       }
 
     } catch (err) {
       console.error('[ContactForm] Error:', err);
 
       btn.innerHTML    = '<i class="fas fa-exclamation-triangle"></i> حدث خطأ، حاول مجدداً';
       btn.style.background = 'linear-gradient(135deg, #FF453A, #D93025)';
       btn.style.opacity    = '1';
 
       Toast.show('⚠ تعذّر الإرسال. يرجى التحقق من اتصالك والمحاولة مرة أخرى.', 'error');
 
       setTimeout(() => {
         btn.innerHTML        = originalHTML;
         btn.disabled         = false;
         btn.style.background = '';
         btn.style.opacity    = '';
       }, 4000);
     }
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    13. BACK TO TOP
    ════════════════════════════════════════════════════════════════ */
 const BackToTop = {
   init() {
     const btn = App.els.backToTop;
     if (!btn) return;
 
     const toggle = () => {
       btn.classList.toggle('visible', window.scrollY > 400);
     };
 
     window.addEventListener('scroll', toggle, { passive: true });
 
     btn.addEventListener('click', () => {
       window.scrollTo({ top: 0, behavior: 'smooth' });
     });
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    14. FOOTER YEAR
    ════════════════════════════════════════════════════════════════ */
 const Footer = {
   init() {
     const yearEl = App.els.yearSpan;
     if (yearEl) yearEl.textContent = new Date().getFullYear();
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    15. TOAST NOTIFICATIONS
    ════════════════════════════════════════════════════════════════ */
 const Toast = {
   timer: null,
 
   show(message, type = 'success') {
     const toast = App.els.toast;
     if (!toast) return;
 
     toast.textContent = message;
     toast.className = `toast toast--${type} show`;
 
     if (this.timer) clearTimeout(this.timer);
     this.timer = setTimeout(() => {
       toast.classList.remove('show');
     }, 4000);
   }
 };
 
 /* ════════════════════════════════════════════════════════════════
    SMOOTH SCROLL for anchor links
    ════════════════════════════════════════════════════════════════ */
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
     const target = document.querySelector(this.getAttribute('href'));
     if (!target) return;
     e.preventDefault();
 
     const navbarHeight = parseInt(
       getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')
     ) || 80;
 
     const targetY = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
 
     window.scrollTo({ top: targetY, behavior: 'smooth' });
   });
 });
 
 /* ════════════════════════════════════════════════════════════════
    SERVICE CARD — Stagger animation delays
    ════════════════════════════════════════════════════════════════ */
 document.querySelectorAll('.service-card').forEach((card, i) => {
   card.style.transitionDelay = `${i * 0.07}s`;
 });
 
 document.querySelectorAll('.why__card').forEach((card, i) => {
   card.style.transitionDelay = `${i * 0.07}s`;
 });
 
 document.querySelectorAll('.team-card').forEach((card, i) => {
   card.style.transitionDelay = `${i * 0.08}s`;
 });
 
 /* ════════════════════════════════════════════════════════════════
    KEYBOARD ACCESSIBILITY — service cards
    ════════════════════════════════════════════════════════════════ */
 document.querySelectorAll('.service-card[tabindex="0"], .team-card[tabindex="0"]').forEach(card => {
   card.addEventListener('keydown', (e) => {
     if (e.key === 'Enter' || e.key === ' ') {
       e.preventDefault();
       const link = card.querySelector('a');
       if (link) link.click();
     }
   });
 });
 
 /* ════════════════════════════════════════════════════════════════
    LAUNCH
    ════════════════════════════════════════════════════════════════ */
 if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', () => App.init());
 } else {
   App.init();
 }

console.log(`
⚠ تحذير أمني ⚠

لا تنسخ أي كود لا تفهمه.

قد يستطيع الكود الخبيث:
• سرقة الحسابات والبيانات
• اختراق الجلسات (Sessions)
• إرسال طلبات بدون علمك
• زرع ملفات أو سكربتات ضارة

اقرأ الكود قبل تشغيله.
فكر قبل أن تلصق.
made py KIN
`);
