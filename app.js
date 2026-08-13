const $=id=>document.getElementById(id);
const db=supabase.createClient(APP_CONFIG.SUPABASE_URL,APP_CONFIG.SUPABASE_ANON_KEY);
let user=null, progress={}, current=null;
const key=(s,n)=>s+"::"+n;
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
async function boot(){
 const {data:{session}}=await db.auth.getSession();
 if(session){user=session.user;await enter()} else showAuth();
 db.auth.onAuthStateChange(async(e,s)=>{if(e==="PASSWORD_RECOVERY"){const p=prompt("Digite sua nova senha (mínimo 6 caracteres):");if(p&&p.length>=6){const {error}=await db.auth.updateUser({password:p});alert(error?error.message:"Senha alterada com sucesso.")}}});
}
function showAuth(){$("auth").classList.remove("hidden");$("app").classList.add("hidden")}
async function enter(){$("auth").classList.add("hidden");$("app").classList.remove("hidden");await load();render()}
async function load(){const {data,error}=await db.from("lesson_progress").select("*").eq("user_id",user.id);if(error){alert("Execute o arquivo setup_v5.sql no SQL Editor do Supabase antes de usar a V5. Detalhe: "+error.message);return}progress={};(data||[]).forEach(x=>progress[x.lesson_key]=x)}
function state(k){return progress[k]||{status:"Não iniciado",questions:0,correct:0,notes:""}}
function completed(st){return ["Teoria concluída","Questões feitas","Revisado"].includes(st)}
function render(){
 let total=0,done=0,q=0,c=0;
 let html="";
 COURSE_DATA.forEach(course=>{
  const d=course.lessons.filter(l=>completed(state(key(course.subject,l[0])).status)).length;
  total+=course.lessons.length;done+=d;
  course.lessons.forEach(l=>{const p=state(key(course.subject,l[0]));q+=+p.questions||0;c+=+p.correct||0});
  html+=`<article class="subject" style="--c:${course.color}"><div class="subject-head"><div><h2>${esc(course.subject)}</h2><div class="progress"><i style="width:${Math.round(d/course.lessons.length*100)}%"></i></div></div><b>${d} de ${course.lessons.length}</b></div><div class="lessons">`;
  course.lessons.forEach(l=>{const p=state(key(course.subject,l[0]));const cls=completed(p.status)?"done":p.status==="Estudando"?"study":"";html+=`<div class="lesson" data-s="${esc(course.subject)}" data-n="${esc(l[0])}"><div class="num">Aula ${esc(l[0])}</div><div><h3>${esc(l[1])}</h3><p>${esc(l[2])}</p></div><span class="badge ${cls}">${esc(p.status)}</span></div>`});
  html+="</div></article>";
 });
 $("cronograma").innerHTML=html;
 $("pct").textContent=total?Math.round(done/total*100)+"%":"0%";$("done").textContent=done+" / "+total;$("qtotal").textContent=q;$("accuracy").textContent=q?Math.round(c/q*100)+"%":"0%";
 document.querySelectorAll(".lesson").forEach(el=>el.onclick=()=>openLesson(el.dataset.s,el.dataset.n));
 renderCoverage();
}
function openLesson(s,n){const course=COURSE_DATA.find(x=>x.subject===s),l=course.lessons.find(x=>x[0]===n),p=state(key(s,n));current={s,n};$("dlgTitle").textContent=`${s} · Aula ${n}`;$("dlgContent").textContent=l[1];$("dlgEdital").textContent=l[2];$("dlgStatus").value=p.status;$("dlgQuestions").value=p.questions||0;$("dlgCorrect").value=p.correct||0;$("dlgNotes").value=p.notes||"";$("lessonDlg").showModal()}
$("saveLesson").onclick=async()=>{const k=key(current.s,current.n),row={user_id:user.id,lesson_key:k,status:$("dlgStatus").value,questions:+$("dlgQuestions").value||0,correct:+$("dlgCorrect").value||0,notes:$("dlgNotes").value,updated_at:new Date().toISOString()};const {error}=await db.from("lesson_progress").upsert(row);if(error)return alert(error.message);progress[k]=row;$("lessonDlg").close();render()}
function renderCoverage(){
 const gaps=[
 ["Legislação","Decreto nº 7.845","Não aparece explicitamente nas aulas mostradas do Estratégia."],
 ["Matemática","Normas L1 e L2","Não aparecem explicitamente nas aulas 00–21 de Matemática mostradas; L1/L2 aparecem na aula de redes neurais como regularização, mas não necessariamente no contexto de álgebra linear."],
 ["Estatística","Inferência bayesiana","Não localizada explicitamente nas aulas 14–21 mostradas."],
 ["Estatística","Boxplot e avaliação de outliers","Não localizado explicitamente nas aulas 14–21 mostradas."],
 ["Estatística","Teorema do Limite Central","Não localizado explicitamente nos títulos das aulas mostradas."],
 ["Estatística","Esperança, variância e covariância","Pode estar dentro das aulas de variáveis/distribuições, mas não aparece explicitamente nos títulos fornecidos."],
 ["Programação","Bibliotecas R","A Aula 04 informa R e suas bibliotecas, sem discriminar quais."],
 ];
 const mapped=COURSE_DATA.reduce((a,c)=>a+c.lessons.length,0);
 $("edital").innerHTML=`<div class="coverage"><div class="covercard"><b class="green">${mapped}</b><span> aulas do Estratégia organizadas</span></div><div class="covercard"><b class="yellow">${gaps.length}</b><span> pontos para conferência</span></div><div class="covercard"><b>Base</b><span> Estratégia + correspondência com edital</span></div></div><div class="coverlist"><h3>Pontos do edital que merecem conferência</h3><p>Esta área não substitui o cronograma. Ela serve para evitar lacunas entre o curso e o edital.</p>${gaps.map(g=>`<div class="coveritem"><b>${esc(g[0])}: ${esc(g[1])}</b><div class="yellow">${esc(g[2])}</div></div>`).join("")}</div>`;
}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");["cronograma","edital"].forEach(id=>$(id).classList.toggle("hidden",id!==b.dataset.tab))});
$("login").onclick=async()=>{const {data,error}=await db.auth.signInWithPassword({email:$("email").value.trim(),password:$("password").value});if(error)return $("authmsg").textContent=error.message;user=data.user;enter()}
$("signup").onclick=async()=>{const {error}=await db.auth.signUp({email:$("email").value.trim(),password:$("password").value});$("authmsg").textContent=error?error.message:"Conta criada. Confirme o e-mail, se solicitado."}
$("forgot").onclick=async()=>{const e=$("email").value.trim()||prompt("Digite seu e-mail:");if(!e)return;const {error}=await db.auth.resetPasswordForEmail(e,{redirectTo:location.origin+location.pathname});alert(error?error.message:"Link de recuperação enviado.")}
$("logout").onclick=async()=>{await db.auth.signOut();location.reload()}
$("account").onclick=()=>{$("accountEmail").textContent="E-mail: "+user.email;$("newpass").value=$("newpass2").value="";$("accountDlg").showModal()}
$("changePass").onclick=async()=>{const a=$("newpass").value,b=$("newpass2").value;if(a.length<6)return alert("Use pelo menos 6 caracteres.");if(a!==b)return alert("As senhas não coincidem.");const {error}=await db.auth.updateUser({password:a});if(error)return alert(error.message);alert("Senha alterada com sucesso.");$("accountDlg").close()}
boot();