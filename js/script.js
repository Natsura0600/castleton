const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') ?? false;
  menu.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}));
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();


// Revelado suave al desplazarse por la página.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll(
    'section .container, .ubicacion-container, .program-card, .benefit, .classic-cards article, .business-cta'
  );
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  targets.forEach((element, index) => {
    // Evita aplicar la animación a contenedores dentro de otros elementos ya animados.
    if (element.closest('.js-reveal')) return;
    element.classList.add('js-reveal');
    if (element.matches('.program-card, .benefit, .classic-cards article')) {
      element.style.transitionDelay = `${(index % 3) * 70}ms`;
    }
  });
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  targets.forEach(element => { if (element.classList.contains('js-reveal')) observer.observe(element); });
})();
