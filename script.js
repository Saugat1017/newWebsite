/* =========================================
   Texas Hot Tub Pros — script.js
   ========================================= */

/* ---- Nav scroll effect ---- */
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- Mobile hamburger ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ---- AOS (scroll-reveal) ---- */
const aosObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
        aosObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

/* ---- Contact form ---- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate submit (no backend yet — just UX feedback)
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }, 1200);
  });
}

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- Gallery lightbox (simple) ---- */
document.querySelectorAll('.gallery__item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery__caption');

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:9999;
      background:rgba(0,0,0,.92);
      display:flex;flex-direction:column;
      align-items:center;justify-content:center;
      padding:24px;cursor:pointer;
      animation:fadeIn .2s ease;
    `;

    const image = document.createElement('img');
    image.src = img.src.replace(/w=\d+/, 'w=1400');
    image.style.cssText = 'max-width:90vw;max-height:80vh;border-radius:12px;object-fit:contain;';

    const cap = document.createElement('p');
    cap.textContent = caption ? caption.textContent : '';
    cap.style.cssText = 'color:rgba(255,255,255,.7);margin-top:16px;font-size:.9rem;';

    const close = document.createElement('button');
    close.textContent = '✕';
    close.style.cssText = `
      position:absolute;top:20px;right:24px;
      color:white;font-size:1.5rem;background:none;
      border:none;cursor:pointer;opacity:.7;
    `;

    overlay.appendChild(image);
    overlay.appendChild(cap);
    overlay.appendChild(close);
    document.body.appendChild(overlay);

    const dismiss = () => { document.body.removeChild(overlay); };
    overlay.addEventListener('click', dismiss);
    close.addEventListener('click', dismiss);
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { dismiss(); document.removeEventListener('keydown', esc); }
    });
  });
});

/* ---- Add fadeIn keyframe dynamically ---- */
const style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }';
document.head.appendChild(style);
