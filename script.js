const toggle=document.querySelector(".menu-toggle");const nav=document.querySelector(".nav");toggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation")});nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle?.setAttribute("aria-expanded","false");toggle?.setAttribute("aria-label","Open navigation")}));const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();const revealTargets=document.querySelectorAll(".story-copy,.story-side,.experience-head,.dish,.manifesto-inner,.visit-copy,.location-card");revealTargets.forEach(el=>el.classList.add("reveal"));if("IntersectionObserver"in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});revealTargets.forEach(el=>observer.observe(el))}else{revealTargets.forEach(el=>el.classList.add("visible"))}

// Premium searchable digital menu
(()=>{
 const root=document.querySelector("#full-menu");
 if(!root)return;
 const search=root.querySelector("#menuSearch");
 const clear=root.querySelector("#clearMenuSearch");
 const buttons=[...root.querySelectorAll(".menu-filter")];
 const cards=[...root.querySelectorAll(".dish-menu-card")];
 const count=root.querySelector("#menuResultCount");
 const empty=root.querySelector(".live-menu-empty");
 const reset=root.querySelector("#resetMenuFilters");
 let filter="all";
 function apply(){
  const query=(search?.value||"").trim().toLocaleLowerCase();
  let visible=0;
  cards.forEach(card=>{
   const type=card.dataset.type||"";
   const category=card.dataset.category||"";
   const haystack=(card.dataset.search||card.textContent).toLocaleLowerCase();
   const categoryMatch=filter==="all"||filter===type||filter===category;
   const searchMatch=!query||haystack.includes(query)||card.textContent.toLocaleLowerCase().includes(query);
   const show=categoryMatch&&searchMatch;
   card.hidden=!show;
   if(show)visible++;
  });
  if(count)count.textContent="SHOWING "+visible+" OF "+cards.length+" DISHES";
  if(empty)empty.hidden=visible!==0;
  if(clear)clear.hidden=!query;
 }
 function activate(button){
  filter=button.dataset.category||button.dataset.filter||"all";
  buttons.forEach(b=>{
   const active=b===button;
   b.classList.toggle("active",active);
   b.setAttribute("aria-pressed",String(active));
  });
  apply();
 }
 buttons.forEach(button=>button.addEventListener("click",()=>activate(button)));
 search?.addEventListener("input",apply);
 clear?.addEventListener("click",()=>{search.value="";search.focus();apply()});
 reset?.addEventListener("click",()=>{
  if(search)search.value="";
  const all=buttons.find(b=>b.dataset.filter==="all");
  if(all)activate(all);else{filter="all";apply()}
 });
 apply();
})();


// Lightweight reading progress indicator
(()=>{
 const progress=document.querySelector("#reading-progress");
 let ticking=false;
 const updateProgress=()=>{
  if(!progress)return;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const ratio=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
  document.documentElement.style.setProperty("--scroll-progress",ratio.toFixed(4));
  ticking=false;
 };
 window.addEventListener("scroll",()=>{if(!ticking){window.requestAnimationFrame(updateProgress);ticking=true}},{passive:true});
 updateProgress();

})();
