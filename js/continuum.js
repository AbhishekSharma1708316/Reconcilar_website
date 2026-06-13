/* ══════════════════════════════════════════════════════════════
   RECONCILER AI — CONTINUUM II WEBGL  (Three.js r128)
   Hero "format convergence": document cards of every format drift
   in 3D and align into one verified stream. Degrades to CSS stack.
══════════════════════════════════════════════════════════════ */
window.RAI_Continuum = (function(){
  var THREE, tint=0x8591F2;
  function setTint(hex){ if(typeof hex==='string') hex=parseInt(hex,16); if(!isNaN(hex)) tint=hex; }

  function initHero(canvas){
    if(!window.THREE || !canvas) return null;
    THREE=window.THREE;
    var W=canvas.clientWidth,H=canvas.clientHeight||520,DPR=Math.min(devicePixelRatio||1,2);
    var rndr;try{rndr=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true});}catch(e){return null;}
    rndr.setSize(W,H);rndr.setPixelRatio(DPR);rndr.setClearColor(0x000000,0);
    var scene=new THREE.Scene();
    var cam=new THREE.PerspectiveCamera(50,W/H,0.1,100);cam.position.z=9;
    scene.add(new THREE.AmbientLight(0x556,0.7));
    var l1=new THREE.PointLight(0x9AA2FF,1.5,40);l1.position.set(5,5,8);scene.add(l1);
    var l2=new THREE.PointLight(0x6573E8,1.0,40);l2.position.set(-6,-3,4);scene.add(l2);
    var grp=new THREE.Group();scene.add(grp);
    var COLORS=[0x8591F2,0xAAB2F7,0x62C9A0,0xDBAE73,0x9AA6FF,0x6573E8];
    var cards=[];var N=7;
    for(var i=0;i<N;i++){
      var g=new THREE.PlaneGeometry(2.4,3.1);
      var m=new THREE.MeshStandardMaterial({color:0x0E1018,metalness:0.5,roughness:0.5,emissive:COLORS[i%COLORS.length],emissiveIntensity:0.1,transparent:true,opacity:0.92,side:THREE.DoubleSide});
      var card=new THREE.Mesh(g,m);
      var edge=new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:COLORS[i%COLORS.length],transparent:true,opacity:0.5}));
      card.add(edge);
      for(var k=0;k<3;k++){var bg=new THREE.PlaneGeometry(1.6-(k*0.3),0.12);var bm=new THREE.MeshBasicMaterial({color:0x9AA6FF,transparent:true,opacity:0.3});var bar=new THREE.Mesh(bg,bm);bar.position.set(-0.2+k*0.05,0.7-k*0.45,0.02);card.add(bar);}
      card.userData.scatter={x:(Math.random()-0.5)*11,y:(Math.random()-0.5)*7,z:(Math.random()-0.5)*6,rx:(Math.random()-0.5)*1.4,ry:(Math.random()-0.5)*1.6,rz:(Math.random()-0.5)*0.8};
      card.userData.target={x:(i-(N-1)/2)*0.55,y:(i-(N-1)/2)*0.18,z:i*0.12,rx:0,ry:-0.5,rz:0};
      var s=card.userData.scatter;card.position.set(s.x,s.y,s.z);card.rotation.set(s.rx,s.ry,s.rz);
      grp.add(card);cards.push(card);
    }
    var ring=new THREE.Mesh(new THREE.TorusGeometry(2.4,0.03,12,80),new THREE.MeshBasicMaterial({color:0x8591F2,transparent:true,opacity:0}));
    ring.rotation.y=0.5;scene.add(ring);
    var mx=0,my=0,tmx=0,tmy=0,rafm=null,conv=0;
    addEventListener('mousemove',function(e){if(rafm)return;rafm=requestAnimationFrame(function(){var r=canvas.getBoundingClientRect();tmx=((e.clientX-r.left)/r.width-0.5);tmy=((e.clientY-r.top)/r.height-0.5);rafm=null;});},{passive:true});
    var run=true,t=0;
    document.addEventListener('visibilitychange',function(){run=!document.hidden;if(run)loop();});
    function loop(){
      if(!run)return;t+=0.01;conv+=((1)-conv)*0.012;
      mx+=(tmx-mx)*0.05;my+=(tmy-my)*0.05;
      var phase=(Math.sin(t*0.28)*0.5+0.5);var k=Math.min(conv,1)*phase;
      cards.forEach(function(c,i){var s=c.userData.scatter,tg=c.userData.target;c.position.x=s.x+(tg.x-s.x)*k;c.position.y=s.y+(tg.y-s.y)*k+Math.sin(t+i)*0.05;c.position.z=s.z+(tg.z-s.z)*k;c.rotation.x=s.rx+(tg.rx-s.rx)*k;c.rotation.y=s.ry+(tg.ry-s.ry)*k;c.rotation.z=s.rz+(tg.rz-s.rz)*k;});
      ring.material.opacity=Math.max(0,(k-0.6))*0.6;ring.rotation.z+=0.004;ring.scale.setScalar(0.9+k*0.2);
      grp.rotation.y=mx*0.5;grp.rotation.x=my*0.3;cam.lookAt(0,0,0);
      rndr.render(scene,cam);requestAnimationFrame(loop);
    }
    loop();
    addEventListener('resize',function(){W=canvas.clientWidth;H=canvas.clientHeight||520;cam.aspect=W/H;cam.updateProjectionMatrix();rndr.setSize(W,H);});
    return {};
  }
  return {initHero:initHero,setTint:setTint};
})();
