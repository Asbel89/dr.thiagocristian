// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const navOverlay = document.getElementById('navOverlay');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
}
if (menuBtn && mobileNav) {
  setMenu(false);
  menuBtn.addEventListener('click', () => {
    setMenu(!document.body.classList.contains('menu-open'));
  });
  if (navOverlay) navOverlay.addEventListener('click', () => setMenu(false));
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => setMenu(false))
  );
  addEventListener('keydown', ev => {
    if (ev.key === 'Escape') setMenu(false);
  });
}

// Marquee — loop infinito sem emenda em qualquer largura de tela
(function () {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  function fill() {
    // metade da trilha precisa cobrir a viewport para o giro de -50% ser perfeito;
    // dobra os grupos (sempre em contagem par) até cobrir
    let guard = 0;
    while (track.offsetWidth / 2 < window.innerWidth + 40 && guard < 6) {
      track.innerHTML += track.innerHTML;
      guard++;
    }
  }
  fill();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fill);
  let t;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(fill, 200); });
})();

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Pré-seleciona tratamento vindo dos cards
const select = document.getElementById('fTrat');
document.querySelectorAll('[data-trat]').forEach(link => {
  link.addEventListener('click', () => {
    const v = link.getAttribute('data-trat') || '';
    if (!select) return;
    [...select.options].forEach(o => {
      if (v === 'Implantes' && o.text.includes('Implantes')) select.value = o.text;
      if (v === 'Estética do sorriso' && o.text.includes('Estética')) select.value = o.text;
      if (v === 'Clínica geral' && o.text.includes('Clínica geral')) select.value = o.text;
    });
  });
});

// Form -> WhatsApp (TROCAR O NÚMERO AQUI)
const WHATS_NUMBER = '5581999999999';
const form = document.getElementById('waForm');
if (form) {
  form.addEventListener('submit', ev => {
    ev.preventDefault();
    const nome = document.getElementById('fNome').value.trim();
    const trat = document.getElementById('fTrat').value;
    const msg = document.getElementById('fMsg').value.trim();
    const texto = `Olá, Dr. Thiago! Me chamo ${nome || '...'}. Quero agendar uma avaliação.\nAssunto: ${trat}${msg ? `\nDetalhe: ${msg}` : ''}`;
    window.open(`https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(texto)}`, '_blank');
  });
}

// Header minimalista: borda + sombra ao rolar
const header = document.getElementById('header');
function onScroll() {
  header.classList.toggle('scrolled', scrollY > 8);
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();
