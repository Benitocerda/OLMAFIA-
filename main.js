
// OL MAFIA main interactions: slow toggle, marquee cloning, and on-load animations.
(function(){
  const body = document.body;
  const slowToggle = document.querySelector('[data-toggle="slow"]');
  const switchEl = document.querySelector('.switch');
  const key = 'olmafia_slow';

  // init state
  const saved = localStorage.getItem(key);
  if (saved === '1'){ body.classList.add('slow'); switchEl.classList.add('active'); }

  // toggle
  slowToggle?.addEventListener('click', (e)=>{
    e.preventDefault();
    body.classList.toggle('slow');
    const active = body.classList.contains('slow');
    switchEl.classList.toggle('active', active);
    localStorage.setItem(key, active ? '1' : '0');
  });

  // simple entrance reveal
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.style.transform='translateY(0)'; e.target.style.opacity='1'; }
    })
  }, {threshold:.18});

  document.querySelectorAll('[data-reveal]').forEach(el=>{
    el.style.transform='translateY(12px)'; el.style.opacity='0'; el.style.transition=`all var(--dur) var(--easing)`;
    observer.observe(el);
  });

  // marquee: duplicate track for seamless loop
  document.querySelectorAll('.marquee-track').forEach(track=>{
    track.innerHTML = track.innerHTML + track.innerHTML;
  });
})();
