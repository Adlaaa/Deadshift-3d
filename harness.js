// Headless logic harness (no GPU). Stubs DOM/WebGL enough to boot the game and run step()/loop().
const fs=require('fs'), vm=require('vm');
global.window=global; global.self=global; global.navigator=global.navigator||{maxTouchPoints:0,userAgent:'node-harness'}; global.innerWidth=1280; global.innerHeight=720; global.devicePixelRatio=1;
global.atob=s=>Buffer.from(s,'base64').toString('binary');
global.addEventListener=()=>{}; global.removeEventListener=()=>{}; global.requestAnimationFrame=()=>{};
global.createImageBitmap=undefined; global.URL={createObjectURL:()=>'blob:x',revokeObjectURL(){}};
global.Image=class{constructor(){this._ls={};this.width=0;this.height=0;}addEventListener(t,fn){this._ls[t]=fn;}removeEventListener(){}set src(v){setTimeout(()=>{this.width=8;this.height=8;if(this._ls.load)this._ls.load({target:this});},5);}};
const ctx2d={createRadialGradient:()=>({addColorStop(){}}),fillStyle:'',fillRect(){},clearRect(){},font:'',textAlign:'',textBaseline:'',lineWidth:0,lineCap:'',strokeStyle:'',globalAlpha:1,globalCompositeOperation:'',strokeText(){},fillText(){},measureText:()=>({width:0}),beginPath(){},moveTo(){},lineTo(){},stroke(){},arc(){},fill(){},save(){},restore(){},translate(){},scale(){},rotate(){},setLineDash(){}};
function makeEl(){const ls={};const o={style:{},classList:{add(){},remove(){},toggle(){}},textContent:'',appendChild(){},setAttribute(){},removeAttribute(){},addEventListener(t,fn){ls[t]=fn;},removeEventListener(){},width:64,height:64,crossOrigin:'',getContext:()=>ctx2d,onclick:null,_ls:ls,children:[]};
  o.firstElementChild={style:{},textContent:'',classList:{add(){},remove(){},toggle(){}}};
  Object.defineProperty(o,'src',{set(v){o._src=v;setTimeout(()=>{o.width=8;o.height=8;if(ls.load)ls.load({target:o});},5);},get(){return o._src;}});
  return o;}
global.document=new Proxy({},{get:(t,p)=>{if(p==='body')return{classList:{add(){},remove(){},toggle(){}},style:{}};if(p==='getElementById')return()=>makeEl();if(p==='createElement'||p==='createElementNS')return()=>makeEl();if(p==='querySelectorAll')return()=>[];if(p==='querySelector')return()=>null;return undefined;}});
const THREE=require('/home/user/assets/three.min.js'); global.THREE=THREE;
THREE.WebGLRenderer=class{constructor(){this.domElement=makeEl();this.shadowMap={};}setPixelRatio(){}setSize(){}setClearColor(){}render(){}};
vm.runInThisContext(fs.readFileSync('/home/user/assets/GLTFLoader.js','utf8'));
vm.runInThisContext(fs.readFileSync('/home/user/assets/SkeletonUtils.js','utf8'));
vm.runInThisContext(fs.readFileSync('/home/user/assets/assets_b64.js','utf8'));
const html=fs.readFileSync('/home/user/index.html','utf8');
const game=html.slice(html.lastIndexOf('<script>')+8, html.lastIndexOf('</script>'));
vm.runInThisContext(game+`\n;global.__API={get playing(){return playing},set playing(v){playing=v},get bike(){return bike},get bikeState(){return bikeState},get zombies(){return zombies},get useMouseAim(){return useMouseAim},set useMouseAim(v){useMouseAim=v},keys,step,loop,spawnZombie,startGame};`);
function runSteps(api,n){ let e=null; try{ for(let i=0;i<n;i++) api.step(0.016); }catch(x){ e=x; } return e; }
setTimeout(()=>{
  const api=global.__API;
  if(!api||!api.bike){ console.log('BOOT FAILED'); process.exit(2); }
  api.playing=true;
  api.keys['KeyW']=true; api.bikeState.speed=0;
  let e=runSteps(api,90); console.log('gear1 +W : speed='+api.bikeState.speed.toFixed(2)+' posZ='+api.bike.position.z.toFixed(2)+(e?' THREW '+e.message:''));
  api.bikeState.speed=5; api.bike.position.set(0,0,0); e=runSteps(api,40); console.log('neutral +W: speed='+api.bikeState.speed.toFixed(2)+(e?' THREW '+e.message:''));
  api.bikeState.speed=0; api.bike.position.set(0,0,0); e=runSteps(api,200); console.log('gear3 +W : speed='+api.bikeState.speed.toFixed(2)+(e?' THREW '+e.message:''));
  api.bikeState.speed=0; api.bike.position.set(0,0,0); e=runSteps(api,90); console.log('reverse +W: speed='+api.bikeState.speed.toFixed(2)+(e?' THREW '+e.message:''));
  api.bikeState.speed=40; e=null; try{ for(let i=0;i<10;i++) api.loop(i*16+1000); }catch(x){ e=x; } console.log('loop+overlay@4th: '+(e?'THREW '+e.message:'OK'));
  api.bikeState.speed=40; e=null; try{ api.loop(2000); }catch(x){ e=x; } console.log('loop@3rd(overlay off): '+(e?'THREW '+e.message:'OK'));
  console.log('NaN check speed:', Number.isNaN(api.bikeState.speed));

  // --- stress test: fill a full horde and time 60 frames (logic + skinning, no GL) ---
  api.bike.position.set(0,0,0); api.bikeState.speed=20; api.keys['KeyW']=true;
  let spawned=0; for(let i=0;i<85;i++){ try{ api.spawnZombie(); spawned++; }catch(e){ console.log('spawn THREW:',e.message); break; } }
  let dmin=1e9,dmax=0; for(const z of api.zombies){ const dx=z.P.position.x-api.bike.position.x, dz=z.P.position.z-api.bike.position.z; const d=Math.hypot(dx,dz); if(d<dmin)dmin=d; if(d>dmax)dmax=d; }
  console.log('spawn ring -> player distance: min='+dmin.toFixed(1)+' max='+dmax.toFixed(1)+' (expect ~12-26)');
  api.useMouseAim=false;  // exercise the touch auto-aim path under load
  const f0=Date.now(); let ef=null;
  try{ for(let i=0;i<60;i++) api.loop(2000+i*16); }catch(e){ ef=e; }
  const ms=Date.now()-f0;
  console.log('STRESS zombies='+api.zombies.length+' (spawned '+spawned+') | 60 frames=' +ms+ 'ms (~'+(ms/60).toFixed(2)+' ms/frame) '+(ef?('THREW '+ef.message):'OK'));
  process.exit(0);
},2000);
setTimeout(()=>{console.log('TIMEOUT');process.exit(3);},9000);
