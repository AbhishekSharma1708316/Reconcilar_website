/* ══════════════════════════════════════════════════════════════
   RECONCILER AI — CONTINUUM II APP
   Directional in-content reveals · stagger · zone-aware bg tint ·
   hero 3D convergence · 4-tab data window · tilt · counters ·
   cursor · magnetic · lenis. Fully defensive.
══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(s,c){return (c||document).querySelector(s);};
  var $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s));};
  function load(src){return new Promise(function(res,rej){var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);});}

  var preDone=false;
  function killPre(){if(preDone)return;preDone=true;var p=$('#pre');if(!p)return;setTimeout(function(){p.classList.add('done');setTimeout(function(){p.remove();},900);},350);}
  addEventListener('load',killPre);setTimeout(killPre,2600);

  var lenisInst=null;

  document.addEventListener('DOMContentLoaded',function(){
    cursor();nav();kinetic();reveals();counters();marquee();spotlight();magnetic();ripples();tilt();
    dataWindow();reconcilers();zoneShift();
    if(reduce) return;
    load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')
      .then(function(){return (window.RAI_Continuum?Promise.resolve():load('js/continuum.js'));})
      .then(function(){if(window.THREE&&window.RAI_Continuum){var hc=$('#heroCanvas');if(hc){var ok=RAI_Continuum.initHero(hc);if(ok){var f=$('.hero-3d .fallback');if(f)f.style.display='none';}}}})
      .catch(function(){});
    load('https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js').then(function(){if(window.Lenis)lenis();}).catch(function(){});
    load('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js')
      .then(function(){return load('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');})
      .then(function(){if(window.gsap){gsap.registerPlugin(ScrollTrigger);if(lenisInst)lenisInst.on('scroll',ScrollTrigger.update);parallax();ScrollTrigger.refresh();}})
      .catch(function(){});
  });

  function lenis(){lenisInst=new Lenis({duration:1.15,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t));},smoothWheel:true});function raf(t){lenisInst.raf(t);requestAnimationFrame(raf);}requestAnimationFrame(raf);document.documentElement.classList.add('lenis');$$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=$(a.getAttribute('href'));if(t){e.preventDefault();lenisInst.scrollTo(t,{offset:-70});}});});}

  function cursor(){if(matchMedia('(pointer:coarse)').matches)return;var d=document.createElement('div');d.id='cur';var r=document.createElement('div');r.id='curR';document.body.appendChild(d);document.body.appendChild(r);var mx=0,my=0,rx=0,ry=0;addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;d.style.left=mx+'px';d.style.top=my+'px';});(function l(){rx+=(mx-rx)*0.2;ry+=(my-ry)*0.2;r.style.left=rx+'px';r.style.top=ry+'px';requestAnimationFrame(l);})();var sel='a,button,.cell,.tilt,.voice,.dk,.cf,input,select,textarea,.dataw-tab,.dtab';addEventListener('mouseover',function(e){if(e.target.closest&&e.target.closest(sel)){r.classList.add('hov');d.classList.add('hov');}});addEventListener('mouseout',function(e){if(e.target.closest&&e.target.closest(sel)){r.classList.remove('hov');d.classList.remove('hov');}});}

  function nav(){var n=$('#nav'),b=$('#burger'),m=$('#mnav');addEventListener('scroll',function(){n.classList.toggle('scr',scrollY>20);var cur='';['capabilities','how','why','trust'].forEach(function(id){var el=$('#'+id);if(el&&el.getBoundingClientRect().top<240)cur=id;});$$('.nav-links a').forEach(function(a){a.classList.toggle('act',a.getAttribute('href')==='#'+cur);});},{passive:true});if(b){b.addEventListener('click',function(){b.classList.toggle('open');m.classList.toggle('open');});$$('#mnav a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('open');m.classList.remove('open');});});}}

  function kinetic(){var h=$('#heroH1');if(!h)return;if(reduce){h.classList.add('go');return;}requestAnimationFrame(function(){h.classList.add('go');});}

  /* directional reveals + stagger */
  function reveals(){var els=$$('.rv,.rv-l,.rv-r,.rv-sc,.stag');if(!('IntersectionObserver'in window)){els.forEach(function(e){e.classList.add('in');});return;}var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:0.12,rootMargin:'0px 0px -8% 0px'});els.forEach(function(e){io.observe(e);});}

  function counters(){var els=$$('[data-to]');if(!('IntersectionObserver'in window)){els.forEach(run);return;}var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){run(x.target);io.unobserve(x.target);}});},{threshold:0.6});els.forEach(function(e){io.observe(e);});function run(el){var to=parseFloat(el.dataset.to),pre=el.dataset.pre||'',suf=el.dataset.suf||'',isF=String(to).indexOf('.')>-1,t0=null,dur=1700;function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3),v=e*to;el.textContent=pre+(isF?v.toFixed(1):Math.round(v).toLocaleString('en-IN'))+suf;if(p<1)requestAnimationFrame(step);else el.textContent=pre+(isF?to.toFixed(1):to.toLocaleString('en-IN'))+suf;}requestAnimationFrame(step);}}

  function marquee(){var t=$('#mqTrack');if(!t)return;var items=['NFRA-aligned','DPDP Compliant','GST Reconciliation','TDS &amp; 26AS','Financial Statements','Books Reconciliation','Format-agnostic','No integration required','DPIIT Recognised','StartinUP Certified'];var h='';items.forEach(function(x){h+='<span class="mq-i"><span class="dt"></span>'+x+'</span>';});t.innerHTML=h+h;}

  function spotlight(){var sel='.cell,.tilt';addEventListener('mousemove',function(e){var c=e.target.closest&&e.target.closest(sel);if(!c)return;var r=c.getBoundingClientRect();c.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');c.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');},{passive:true});}

  function magnetic(){if(reduce||matchMedia('(pointer:coarse)').matches)return;$$('.btn-acc,.btn-fill').forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();var x=e.clientX-r.left-r.width/2;var y=e.clientY-r.top-r.height/2;b.style.transform='translate('+(x*0.2)+'px,'+(y*0.34)+'px)';});b.addEventListener('mouseleave',function(){b.style.transform='';});});}

  function ripples(){$$('.btn').forEach(function(b){b.addEventListener('click',function(e){var r=b.getBoundingClientRect();var s=document.createElement('span');s.style.cssText='position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);width:8px;height:8px;left:'+(e.clientX-r.left)+'px;top:'+(e.clientY-r.top)+'px;transform:translate(-50%,-50%) scale(0);pointer-events:none;transition:transform .6s cubic-bezier(0.16,1,0.3,1),opacity .6s;';b.appendChild(s);requestAnimationFrame(function(){s.style.transform='translate(-50%,-50%) scale(46)';s.style.opacity='0';});setTimeout(function(){s.remove();},620);});});}

  function tilt(){if(reduce||matchMedia('(pointer:coarse)').matches)return;$$('.tilt').forEach(function(card){card.addEventListener('mousemove',function(e){var r=card.getBoundingClientRect();var px=(e.clientX-r.left)/r.width;var py=(e.clientY-r.top)/r.height;card.style.transform='perspective(820px) rotateX('+((py-0.5)*-10)+'deg) rotateY('+((px-0.5)*10)+'deg)';card.style.setProperty('--gx',(px*100)+'%');card.style.setProperty('--gy',(py*100)+'%');});card.addEventListener('mouseleave',function(){card.style.transform='';});});}

  function reconcilers(){var els=$$('.recon');if(!('IntersectionObserver'in window)){els.forEach(function(e){e.classList.add('matched');});return;}var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){setTimeout(function(){x.target.classList.add('matched');},500);io.unobserve(x.target);}});},{threshold:0.6});els.forEach(function(e){io.observe(e);});}

  /* zone-aware accent: subtly tints the continuum field as each zone enters */
  function zoneShift(){
    var zones=$$('.zone[data-tint]');if(!zones.length||!('IntersectionObserver'in window))return;
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting&&x.intersectionRatio>0.5){var t=x.target.getAttribute('data-tint');if(window.RAI_Continuum&&RAI_Continuum.setTint)RAI_Continuum.setTint(t);}});},{threshold:[0.5]});
    zones.forEach(function(z){io.observe(z);});
  }

  function dataWindow(){var tabs=$$('.dataw-tab'),views=$$('.dview');if(!tabs.length)return;tabs.forEach(function(t){t.addEventListener('click',function(){tabs.forEach(function(x){x.classList.remove('act');});t.classList.add('act');var v=t.dataset.v;views.forEach(function(vw){vw.classList.toggle('on',vw.dataset.view===v);});var on=$('.dview[data-view='+v+']');if(on)on.querySelectorAll('[data-to]').forEach(animateOne);});});var w=$('#dataw');if(w&&'IntersectionObserver'in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){var on=$('.dview.on');if(on)on.querySelectorAll('[data-to]').forEach(animateOne);io.unobserve(x.target);}});},{threshold:0.4});io.observe(w);}}
  function animateOne(el){var to=parseFloat(el.dataset.to),pre=el.dataset.pre||'',suf=el.dataset.suf||'',isF=String(to).indexOf('.')>-1,t0=null,dur=1300;function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,4),v=e*to;el.textContent=pre+(isF?v.toFixed(1):Math.floor(v).toLocaleString('en-IN'))+suf;if(p<1)requestAnimationFrame(step);else el.textContent=pre+(isF?to.toFixed(1):to.toLocaleString('en-IN'))+suf;}requestAnimationFrame(step);}

  /* gentle GSAP parallax on hero copy + section glows */
  function parallax(){if(!window.gsap||!window.ScrollTrigger)return;
    var hc=$('.hero-copy');if(hc)gsap.to(hc,{y:-40,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:0.6}});
    var ha=$('.hero-aside');if(ha)gsap.to(ha,{y:40,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:0.6}});
  }
})();
