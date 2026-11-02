const IMG={"logo": "assets/images/logo.png", "ad": "assets/images/sunrise-tea-ad.webp", "f_premium": "assets/images/front-premium.webp", "f_royal": "assets/images/front-royal.webp", "f_super": "assets/images/front-super.webp", "f_best": "assets/images/front-best.webp", "b_premium": "assets/images/back-premium.webp", "b_royal": "assets/images/back-royal.webp", "b_best": "assets/images/back-best.webp"},P=[{"id": "dana-premium", "c": "dana", "g": "premium", "n": "Sunrise Premium Dana", "p": 510, "f": "f_premium", "b": "b_premium", "pv": {"250": 135, "500": 260}}, {"id": "dana-royal", "c": "dana", "g": "royal", "n": "Sunrise Royal Dana", "p": 490, "f": "f_royal", "b": "b_royal", "pv": {"250": 130, "500": 250}}, {"id": "dana-super", "c": "dana", "g": "super", "n": "Sunrise Super Dana", "p": 460, "f": "f_super", "b": null, "pv": {"250": 125, "500": 240}}, {"id": "dana-best", "c": "dana", "g": "best", "n": "Sunrise Best Dana", "p": 360, "f": "f_best", "b": "b_best", "pv": {"250": 90, "500": 180}}, {"id": "dust-premium", "c": "dust", "g": "premium", "n": "Sunrise Premium Dust Tea", "p": 490, "f": "f_premium", "b": "b_premium", "pv": {"250": 130, "500": 250}}, {"id": "dust-royal", "c": "dust", "g": "royal", "n": "Sunrise Royal Dust Tea", "p": 480, "f": "f_royal", "b": "b_royal", "pv": {"250": 125, "500": 245}}, {"id": "dust-super", "c": "dust", "g": "super", "n": "Sunrise Super Dust Tea", "p": 460, "f": "f_super", "b": null, "pv": {"250": 120, "500": 235}}, {"id": "dust-best", "c": "dust", "g": "best", "n": "Sunrise Best Dust Tea", "p": 440, "f": "f_best", "b": "b_best", "pv": {"250": 115, "500": 230}}, {"id": "dust-assam", "c": "dust", "g": "assam", "n": "Sunrise Assam Dust Tea", "p": 360, "f": null, "b": null, "pv": {"250": 90, "500": 180}}, {"id": "dust-apni", "c": "dust", "g": "apni", "n": "Sunrise Apni Dust Tea", "p": 320, "f": null, "b": null}],WA="919924983251";
IMG.f_denrich="assets/images/front-denrich.webp";IMG.f_elaichi="assets/images/front-elaichi.webp";IMG.t_denrich=IMG.f_denrich;IMG.t_elaichi=IMG.f_elaichi;
P.push({id:"sp-denrich",c:"special",g:"denrich",n:"Denrich Milk Powder",p:45,u:"pack",w:"100 g pack",wt:0.1,f:"f_denrich",t:"t_denrich",b:null},{id:"sp-elaichi",c:"special",g:"elaichi",n:"Sunrise Elaichi Magic",p:200,u:"pack",w:"50 g pack",wt:0.05,f:"f_elaichi",t:"t_elaichi",b:null});
const WT=ids=>ids.reduce((s,i)=>s+cart[i]*(byId(i).wt||1),0);
P.filter(b=>b.c==="dana"||b.c==="dust").forEach(b=>{b.vars=[];[[500,.5],[250,.25]].forEach(([g,k])=>{const v={...b,id:b.id+"-"+g,n:b.n+" ("+g+" g)",p:(b.pv&&b.pv[g])||Math.ceil(b.p*k),u:"pack",w:g+" g pack",wt:k,vars:null,c:"variant",parent:b.id};P.push(v);b.vars.push(v.id)})});
const UN=(p,q)=>p.u==="pack"?(q>1?"packs":"pack"):"kg";
const COL={premium:"#F08300",royal:"#E3000F",super:"#009A3E",best:"#0A94D6",denrich:"#1B2F7A",elaichi:"#2E7D1F"};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const fmt=n=>"₹"+n.toLocaleString("en-IN");
let cart={};try{cart=JSON.parse(localStorage.getItem("sr_cart")||"{}")}catch(e){}
const save=()=>{try{localStorage.setItem("sr_cart",JSON.stringify(cart))}catch(e){}};
const byId=id=>P.find(p=>p.id===id);
const clamp=v=>Math.max(1,Math.min(999,parseInt(v)||1));
$$("[data-i]").forEach(i=>i.src=IMG[i.dataset.i]);$("#yr").textContent=new Date().getFullYear();
const thumb=p=>p.f?`<img src="${IMG[p.f]}" alt="${p.n} pack, front" width="140" height="210">`:`<img class="lg" src="${IMG.logo}" alt="Sunrise Tea logo" width="180" height="120">`;
const qtyUI=(n,v)=>`<div class="qty"><button type="button" data-a="dec" aria-label="Decrease quantity of ${n}">−</button><input type="number" min="1" max="999" value="${v}" inputmode="numeric" aria-label="Quantity of ${n}"><button type="button" data-a="inc" aria-label="Increase quantity of ${n}">+</button></div>`;
$$(".grid").forEach(g=>{g.innerHTML=P.filter(p=>p.c===g.dataset.cat).map(p=>`<article class="card" data-id="${p.id}" style="--c:${COL[p.g]||"#fff"}"><div class="pic">${thumb(p)}${p.b?`<button type="button" class="flip" data-a="flip" aria-pressed="false">View back</button>`:""}</div>
<h3 class="nm${COL[p.g]?"":" w"}">${p.n}</h3>${p.vars?`<div class="sz" role="group" aria-label="Pack size for ${p.n}"><button type="button" data-a="size" data-i="${p.id}" aria-pressed="true">1 kg</button><button type="button" data-a="size" data-i="${p.vars[0]}" aria-pressed="false">500 g</button><button type="button" data-a="size" data-i="${p.vars[1]}" aria-pressed="false">250 g</button></div>`:""}<p class="pr"><b>${fmt(p.p)}</b> / ${p.w||"1 kg"}</p>
<div class="buy">${qtyUI(p.n,1)}<button type="button" class="btn add" data-a="add">Add to cart</button></div><p class="sub">Subtotal for 1 ${UN(p,1)}: ${fmt(p.p)}</p></article>`).join("")});
$("#prodList").innerHTML=P.filter(p=>p.c!=="variant").map(p=>`<div class="pk" data-id="${p.id}"><label class="ck"><input type="checkbox"> ${p.n} (${fmt(p.p)}/${p.u||"kg"})</label><input type="number" min="1" inputmode="numeric" placeholder="${p.u==="pack"?"packs":"kg"}/month" aria-label="Monthly quantity of ${p.n}" disabled></div>`).join("");
$("#prodList").addEventListener("change",e=>{const c=e.target.closest("[type=checkbox]");if(!c)return;const n=c.closest(".pk").querySelector("[type=number]");n.disabled=!c.checked;if(c.checked)n.focus();else n.value=""});
let tt;const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),2200)};
function cardQty(c,v){const i=c.querySelector("input");i.value=v;c.querySelector(".sub").textContent=`Subtotal for ${v} ${UN(byId(c.dataset.id),v)}: ${fmt(v*byId(c.dataset.id).p)}`}
document.addEventListener("click",e=>{const b=e.target.closest("[data-a]");if(!b)return;const a=b.dataset.a,c=b.closest(".card");
if(c){const p=byId(c.dataset.id),i=c.querySelector("input");
if(a==="inc")cardQty(c,clamp(+i.value+1));if(a==="dec")cardQty(c,clamp(+i.value-1));
if(a==="size"){c.dataset.id=b.dataset.i;const np=byId(b.dataset.i);c.querySelector(".pr").innerHTML=`<b>${fmt(np.p)}</b> / ${np.w||"1 kg"}`;c.querySelectorAll(".sz button").forEach(x=>x.setAttribute("aria-pressed",x===b));cardQty(c,clamp(i.value));return}
if(a==="flip"){const on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on);b.textContent=on?"View front":"View back";const im=c.querySelector(".pic img");im.src=IMG[on?p.b:p.f];im.alt=`${p.n} pack, ${on?"back":"front"}`}
if(a==="add"){const q=clamp(i.value);cart[p.id]=Math.min(999,(cart[p.id]||0)+q);save();render();toast(`${q} ${UN(p,q)} ${p.n} added`);b.textContent="Added ✓";setTimeout(()=>b.textContent="Add to cart",1200)}}
const l=b.closest(".ln");if(l){const id=l.dataset.id;if(a==="inc")cart[id]=clamp((cart[id]||1)+1);if(a==="dec")cart[id]=clamp((cart[id]||1)-1);if(a==="rm")delete cart[id];save();render()}});
document.addEventListener("change",e=>{const i=e.target.closest(".qty input");if(!i)return;const c=i.closest(".card"),l=i.closest(".ln");
if(c)cardQty(c,clamp(i.value));if(l){cart[l.dataset.id]=clamp(i.value);save();render()}});
function render(){const ids=Object.keys(cart).filter(byId),kg=ids.filter(i=>byId(i).u!=="pack").reduce((s,i)=>s+cart[i],0),pk=ids.filter(i=>byId(i).u==="pack").reduce((s,i)=>s+cart[i],0),tot=ids.reduce((s,i)=>s+cart[i]*byId(i).p,0);
$("#cnt").textContent=ids.length;$("#sub").textContent=fmt(tot);$("#tot").textContent=fmt(tot);$("#kgs").textContent=`${ids.length} product${ids.length==1?"":"s"} · ${+WT(ids).toFixed(2)} kg total`;
$("#foot").hidden=!ids.length;
$("#lines").innerHTML=ids.length?ids.map(id=>{const p=byId(id);return`<div class="ln" data-id="${id}">${p.t?`<img src="${IMG[p.t]}" alt="">`:p.f?`<img src="${IMG[p.f]}" alt="">`:`<img src="${IMG.logo}" alt="">`}<div><h4>${p.n}</h4><small>${fmt(p.p)}/${p.u==="pack"?p.w:"kg"} · ${fmt(p.p*cart[id])}</small><br><button class="rm" data-a="rm" aria-label="Remove ${p.n}">Remove</button></div>${qtyUI(p.n,cart[id])}</div>`}).join(""):`<div class="empty"><p><b>Your cart is empty.</b></p><p>Add tea or special products to start an order.</p><a class="btn" href="#dana" data-close>Browse dana tea</a></div>`;}
let last;const cartEl=$("#cart");
function open(){last=document.activeElement;cartEl.classList.add("on");$("#shade").classList.add("on");document.body.style.overflow="hidden";$("#closeCart").focus()}
function close(){cartEl.classList.remove("on");$("#shade").classList.remove("on");document.body.style.overflow="";last&&last.focus&&last.focus()}
$("#openCart").onclick=open;$("#closeCart").onclick=close;$("#shade").onclick=close;cartEl.addEventListener("click",e=>{if(e.target.closest("[data-close]"))close()});
$("#clear").onclick=()=>{cart={};save();render();toast("Cart cleared")};
document.addEventListener("keydown",e=>{if(!cartEl.classList.contains("on"))return;if(e.key==="Escape")close();
if(e.key==="Tab"){const f=[...cartEl.querySelectorAll("button,a[href],input,textarea,summary")].filter(x=>!x.hidden&&x.offsetParent);const a=f[0],z=f[f.length-1];
if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
const menu=$(".menu"),nav=$("#nav");menu.onclick=()=>{const o=nav.classList.toggle("on");menu.setAttribute("aria-expanded",o)};nav.onclick=e=>{if(e.target.matches("a")){nav.classList.remove("on");menu.setAttribute("aria-expanded",false)}};
const okPhone=v=>/^\+?[\d\s-]{10,15}$/.test(v.trim());
function send(text,link){const u=`https://wa.me/${WA}?text=${encodeURIComponent(text)}`;link.href=u;link.hidden=false;link.click()}
$("#ord").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target),er=$("#ordErr"),ids=Object.keys(cart).filter(byId);
if(!ids.length){er.textContent="Your cart is empty. Add a product first.";return}
if(!f.get("name").trim()){er.textContent="Enter your name.";return}
if(!okPhone(f.get("phone"))){er.textContent="Enter a valid mobile number, for example 99249 83251.";return}
if(!f.get("addr").trim()){er.textContent="Enter the delivery address.";return}er.textContent="";
let kg=0,pk=0,tot=0;const L=ids.map((id,n)=>{const p=byId(id),q=cart[id];if(p.u==="pack")pk+=q;else kg+=q;tot+=q*p.p;return`${n+1}. ${p.n} – ${q} ${UN(p,q)} × ${fmt(p.p)} = ${fmt(q*p.p)}`});
const d=new Date().toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"});
send(`*New order – Sunrise Tea*\n${d}\n\n*Items*\n${L.join("\n")}\n\nItems: ${fmt(tot)}\n*Total: ${fmt(tot)}* (delivery charges included) (${+WT(ids).toFixed(2)} kg total)\n\n*Customer*\nName: ${f.get("name").trim()}\nMobile: ${f.get("phone").trim()}${f.get("biz").trim()?"\nBusiness: "+f.get("biz").trim():""}\nAddress: ${f.get("addr").trim()}${f.get("note").trim()?"\nNote: "+f.get("note").trim():""}\n\nPlease confirm availability, delivery and final amount.`,$("#ordLink"))});
$("#enq").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target),er=$("#enqErr");
if(!f.get("name").trim()){er.textContent="Enter your name.";return}
if(!okPhone(f.get("phone"))){er.textContent="Enter a valid mobile number, for example 99249 83251.";return}
const rows=[...document.querySelectorAll("#prodList .pk")].filter(r=>r.querySelector("[type=checkbox]").checked);if(!rows.length){er.textContent="Tick at least one product.";return}if(rows.some(r=>!(+r.querySelector("[type=number]").value>0))){er.textContent="Enter the monthly quantity for each product you ticked.";return}er.textContent="";const sel=rows.map(r=>({p:byId(r.dataset.id),q:+r.querySelector("[type=number]").value})),L=sel.map((s,i)=>`${i+1}. ${s.p.n} – ${s.q} ${s.p.u==="pack"?"packs":"kg"} × ${fmt(s.p.p)}/${s.p.u||"kg"}`).join("\n"),T=sel.filter(s=>s.p.u!=="pack").reduce((a,s)=>a+s.q,0);
send(`*Bulk enquiry – Sunrise Tea*\n\nName: ${f.get("name").trim()}\nMobile: ${f.get("phone").trim()}\nBusiness: ${f.get("biz").trim()||"-"} (${f.get("type")})\nCity/area: ${f.get("city").trim()||"-"}\nProducts needed (per month):\n${L}${T?"\nTotal tea: "+T+" kg":""}${f.get("msg").trim()?"\nMessage: "+f.get("msg").trim():""}\n\nPlease share wholesale rates and delivery details.`,$("#enqLink"))});
render();

document.querySelectorAll(".bulkBtn").forEach(function(b){b.addEventListener("click",function(e){e.preventDefault();var f=document.getElementById("enq");f.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(function(){var i=f.querySelector("input[name=name]");if(i)i.focus({preventScroll:true})},600)})});
