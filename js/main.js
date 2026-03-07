/* ============================================================
   RECONCILER AI v3 — main.js
   Canvas · Cursor · AOS · Interactive Sandbox · EmailJS · Counters
   ============================================================ */

// ── CONFIG: Replace with your real EmailJS credentials ──
const EMAILJS_SERVICE  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_KEY      = 'YOUR_PUBLIC_KEY';   // e.g. 'abcDEF123xyz'
// ────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════════════════
     1. CUSTOM CURSOR
  ══════════════════════════════════════════════════════ */
  const dot  = document.createElement('div'); dot.id  = 'cursor-dot';
  const ring = document.createElement('div'); ring.id = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.cssText = `left:${mx}px;top:${my}px`; });
  (function lerp() {
    rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(lerp);
  })();

  document.querySelectorAll('a,button,.btn,.gc,.f-card,.rm-card,.hl-card,.a-card,.s-tab,.tds-item,.report-card,.gst-card,.p-body,.d-nav-item,.sk-card')
    .forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

  /* ══════════════════════════════════════════════════════
     2. PARTICLE CANVAS
  ══════════════════════════════════════════════════════ */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, pts = [];
    const N = 85, MAX = 170;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);

    class Pt {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random()*W; this.y = Math.random()*H;
        this.vx = (Math.random()-.5)*.32; this.vy = (Math.random()-.5)*.32;
        this.r = Math.random()*1.6+.5; this.op = Math.random()*.45+.1;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if(this.x<0||this.x>W)this.vx*=-1;
        if(this.y<0||this.y>H)this.vy*=-1;
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,229,200,${this.op})`; ctx.fill();
      }
    }
    for(let i=0;i<N;i++) pts.push(new Pt());

    let raf;
    const loop = () => {
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<pts.length;i++){
        for(let j=i+1;j<pts.length;j++){
          const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
          const d=Math.sqrt(dx*dx+dy*dy);
          if(d<MAX){
            ctx.strokeStyle=`rgba(0,229,200,${(1-d/MAX)*0.13})`;
            ctx.lineWidth=0.6; ctx.beginPath();
            ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
            ctx.stroke();
          }
        }
      }
      pts.forEach(p=>{p.update();p.draw();});
      raf = requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('visibilitychange',()=>{ if(document.hidden)cancelAnimationFrame(raf); else loop(); });
  }

  /* ══════════════════════════════════════════════════════
     3. NAV: STICKY + SCROLL PROGRESS BAR + ACTIVE LINKS
  ══════════════════════════════════════════════════════ */
  const navbar = document.querySelector('.navbar');
  const progress = document.querySelector('.nav-progress');
  
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
      if (progress) {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (window.scrollY / docH * 100) + '%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Active nav link by current page
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if(a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ══════════════════════════════════════════════════════
     4. SMOOTH ANCHOR SCROLL
  ══════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' }); }
    });
  });

  /* ══════════════════════════════════════════════════════
     5. AOS — ANIMATE ON SCROLL (manual polyfill if CDN unavailable)
  ══════════════════════════════════════════════════════ */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700, easing: 'ease-out-quart', once: true,
      offset: 60, delay: 0
    });
  } else {
    // Fallback: IntersectionObserver reveal
    const els = document.querySelectorAll('[data-aos]');
    if('IntersectionObserver' in window){
      const io = new IntersectionObserver(entries=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            const delay = parseInt(e.target.dataset.aosDelay||0);
            setTimeout(()=>e.target.classList.add('aos-animate'),delay);
            io.unobserve(e.target);
          }
        });
      },{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
      els.forEach(el=>{
        el.style.transition='opacity 0.7s ease,transform 0.7s ease';
        el.style.opacity='0';el.style.transform='translateY(22px)';
        io.observe(el);
      });
      // When marked animate
      const style=document.createElement('style');
      style.textContent='.aos-animate{opacity:1!important;transform:none!important;}';
      document.head.appendChild(style);
    } else { els.forEach(el=>el.classList.add('aos-animate')); }
  }

  /* ══════════════════════════════════════════════════════
     6. COUNTER ANIMATION
  ══════════════════════════════════════════════════════ */
  const count = el => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix||'';
    const suffix = el.dataset.suffix||'';
    const isF = String(target).includes('.');
    const dur = 1900;
    let start = null;
    const step = ts => {
      if(!start) start=ts;
      const p = Math.min((ts-start)/dur,1);
      const e = 1-Math.pow(1-p,4);
      const v = e*target;
      el.textContent = prefix+(isF?v.toFixed(1):Math.floor(v).toLocaleString('en-IN'))+suffix;
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const triggerCounters = () => document.querySelectorAll('[data-count]').forEach(count);
  const counterWrap = document.querySelector('.metrics-grid,.sk-row,.kpi-grid');
  if(counterWrap && 'IntersectionObserver' in window){
    let done=false;
    new IntersectionObserver(e=>{
      if(e[0].isIntersecting&&!done){done=true;triggerCounters();}
    },{threshold:0.2}).observe(counterWrap);
  }

  /* ══════════════════════════════════════════════════════
     7. INTERACTIVE SANDBOX TABS
  ══════════════════════════════════════════════════════ */
  const tabs = document.querySelectorAll('.s-tab');
  const views = document.querySelectorAll('.sandbox-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('view-' + tab.dataset.tab);
      if (target) {
        target.classList.add('active');
        // Re-trigger counters in new view
        target.querySelectorAll('[data-count]').forEach(count);
      }
    });
  });

  /* ══════════════════════════════════════════════════════
     8. MOBILE NAV
  ══════════════════════════════════════════════════════ */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(toggle && navLinks){
    let open=false;
    toggle.addEventListener('click',()=>{
      open=!open;
      Object.assign(navLinks.style,open?{
        display:'flex',flexDirection:'column',position:'absolute',
        top:'72px',left:'0',right:'0',
        background:'rgba(3,5,9,0.98)',padding:'16px 20px 24px',
        borderBottom:'1px solid rgba(0,229,200,0.1)',gap:'4px',
        backdropFilter:'blur(24px)',zIndex:999
      }:{display:''});
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if(open && !navLinks.contains(e.target) && !toggle.contains(e.target)){
        open = false;
        navLinks.style.display = '';
      }
    });
  }

  // Dropdown keyboard accessibility
  document.querySelectorAll('.nav-dropdown > a').forEach(a => {
    a.addEventListener('click', e => {
      const menu = a.nextElementSibling;
      if(menu && window.innerWidth < 900) {
        e.preventDefault();
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  /* ══════════════════════════════════════════════════════
     9. 3D TILT ON CARDS
  ══════════════════════════════════════════════════════ */
  document.querySelectorAll('.f-card,.rm-card,.sk-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - .5) * -5;
      const ry = ((e.clientX - r.left) / r.width - .5) * 5;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ══════════════════════════════════════════════════════
     10. TICKER DUPLICATION
  ══════════════════════════════════════════════════════ */
  const ticker = document.querySelector('.ticker-track');
  if(ticker) ticker.innerHTML += ticker.innerHTML;

  /* ══════════════════════════════════════════════════════
     11. EMAILJS FORM SUBMISSION
  ══════════════════════════════════════════════════════ */
  const form = document.querySelector('.contact-form-el');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('.form-send');
      const successBox = document.querySelector('.success-box');

      // Gather fields
      const data = {
        from_name:    form.querySelector('[name="user_name"]')?.value || '',
        from_email:   form.querySelector('[name="user_email"]')?.value || '',
        user_phone:   form.querySelector('[name="user_phone"]')?.value || '',
        user_company: form.querySelector('[name="user_company"]')?.value || '',
        user_role:    form.querySelector('[name="user_role"]')?.value || '',
        user_interest:form.querySelector('[name="user_interest"]')?.value || '',
        message:      form.querySelector('[name="message"]')?.value || '',
        to_email:     'connect@reconcilerai.com',
      };

      // Loading state
      btn.disabled = true;
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin 0.7s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending…`;

      // Add spin keyframe once
      if (!document.getElementById('spin-kf')) {
        const s = document.createElement('style');
        s.id = 'spin-kf';
        s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
        document.head.appendChild(s);
      }

      try {
        if (typeof emailjs !== 'undefined' && EMAILJS_KEY !== 'YOUR_PUBLIC_KEY') {
          emailjs.init(EMAILJS_KEY);
          await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, data);
        } else {
          // Demo mode: simulate delay
          await new Promise(r => setTimeout(r, 1400));
        }
        form.style.display = 'none';
        if (successBox) successBox.style.display = 'block';
      } catch(err) {
        console.error('EmailJS error:', err);
        btn.disabled = false;
        btn.innerHTML = '⚠ Failed — Try Again';
        setTimeout(()=>{
          btn.innerHTML='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg> Submit Request';
        },2500);
      }
    });
  }

  /* ══════════════════════════════════════════════════════
     12. MINI SPARKLINE ANIMATION (metrics band)
  ══════════════════════════════════════════════════════ */
  document.querySelectorAll('.m-item').forEach((item, i) => {
    item.style.transitionDelay = (i * 0.08) + 's';
  });

});
