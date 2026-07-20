// Terrain survey: measures regional depth (height range over a big area) and local roughness (std-dev over a small patch).
const fs=require('fs'), vm=require('vm');
global.window=global;global.self=global;global.innerWidth=1280;global.innerHeight=720;global.devicePixelRatio=1;
global.atob=s=>Buffer.from(s,'base64').toString('binary');global.addEventListener=()=>{};global.requestAnimationFrame=()=>{};
global.createImageBitmap=undefined;global.URL={createObjectURL:()=>'x',revokeObjectURL(){}};
global.Image=class{constructor(){this._ls={};}addEventListener(t,f){this._ls[t]=f;}set src(v){setTimeout(()=>{if(this._ls.load)this._ls.load({target:this});},3);}};
const c2={createRadialGradient:()=>({addColorStop(){}}),fillStyle:'',fillRect(){},clearRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},arc(){},fill(){},measureText:()=>({width:0})};
function mk(){const o={style:{},classList:{add(){},remove(){},toggle(){}},firstElementChild:{style:{},classList:{add(){},remove(){},toggle(){}}},textContent:'',appendChild(){},setAttribute(){},addEventListener(){},width:64,height:64,getContext:()=>c2};Object.defineProperty(o,'src',{set(){},get(){}});return o;}
global.document=new Proxy({},{get:(t,p)=>p==='body'?{classList:{add(){},remove(){},toggle(){}},style:{}}:p==='getElementById'?()=>mk():(p==='createElement'||p==='createElementNS')?()=>mk():undefined});
const THREE=require('/home/user/assets/three.min.js');global.THREE=THREE;
THREE.WebGLRenderer=class{constructor(){this.domElement=mk();this.shadowMap={};}setPixelRatio(){}setSize(){}setClearColor(){}render(){}};
vm.runInThisContext(fs.readFileSync('/home/user/assets/GLTFLoader.js','utf8'));
vm.runInThisContext(fs.readFileSync('/home/user/assets/SkeletonUtils.js','utf8'));
vm.runInThisContext(fs.readFileSync('/home/user/assets/assets_b64.js','utf8'));
const html=fs.readFileSync('/home/user/index.html','utf8');
const game=html.slice(html.lastIndexOf('<script>')+8,html.lastIndexOf('</script>'));
vm.runInThisContext(game+`\n;global.__T={terrainHeight,biomeIndex};`);
const T=global.__T;
const BNAME=['waste','desert','swamp','city'];
function stats(cx,cz,span,step){ let mn=1e9,mx=-1e9,sum=0,n=0,vals=[];
  for(let x=cx-span;x<=cx+span;x+=step) for(let z=cz-span;z<=cz+span;z+=step){ const h=T.terrainHeight(x,z); mn=Math.min(mn,h); mx=Math.max(mx,h); sum+=h; vals.push(h); n++; }
  const mean=sum/n; let v=0; for(const h of vals) v+=(h-mean)*(h-mean);
  return {mn:+mn.toFixed(1),mx:+mx.toFixed(1),range:+(mx-mn).toFixed(1),roughSD:+Math.sqrt(v/n).toFixed(2)}; }
for(const [x,z] of [[0,0],[300,0],[0,300],[-300,-300],[600,600],[1200,400],[-900,900],[1600,-1200]]){
  const bi=T.biomeIndex(x,z); const reg=stats(x,z,400,40); const loc=stats(x,z,20,1);
  console.log(`(${x},${z}) ${BNAME[bi].padEnd(6)} regional range=${String(reg.range).padStart(6)} (min ${reg.mn}..max ${reg.mx})  local roughness sd=${loc.roughSD}`);
}
