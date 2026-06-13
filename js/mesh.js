/* RECONCILER AI — mesh shader (raw WebGL, zero deps, auto-init).
   Slow flowing indigo/periwinkle field. Verified-visible dark grade. */
(function(){
  var VERT='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FRAG=[
  'precision highp float;','uniform vec2 r;uniform float t;',
  'vec3 c1=vec3(0.043,0.047,0.075);',
  'vec3 c2=vec3(0.180,0.200,0.450);',
  'vec3 c3=vec3(0.470,0.510,0.960);',
  'vec3 c4=vec3(0.100,0.250,0.215);',
  'float n(vec2 p){return sin(p.x)*sin(p.y);}',
  'float fbm(vec2 p){float v=0.;float a=.55;',
  ' for(int i=0;i<5;i++){v+=a*n(p);p=mat2(1.6,1.2,-1.2,1.6)*p+vec2(3.1,1.7);a*=.5;}return v;}',
  'void main(){',
  ' vec2 uv=gl_FragCoord.xy/r;vec2 q=uv*vec2(r.x/r.y,1.);float t1=t*.04;',
  ' float f1=fbm(q*1.35+vec2(t1,-t1*.7));',
  ' float f2=fbm(q*2.1-vec2(t1*.8,t1*.5)+f1);',
  ' float f3=fbm(q*.8+vec2(-t1*.6,t1)+f2*.5);',
  ' vec3 col=c1;',
  ' col=mix(col,c2,smoothstep(-.4,.8,f1));',
  ' col=mix(col,c4,smoothstep(.0,.9,f2)*.6);',
  ' col=mix(col,c3,smoothstep(.42,1.05,f3)*.5);',
  ' float vig=smoothstep(1.5,.2,length(uv-vec2(.5,.42)));',
  ' col*=mix(.55,1.05,vig);',
  ' gl_FragColor=vec4(col,1.);}'].join('\n');
  function attach(canvas,seed){
    var gl=canvas.getContext('webgl',{antialias:false,alpha:false,powerPreference:'low-power'});
    if(!gl)return;
    function sh(ty,src){var s=gl.createShader(ty);gl.shaderSource(s,src);gl.compileShader(s);
      return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null;}
    var vs=sh(gl.VERTEX_SHADER,VERT),fs=sh(gl.FRAGMENT_SHADER,FRAG);if(!vs||!fs)return;
    var pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);
    if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return;
    gl.useProgram(pr);
    var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
    var lo=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(lo);gl.vertexAttribPointer(lo,2,gl.FLOAT,false,0,0);
    var uR=gl.getUniformLocation(pr,'r'),uT=gl.getUniformLocation(pr,'t');
    var vis=true,raf=null,t0=performance.now(),last=0;
    function size(){var r2=canvas.getBoundingClientRect();
      canvas.width=Math.max(2,r2.width*0.9);canvas.height=Math.max(2,r2.height*0.9);
      gl.viewport(0,0,canvas.width,canvas.height);}
    size();addEventListener('resize',size);
    if('IntersectionObserver'in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis&&!raf)loop();},{threshold:0}).observe(canvas);
    function loop(now){if(!vis){raf=null;return;}
      if(now&&now-last<33){raf=requestAnimationFrame(loop);return;}last=now||0;
      gl.uniform2f(uR,canvas.width,canvas.height);
      gl.uniform1f(uT,(performance.now()-t0)/1000+seed);
      gl.drawArrays(gl.TRIANGLES,0,3);raf=requestAnimationFrame(loop);}
    loop();
  }
  function init(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    [].slice.call(document.querySelectorAll('canvas[data-mesh]')).forEach(function(c,i){attach(c,i*37);});}
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
