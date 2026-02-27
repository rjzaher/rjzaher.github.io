// Hover animation on nav items
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('mouseenter', () => a.classList.add('is-hover'));
  a.addEventListener('mouseleave', () => a.classList.remove('is-hover'));
  a.addEventListener('focus',      () => a.classList.add('is-hover'));
  a.addEventListener('blur',       () => a.classList.remove('is-hover'));
});

// Mark active nav item based on current file name
(function markActiveNav(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const file = href.split('#')[0];
    if (file === path) a.classList.add('is-active');
  });
})();

// Footer year
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// Premium mobile menu (burger -> X)
(function(){
  const btn = document.getElementById('menuBtn');
  const close = document.getElementById('menuClose');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');

  if(!btn || !close || !menu || !backdrop) return;

  function openMenu(){
    menu.hidden = false;
    backdrop.hidden = false;
    void menu.offsetWidth; // reflow for transition

    menu.classList.add('show');
    backdrop.classList.add('show');
    btn.classList.add('is-open');     // <-- this animates burger to X
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu(){
    menu.classList.remove('show');
    backdrop.classList.remove('show');
    btn.classList.remove('is-open');  // <-- back to burger
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    setTimeout(() => {
      menu.hidden = true;
      backdrop.hidden = true;
    }, 280);
  }

  btn.addEventListener('click', () => {
    if(menu.hidden) openMenu();
    else closeMenu();
  });

  close.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !menu.hidden) closeMenu();
  });

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
})();

// Reveal sections on scroll
(function(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
})();

// Gallery buttons (scroll one card)
(function(){
  const track = document.getElementById('gtrack');
  if(!track) return;

  const prev = document.querySelector('.gbtn.prev');
  const next = document.querySelector('.gbtn.next');

  function cardStep(){
    const first = track.querySelector('.gcard');
    if(!first) return 320;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '14') || 14;
    return first.getBoundingClientRect().width + gap;
  }

  prev?.addEventListener('click', () => track.scrollBy({ left: -cardStep(), behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left:  cardStep(), behavior: 'smooth' }));
})();