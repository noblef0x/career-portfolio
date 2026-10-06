document.documentElement.classList.add('js-ready');
const cases=[
{category:"support",label:"Support",title:"Getting a customer’s phones back after a lightning strike",summary:"Less than 30 days after a customer’s new phone system went in, an overnight lightning strike destroyed the small computer that ran it.",approach:"A teammate routed the customer’s calls to a cell phone while I recovered the phone system from the damaged unit’s drive and rebuilt it on a temporary computer. We then worked with the manufacturer on a replacement.",result:"Calls were flowing again within about an hour, and the manufacturer replaced the unit at no cost to the customer.",skills:"Urgent response • Linux • VoIP phone systems • Customer communication"},
{category:"support",label:"Support",title:"Finding out why a server kept shutting down",summary:"At the Kalamazoo Gospel Mission, the server guests used for GED work, housing resources, and computer classes was shutting down several times a week in summer.",approach:"My team and I traced it to heat: the server sat in a closed-in basement space next to a freezer compressor. Building ventilation was not in the budget, so we moved the server to a cooler spot and put it on a battery backup.",result:"Shutdowns dropped from several times a week to about once a month, without the cost of a ventilation project.",skills:"Root-cause analysis • Troubleshooting • Working within a budget"},
{category:"process",label:"Process",title:"Making support requests easier to see",summary:"At Micro-LAM, requests arrived through email, phone, and in person, making support visibility and prioritization harder.",approach:"Helped centralize requests into one ticketing process so they could be tracked, prioritized, and acknowledged more consistently.",result:"Initial response on standard day-to-day issues moved from roughly 60 to roughly 30 minutes, and on critical emergencies from roughly 30 to roughly 15 minutes—about a 50% reduction in each.",skills:"Syncro • Process improvement • Case documentation • Prioritization"},
{category:"process",label:"Process",title:"Standardizing manufacturing system setup",summary:"Micro-LAM’s proprietary laser-guided manufacturing systems are carts that hold the laser and a Windows 10 computer running its control software, and configuring each one by hand took about 2 hours.",approach:"Built a standardized Windows 10 golden image with the required drivers, security updates, and application configuration for the computers that run Micro-LAM’s customer-delivered systems, removing unnecessary Windows software.",result:"Cut setup per system from about 2 hours to approximately 30 minutes, getting products to customers faster.",skills:"Windows deployment • Imaging • Macrium • Process improvement"},
{category:"documentation",label:"Documentation",title:"Building a support site for the Kalamazoo Gospel Mission",summary:"The Mission's staff needed an easier way to find help and follow setup steps.",approach:"Built a SharePoint support site with illustrated how-to guides (wireless access, manual antivirus scans) and helped design team sites, including for the media team.",result:"Gave staff a single place for self-service tech tips; the Mission took over maintaining it afterward.",skills:"SharePoint • Technical documentation • User support • Communication"},
{category:"people",label:"People",title:"Turning technical knowledge into usable guidance",summary:"Technical capability is most valuable when people can understand it and act on it.",approach:"Built trust through active listening, clear communication, training, mentoring, and solution-focused support.",result:"Trained and mentored 50+ crew members and became a trusted resource for teammates and leadership.",skills:"Training • Communication • Customer service • Conflict resolution"}];

const grid=document.querySelector("#case-grid"),filters=document.querySelectorAll(".filter");
function renderCases(filter="all"){
  grid.innerHTML=cases.filter(x=>filter==="all"||x.category===filter).map((x,i)=>`<article class="case-card reveal visible" data-index="${cases.indexOf(x)}" tabindex="0" role="button"><div class="case-meta"><span>${x.label}</span><span>0${i+1}</span></div><h3>${x.title}</h3><p>${x.summary}</p><div class="case-result">${x.result} <span>→</span></div></article>`).join("");
  document.querySelectorAll(".case-card").forEach(c=>{
    c.addEventListener("click",()=>openCase(+c.dataset.index));
    c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")openCase(+c.dataset.index)})
  })
}
renderCases();
filters.forEach(b=>b.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));b.classList.add("active");renderCases(b.dataset.filter)}));

const dialog=document.querySelector("#case-dialog"),content=document.querySelector("#dialog-content");
function openCase(i){
  const x=cases[i];
  content.innerHTML=`<p class="eyebrow">${x.label}</p><h2>${x.title}</h2><div class="dialog-content-grid"><div class="dialog-section"><strong>Context</strong><p>${x.summary}</p></div><div class="dialog-section"><strong>Approach</strong><p>${x.approach}</p></div><div class="dialog-section"><strong>Outcome</strong><p>${x.result}</p></div><div class="dialog-section"><strong>Skills & tools</strong><p>${x.skills}</p></div></div>`;
  dialog.showModal()
}
document.querySelector("#dialog-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

const theme=document.querySelector("#theme-toggle");
theme.addEventListener("click",()=>{
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme",document.documentElement.classList.contains("dark")?"dark":"light")
});
if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark");

const menu=document.querySelector("#mobile-menu"),toggle=document.querySelector("#menu-toggle");
toggle.addEventListener("click",()=>{
  const open=!menu.hidden;
  menu.hidden=open;
  toggle.setAttribute("aria-expanded",String(!open))
});
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  menu.hidden=true;
  toggle.setAttribute("aria-expanded","false")
}));
document.querySelector("#year").textContent=new Date().getFullYear();
