const $=id=>document.getElementById(id);
const db=supabase.createClient(APP_CONFIG.SUPABASE_URL,APP_CONFIG.SUPABASE_ANON_KEY);
let user=null, progress={}, current=null;
const key=(s,n)=>s+"::"+n;
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const EXAM_DATE=new Date("2026-10-11T13:00:00-03:00");

async function boot(){
 const {data:{session}}=await db.auth.getSession();
 if(session){user=session.user;await enter()} else showAuth();
 db.auth.onAuthStateChange(async(e,s)=>{
   if(e==="PASSWORD_RECOVERY"){
     const p=prompt("Digite sua nova senha (mínimo 6 caracteres):");
     if(p&&p.length>=6){const {error}=await db.auth.updateUser({password:p});alert(error?error.message:"Senha alterada com sucesso.")}
   }
 });
}
function showAuth(){$("auth").classList.remove("hidden");$("app").classList.add("hidden")}
async function enter(){$("auth").classList.add("hidden");$("app").classList.remove("hidden");await load();render()}
async function load(){
 const {data,error}=await db.from("lesson_progress").select("*").eq("user_id",user.id);
 if(error){alert("Execute primeiro o arquivo setup_v6.sql no SQL Editor do Supabase. Detalhe: "+error.message);return}
 progress={};(data||[]).forEach(x=>progress[x.lesson_key]=x)
}
function state(k){return progress[k]||{status:"Não iniciado",questions:0,correct:0,notes:"",studied:false,reviewed:false,did_questions:false,summary:"",key_points:"",mistakes:""}}
function studiedState(p){return !!p.studied || ["Teoria concluída","Questões feitas","Revisado"].includes(p.status)}
function reviewedState(p){return !!p.reviewed || p.status==="Revisado"}

function render(){
 let total=0,studied=0,reviewed=0,q=0,c=0;
 let html="";
 COURSE_DATA.forEach(course=>{
  const studiedCount=course.lessons.filter(l=>studiedState(state(key(course.subject,l[0])))).length;
  total+=course.lessons.length; studied+=studiedCount;
  course.lessons.forEach(l=>{const p=state(key(course.subject,l[0])); if(reviewedState(p))reviewed++; q+=+p.questions||0;c+=+p.correct||0});
  html+=`<article class="subject" style="--c:${course.color}"><div class="subject-head"><div><h2>${esc(course.subject)}</h2><div class="progress"><i style="width:${Math.round(studiedCount/course.lessons.length*100)}%"></i></div></div><b>${studiedCount} de ${course.lessons.length}</b></div><div class="lessons">`;
  course.lessons.forEach(l=>{
    const p=state(key(course.subject,l[0]));
    const cls=studiedState(p)?"done":p.status==="Estudando"?"study":"";
    const marks=`${studiedState(p)?"✓ estudada":""}${reviewedState(p)?" · ↻ revisada":""}${p.did_questions?" · ? questões":""}`;
    html+=`<div class="lesson" data-s="${esc(course.subject)}" data-n="${esc(l[0])}"><div class="num">Aula ${esc(l[0])}</div><div><h3>${esc(l[1])}</h3><p>${esc(l[2])}</p>${marks?`<small class="marks">${marks}</small>`:""}</div><span class="badge ${cls}">${esc(p.status)}</span></div>`
  });
  html+="</div></article>";
 });
 $("cronograma").innerHTML=html;
 $("pct").textContent=total?Math.round(studied/total*100)+"%":"0%";
 $("done").textContent=studied+" / "+total;
 $("reviewed").textContent=reviewed+" / "+total;
 $("remaining").textContent=Math.max(total-studied,0);
 $("qtotal").textContent=q;
 $("accuracy").textContent=q?Math.round(c/q*100)+"%":"0%";
 document.querySelectorAll(".lesson").forEach(el=>el.onclick=()=>openLesson(el.dataset.s,el.dataset.n));
 renderCoverage(); renderPlan();
}

function openLesson(s,n){
 const course=COURSE_DATA.find(x=>x.subject===s),l=course.lessons.find(x=>x[0]===n),p=state(key(s,n));
 current={s,n};
 $("dlgTitle").textContent=`${s} · Aula ${n}`;
 $("dlgContent").textContent=l[1];
 $("dlgEdital").textContent=l[2];
 $("dlgStatus").value=p.status;
 $("dlgStudied").checked=studiedState(p);
 $("dlgReviewed").checked=reviewedState(p);
 $("dlgDidQuestions").checked=!!p.did_questions;
 $("dlgQuestions").value=p.questions||0;
 $("dlgCorrect").value=p.correct||0;
 $("dlgSummary").value=p.summary||"";
 $("dlgKeyPoints").value=p.key_points||"";
 $("dlgMistakes").value=p.mistakes||"";
 $("dlgNotes").value=p.notes||"";
 $("lessonDlg").showModal()
}

$("saveLesson").onclick=async()=>{
 const k=key(current.s,current.n);
 let status=$("dlgStatus").value;
 if($("dlgReviewed").checked) status="Revisado";
 else if($("dlgDidQuestions").checked && status==="Não iniciado") status="Questões feitas";
 else if($("dlgStudied").checked && status==="Não iniciado") status="Teoria concluída";
 const row={
  user_id:user.id,lesson_key:k,status,
  studied:$("dlgStudied").checked,
  reviewed:$("dlgReviewed").checked,
  did_questions:$("dlgDidQuestions").checked,
  questions:+$("dlgQuestions").value||0,
  correct:+$("dlgCorrect").value||0,
  summary:$("dlgSummary").value,
  key_points:$("dlgKeyPoints").value,
  mistakes:$("dlgMistakes").value,
  notes:$("dlgNotes").value,
  updated_at:new Date().toISOString()
 };
 const {error}=await db.from("lesson_progress").upsert(row);
 if(error)return alert(error.message);
 progress[k]=row;$("lessonDlg").close();render()
}

function renderPlan(){
 const now=new Date();
 const phases=[
  {name:"1. Base de alto rendimento",start:"2026-08-13",end:"2026-08-30",focus:["Banco de Dados e Ciência de Dados","Matemática e Estatística Aplicada","Língua Portuguesa"],ratio:"70% teoria · 30% questões",priority:"Ciência de Dados, Estatística, SQL/Banco de Dados, Português"},
  {name:"2. Cobertura + questões",start:"2026-08-31",end:"2026-09-20",focus:["Banco de Dados e Ciência de Dados","Programação e Softwares em Ciência de Dados","Matemática e Estatística Aplicada","Língua Inglesa"],ratio:"50% teoria · 50% questões",priority:"ML, redes neurais, PLN, visão computacional, Python, Spark/Hadoop, Matemática/Estatística"},
  {name:"3. Consolidação",start:"2026-09-21",end:"2026-10-03",focus:["Banco de Dados e Ciência de Dados","Matemática e Estatística Aplicada","Língua Portuguesa","Língua Inglesa"],ratio:"30% teoria · 70% questões",priority:"Revisar erros e conteúdos abaixo de 70% de acertos"},
  {name:"4. Reta final",start:"2026-10-04",end:"2026-10-09",focus:["Atualidades","Inteligência Artificial","Legislação de Segurança da Informação e Proteção de Dados","Raciocínio Lógico"],ratio:"20% teoria · 80% revisão/simulados",priority:"Simulados, erros recorrentes, atualidades e legislação"},
  {name:"5. Véspera",start:"2026-10-10",end:"2026-10-10",focus:[],ratio:"Revisão leve",priority:"Fórmulas, erros, conceitos-chave, LGPD/LAI, SQL, ML e interpretação"}
 ];
 let total=0,studied=0; COURSE_DATA.forEach(c=>c.lessons.forEach(l=>{total++; if(studiedState(state(key(c.subject,l[0]))))studied++}));
 let phaseIndex=phases.findIndex(p=>now>=new Date(p.start+"T00:00:00-03:00")&&now<=new Date(p.end+"T23:59:59-03:00"));
 if(phaseIndex<0) phaseIndex=now<new Date("2026-08-13T00:00:00-03:00")?0:phases.length-1;
 const days=Math.max(0,Math.ceil((EXAM_DATE-now)/(1000*60*60*24)));
 $("plano").innerHTML=`<div class="plan-hero"><div><h2>Plano até a prova</h2><p>${days} dias restantes · foco em pontuação e cobertura visual do que já foi estudado.</p></div><div class="plan-progress"><b>${Math.round(studied/total*100)||0}%</b><span>do cronograma estudado</span></div></div>
 <div class="phase-list">${phases.map((p,i)=>`<article class="phase ${i===phaseIndex?"current":""}"><div class="phase-date">${p.start.split("-").reverse().slice(0,2).join("/")} → ${p.end.split("-").reverse().slice(0,2).join("/")}</div><h3>${p.name}</h3><p>${p.priority}</p><small>${p.ratio}</small>${i===phaseIndex?'<span class="nowbadge">FASE ATUAL</span>':""}</article>`).join("")}</div>
 <article class="plan-box"><h3>Como usar</h3><p>Abra a aula no Cronograma Estratégia e marque “Estudei”, “Revisei” e “Fiz questões”. Use o campo “Resumo / mapa mental” para consolidar o conteúdo e “Erros, dúvidas e pegadinhas” para registrar o que precisa voltar na revisão.</p></article>`;
}

function renderCoverage(){
 const gaps=[
 ["Legislação","Decreto nº 7.845","Não aparece explicitamente nas aulas mostradas do Estratégia."],
 ["Matemática","Normas L1 e L2","Não aparecem explicitamente nas aulas 00–21 de Matemática mostradas; L1/L2 aparecem em redes neurais como regularização."],
 ["Estatística","Inferência bayesiana","Não localizada explicitamente nas aulas 14–21 mostradas."],
 ["Estatística","Boxplot e avaliação de outliers","Não localizado explicitamente nas aulas 14–21 mostradas."],
 ["Estatística","Teorema do Limite Central","Não localizado explicitamente nos títulos das aulas mostradas."],
 ["Estatística","Esperança, variância e covariância","Pode estar dentro das aulas de variáveis/distribuições, mas não aparece explicitamente nos títulos fornecidos."]
 ];
 $("edital").innerHTML=`<div class="coverage"><div class="covercard"><b class="green">${COURSE_DATA.reduce((a,c)=>a+c.lessons.length,0)}</b><span> aulas do Estratégia organizadas</span></div><div class="covercard"><b class="yellow">${gaps.length}</b><span> pontos para conferência</span></div><div class="covercard"><b>Base</b><span> Estratégia + correspondência com edital</span></div></div><div class="coverlist"><h3>Pontos do edital que merecem conferência</h3>${gaps.map(g=>`<div class="coveritem"><b>${esc(g[0])}: ${esc(g[1])}</b><div class="yellow">${esc(g[2])}</div></div>`).join("")}</div>`;
}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 ["plano","cronograma","edital"].forEach(id=>$(id).classList.toggle("hidden",id!==b.dataset.tab))
});
$("login").onclick=async()=>{const {data,error}=await db.auth.signInWithPassword({email:$("email").value.trim(),password:$("password").value});if(error)return $("authmsg").textContent=error.message;user=data.user;enter()}
$("signup").onclick=async()=>{const {error}=await db.auth.signUp({email:$("email").value.trim(),password:$("password").value});$("authmsg").textContent=error?error.message:"Conta criada. Confirme o e-mail, se solicitado."}
$("forgot").onclick=async()=>{const e=$("email").value.trim()||prompt("Digite seu e-mail:");if(!e)return;const {error}=await db.auth.resetPasswordForEmail(e,{redirectTo:location.origin+location.pathname});alert(error?error.message:"Link de recuperação enviado.")}
$("logout").onclick=async()=>{await db.auth.signOut();location.reload()}
$("account").onclick=()=>{$("accountEmail").textContent="E-mail: "+user.email;$("newpass").value=$("newpass2").value="";$("accountDlg").showModal()}
$("changePass").onclick=async()=>{const a=$("newpass").value,b=$("newpass2").value;if(a.length<6)return alert("Use pelo menos 6 caracteres.");if(a!==b)return alert("As senhas não coincidem.");const {error}=await db.auth.updateUser({password:a});if(error)return alert(error.message);alert("Senha alterada com sucesso.");$("accountDlg").close()}
boot();