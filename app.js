const openDialog=id=>document.getElementById(id).showModal();
document.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>openDialog(b.dataset.open));
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').onclick=()=>d.close();d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
const url=new URL('./',location.href).href;
document.getElementById('share').onclick=()=>{document.getElementById('url').value=url;const q=document.getElementById('qr');q.replaceChildren();if(typeof QRCode!=='undefined')new QRCode(q,{text:url,width:190,height:190,colorDark:'#4C3421',colorLight:'#F7F19E',correctLevel:QRCode.CorrectLevel.M});else q.textContent='Comparte el enlace de abajo.';openDialog('share-dialog');};
document.getElementById('copy').onclick=async()=>{try{await navigator.clipboard.writeText(url);document.getElementById('status').textContent='Enlace copiado.';}catch{document.getElementById('url').select();document.getElementById('status').textContent='Selecciona y copia el enlace.';}};
document.getElementById('native-share').onclick=async()=>{if(navigator.share){try{await navigator.share({title:'Conchis · Baked with love',url});}catch(e){if(e.name!=='AbortError')document.getElementById('status').textContent='Puedes copiar el enlace.';}}else document.getElementById('copy').click();};
document.getElementById('save').onclick=()=>{const card=['BEGIN:VCARD','VERSION:3.0','FN:Conchis','ORG:Conchis Pastelería Artesanal','TEL;TYPE=WORK,VOICE:+573015911934','ADR;TYPE=WORK:;;Calle 110 No. 7C-16;Bogotá;;;Colombia','URL:'+url,'END:VCARD',''].join('\r\n');const u=URL.createObjectURL(new Blob([card],{type:'text/vcard;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download='Conchis.vcf';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),3000);};
let installPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;});
document.getElementById('install').onclick=async()=>{if(installPrompt){await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;}else openDialog('install-help');};
window.addEventListener('appinstalled',()=>{installPrompt=null;document.getElementById('install').hidden=true;document.getElementById('install-help').close();});
if('serviceWorker'in navigator && ['https:','http:'].includes(location.protocol)){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.error));}
if(new URLSearchParams(location.search).has('catalogo'))openDialog('catalog');
if(new URLSearchParams(location.search).has('contacto'))location.href='https://wa.me/573015911934';
