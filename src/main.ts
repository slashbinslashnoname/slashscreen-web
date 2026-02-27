import './style.css';

// ── Scroll-reveal via IntersectionObserver ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// ── Nav scroll state ──
const nav = document.getElementById('nav');
let ticking = false;

function updateNav() {
  if (!nav) return;
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNav);
    ticking = true;
  }
}, { passive: true });

updateNav();

// ── Mobile nav toggle ──
const toggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => {
  toggle.classList.toggle('active');
  navLinks?.classList.toggle('open');
});

// Close mobile nav on link click
navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle?.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ── Smooth scroll for anchor links (fallback for Safari) ──
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
