document.documentElement.classList.add('js-ready');
const cases=[
{category:"systems",label:"Systems",title:"Standardizing manufacturing workstation deployment",summary:"Micro-LAM’s proprietary laser-guided manufacturing systems are carts that hold the laser and a Windows 10 computer running its control software, and configuring each one by hand took about 2 hours.",approach:"Helped develop a standardized Windows 10 golden image with required drivers, security updates, and application configurations for the computers that run Micro-LAM’s customer-delivered systems, removing unnecessary Windows software.",result:"Cut setup per system from about 2 hours to approximately 30 minutes (imaging itself about 20 minutes), getting products to customers faster.",skills:"Windows deployment • Imaging • Macrium • Troubleshooting • Process improvement"},
{category:"business",label:"Business",title:"Reducing telecommunications costs",summary:"A client needed a more practical communications platform without sacrificing operational usefulness.",approach:"Supported modernization from traditional phone systems to a 3CX VoIP solution and helped align the technology with operational needs.",result:"Helped reduce telecommunications expenses by approximately $1,000/month, representing $12,000+ annualized savings.",skills:"3CX • Business analysis • Cost reduction • Implementation"},
{category:"business",label:"Business",title:"Making support requests easier to see",summary:"At Micro-LAM, requests arrived through email, phone, and in person, making support visibility and prioritization harder.",approach:"Helped design a centralized ticketing approach so requests could be tracked, prioritized, and acknowledged more consistently.",result:"Initial response on standard day-to-day issues moved from roughly 60 to roughly 30 minutes, and on critical emergencies from roughly 30 to roughly 15 minutes—about a 50% reduction in each.",skills:"Syncro • Process improvement • Service management • Prioritization"},
{category:"systems",label:"Systems",title:"Building a support site for the Kalamazoo Gospel Mission",summary:"The Mission's staff needed an easier way to find help and follow setup steps.",approach:"Built a SharePoint support site with illustrated how-to guides (wireless access, manual antivirus scans) and helped design team sites, including for the media team.",result:"Gave staff a single place for self-service tech tips; the Mission took over maintaining it afterward.",skills:"SharePoint • Technical documentation • User support • Communication"},
{category:"security",label:"Security",title:"Bringing security into endpoint operations",summary:"Security and reliability were part of everyday IT operations—not separate concerns.",approach:"Supported endpoint protection, malware remediation, password policy improvements, MFA, patch management, VPN access, and monitoring requirements.",result:"Integrated security-minded practices into practical endpoint and user-support workflows.",skills:"Bitdefender • MFA • Patch management • Endpoint security • RMM"},
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
