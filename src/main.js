const canvas=document.getElementById('world');
const ctx=canvas.getContext('2d');
ctx.imageSmoothingEnabled=false;

const WORLD={w:8200,h:8200,tile:32};
const player={x:4100,y:4100,speed:230};
const state={day:1,minutes:8*60,area:'Pueblo',paused:false};
const keys=new Set();

// Geografía estructural. Las coordenadas son parte de la ley del mundo, no decoración.
const regions=[
 {id:'river',name:'Río',x:5400,y:900,w:1800,h:6100},
 {id:'bardas',name:'Bardas',x:6100,y:0,w:2100,h:8200},
 {id:'town',name:'Pueblo',x:3000,y:3000,w:2200,h:2200},
 {id:'farms',name:'Chacras',x:1100,y:1800,w:6000,h:4600},
 {id:'picada21',name:'Picada 21',x:400,y:6500,w:1500,h:1200}
];

const facts=[
 'La historia se aprende recorriendo, preguntando y comparando recuerdos.',
 'Los objetos, caminos y edificios pueden ser pistas históricas.',
 'Luna no recibe todas las respuestas: debe construirlas con el jugador.',
 'Un testimonio puede ser parcial; dos recuerdos pueden contradecirse.',
 'El territorio también cuenta una historia: agua, chacras, caminos y bardas explican cómo se vive.',
 'Picada 21 es un asentamiento lejano y difícil de alcanzar; llegar forma parte del aprendizaje.'
];

function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function worldToScreen(x,y){return{x:(x-player.x)+canvas.width/2,y:(y-player.y)+canvas.height/2};}
function inRegion(r,x,y){return x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h;}
function currentArea(){
  const p=regions.find(r=>inRegion(r,player.x,player.y)&&r.id!=='farms');
  if(p)return p.name;
  return 'Chacras';
}
function noise(x,y){return (Math.sin(x*.017)+Math.sin(y*.013)+Math.sin((x+y)*.007))*.5;}

function drawPixelRect(x,y,w,h,fill){ctx.fillStyle=fill;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
function drawWorld(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // Base: tierra seca del valle.
  ctx.fillStyle='#87905d';ctx.fillRect(0,0,canvas.width,canvas.height);
  const scale=canvas.width/WORLD.w;
  // Terreno visible alrededor del jugador, construido por celdas grandes.
  const startX=Math.floor((player.x-450)/160)*160;
  const startY=Math.floor((player.y-450)/160)*160;
  for(let wy=startX;wy<player.x+450;wy+=160){
    for(let yy=startY;yy<player.y+450;yy+=160){
      const s=worldToScreen(wy,yy);
      const n=noise(wy,yy);
      ctx.fillStyle=n>.25?'#929a64':n<-.25?'#7f8756':'#89915c';
      ctx.fillRect(s.x,s.y,162,162);
    }
  }
  // Río: corredor lejano y continuo.
  const river=regions[0];
  const rs=worldToScreen(river.x,river.y);
  ctx.fillStyle='#587d82';ctx.fillRect(rs.x,rs.y,river.w,river.h);
  ctx.fillStyle='#6f9691';
  for(let y=rs.y;y<rs.y+river.h;y+=24)ctx.fillRect(rs.x+10+Math.sin(y*.05)*8,y,river.w-20,5);
  // Bardas: franjas de terreno alto al este.
  const b=regions[1];const bs=worldToScreen(b.x,b.y);
  ctx.fillStyle='#9b8062';ctx.fillRect(bs.x,bs.y,b.w,b.h);
  for(let x=bs.x;x<bs.x+b.w;x+=42){ctx.fillStyle=(x%84===0)?'#b09570':'#80694f';ctx.fillRect(x,0,18,canvas.height);}
  // Chacras: parcelas alrededor del pueblo.
  for(let x=900;x<7000;x+=420){
    for(let y=1500;y<6500;y+=360){
      const s=worldToScreen(x,y);
      if(s.x>canvas.width||s.y>canvas.height||s.x+360<0||s.y+300<0)continue;
      ctx.strokeStyle='#65704c';ctx.lineWidth=4;ctx.strokeRect(s.x,s.y,360,300);
      for(let row=0;row<5;row++)ctx.fillRect(s.x+20,s.y+35+row*45,320,3);
    }
  }
  // Pueblo compacto.
  const t=regions[2];const ts=worldToScreen(t.x,t.y);
  ctx.fillStyle='#6e6958';ctx.fillRect(ts.x,ts.y,t.w,t.h);
  for(let x=t.x+100;x<t.x+t.w-100;x+=230){for(let y=t.y+100;y<t.y+t.h-100;y+=190){
    const q=worldToScreen(x,y);ctx.fillStyle='#b59b72';ctx.fillRect(q.x,q.y,90,65);ctx.fillStyle='#5c493a';ctx.fillRect(q.x,q.y,90,12);
  }}
  // Camino principal.
  ctx.fillStyle='#b79a6d';
  const road=worldToScreen(0,4300);ctx.fillRect(0,road.y,canvas.width,70);
  // Picada 21: pequeña, lejana y deliberadamente menos densa.
  const p21=regions[4];const ps=worldToScreen(p21.x,p21.y);
  ctx.fillStyle='#77704f';ctx.fillRect(ps.x,ps.y,p21.w,p21.h);
  for(let x=p21.x+150;x<p21.x+p21.w-100;x+=280){for(let y=p21.y+120;y<p21.y+p21.h-100;y+=230){const q=worldToScreen(x,y);ctx.fillStyle='#a98d63';ctx.fillRect(q.x,q.y,70,50);}}
  ctx.fillStyle='#c5aa73';const r1=worldToScreen(0,6900);ctx.fillRect(r1.x,r1.y,canvas.width,22);
  // Árboles pixelados: reglas simples, reproducibles.
  for(let x=Math.floor(player.x/110)*110-700;x<player.x+700;x+=110){for(let y=Math.floor(player.y/130)*130-700;y<player.y+700;y+=130){
    if((x+y)%330===0)continue;const q=worldToScreen(x,y);ctx.fillStyle='#45583c';ctx.fillRect(q.x+8,q.y,18,28);ctx.fillStyle='#354934';ctx.fillRect(q.x,q.y-5,34,24);
  }}
  // Jugador/Luna.
  const cx=canvas.width/2,cy=canvas.height/2;ctx.fillStyle='#3a2c2b';ctx.fillRect(cx-10,cy-4,20,26);ctx.fillStyle='#d5b77c';ctx.fillRect(cx-8,cy-24,16,17);ctx.fillStyle='#2b2521';ctx.fillRect(cx-11,cy-28,22,6);
  ctx.fillStyle='#f2e2b5';ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillText('LUNA',cx,cy-38);
}

function say(text){
  document.getElementById('speaker').textContent='Luna';
  document.getElementById('dialogue-text').textContent=text;
  document.getElementById('dialogue').classList.remove('hidden');
}
function toast(text){const el=document.getElementById('toast');el.textContent=text;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),1800);}
function interact(){
  const area=currentArea();
  if(area==='Picada 21')say('Llegamos lejos del pueblo. Acá la historia se siente distinta. Hay que mirar, escuchar y preguntar antes de sacar conclusiones.');
  else if(area==='Río')say('El río no es solo paisaje. El agua ayuda a explicar por qué un territorio puede convertirse en un lugar de vida y producción.');
  else if(area==='Bardas')say('Las bardas marcan el paisaje. Para entender una comunidad también hay que entender el suelo que la rodea.');
  else if(area==='Chacras')say('Las chacras cuentan otra parte de la historia: trabajo, agua, familias, producción y caminos.');
  else say(facts[state.day%facts.length]);
}
function update(dt){
  if(state.paused)return;
  let dx=0,dy=0;if(keys.has('ArrowUp')||keys.has('w'))dy--;if(keys.has('ArrowDown')||keys.has('s'))dy++;if(keys.has('ArrowLeft')||keys.has('a'))dx--;if(keys.has('ArrowRight')||keys.has('d'))dx++;
  if(dx||dy){const len=Math.hypot(dx,dy);player.x=clamp(player.x+dx/len*player.speed*dt,80,WORLD.w-80);player.y=clamp(player.y+dy/len*player.speed*dt,80,WORLD.h-80);}
  state.minutes+=dt*3;if(state.minutes>=1440){state.minutes-=1440;state.day++;say('Comienza un nuevo día. El territorio sigue ahí, pero nunca exactamente igual.');}
  state.area=currentArea();
  document.getElementById('area-readout').textContent=state.area;
  const hh=String(Math.floor(state.minutes/60)).padStart(2,'0'),mm=String(Math.floor(state.minutes%60)).padStart(2,'0');
  document.getElementById('time-readout').textContent=`Día ${state.day} · ${hh}:${mm}`;
}
function loop(now){const dt=Math.min((now-(loop.last||now))/1000,.05);loop.last=now;update(dt);drawWorld();requestAnimationFrame(loop);}

window.addEventListener('keydown',e=>{keys.add(e.key);if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();if(e.key.toLowerCase()==='e')interact();if(e.key.toLowerCase()==='m')toast('Mapa: el mundo tiene 8200 × 8200 unidades.');});
window.addEventListener('keyup',e=>keys.delete(e.key));
document.querySelectorAll('[data-key]').forEach(b=>{b.addEventListener('pointerdown',()=>keys.add(b.dataset.key));b.addEventListener('pointerup',()=>keys.delete(b.dataset.key));b.addEventListener('pointerleave',()=>keys.delete(b.dataset.key));});
document.getElementById('interact').onclick=interact;
document.getElementById('map').onclick=()=>toast('Mundo 8200: Pueblo → Chacras → Río/Bardas → Picada 21');
document.getElementById('dialogue-next').onclick=()=>document.getElementById('dialogue').classList.add('hidden');
document.getElementById('reset').onclick=()=>{player.x=4100;player.y=4100;state.day=1;state.minutes=480;state.area='Pueblo';toast('Luna volvió al pueblo.');};

say('Este es el comienzo de nuestro viaje. Vamos a aprender la historia de Villa Pelón observando el territorio, hablando con su gente y descubriendo sus cambios.');
requestAnimationFrame(loop);