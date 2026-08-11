const EXAM_DATE = new Date("2026-10-11T13:00:00-03:00");
const BASE_TOPICS = [
  // CONHECIMENTOS GERAIS
  ["Língua Portuguesa","Compreensão e interpretação de textos de gêneros variados"],
  ["Língua Portuguesa","Reconhecimento de tipos e gêneros textuais"],
  ["Língua Portuguesa","Ortografia oficial"],
  ["Língua Portuguesa","Coesão textual: referenciação, substituição, repetição e conectores"],
  ["Língua Portuguesa","Emprego de tempos e modos verbais"],
  ["Língua Portuguesa","Classes de palavras"],
  ["Língua Portuguesa","Coordenação entre orações e termos"],
  ["Língua Portuguesa","Subordinação entre orações e termos"],
  ["Língua Portuguesa","Pontuação"],
  ["Língua Portuguesa","Concordância verbal e nominal"],
  ["Língua Portuguesa","Regência verbal e nominal"],
  ["Língua Portuguesa","Crase"],
  ["Língua Portuguesa","Colocação dos pronomes átonos"],
  ["Língua Portuguesa","Significação e substituição de palavras e trechos"],
  ["Língua Portuguesa","Reorganização de orações e períodos"],
  ["Língua Portuguesa","Reescrita de textos em diferentes gêneros e níveis de formalidade"],

  ["Língua Inglesa","Compreensão de textos em língua inglesa"],
  ["Língua Inglesa","Itens gramaticais relevantes para compreensão dos sentidos"],

  ["Raciocínio Lógico","Estruturas lógicas"],
  ["Raciocínio Lógico","Lógica de argumentação: analogias, inferências, deduções e conclusões"],
  ["Raciocínio Lógico","Proposições simples e compostas"],
  ["Raciocínio Lógico","Tabelas-verdade"],
  ["Raciocínio Lógico","Equivalências lógicas"],
  ["Raciocínio Lógico","Diagramas lógicos"],
  ["Raciocínio Lógico","Lógica de primeira ordem"],
  ["Raciocínio Lógico","Problemas aritméticos, geométricos e matriciais"],

  ["Atualidades e IA","Atualidades: segurança, transportes, política, economia e sociedade"],
  ["Atualidades e IA","Atualidades: educação, saúde, cultura e tecnologia"],
  ["Atualidades e IA","Atualidades: energia, relações internacionais, sustentabilidade e ecologia"],
  ["Atualidades e IA","Conceitos de Inteligência Artificial"],
  ["Atualidades e IA","Aprendizado de máquina"],
  ["Atualidades e IA","Modelos generativos e modelos de linguagem"],
  ["Atualidades e IA","Ética, governança e privacidade em IA"],

  ["Legislação","Lei nº 12.527/2011 (LAI): capítulos I, II, III, IV e V"],
  ["Legislação","Decreto nº 7.724"],
  ["Legislação","Decreto nº 7.845"],
  ["Legislação","Lei nº 12.737/2012 (Delitos Informáticos): art. 2º"],
  ["Legislação","Lei nº 12.965/2014 (Marco Civil): capítulo II, Seção I, e capítulo III, Seções I e II"],
  ["Legislação","LGPD: capítulos I, II, III, IV, VII, VIII e IX"],

  // PERFIL 4 — INTELIGÊNCIA DA INFORMAÇÃO
  ["Matemática","Cálculo: funções"],
  ["Matemática","Cálculo: limites"],
  ["Matemática","Cálculo: derivadas"],
  ["Matemática","Cálculo: derivadas parciais"],
  ["Matemática","Cálculo: máximos e mínimos"],
  ["Matemática","Cálculo: integrais"],
  ["Matemática","Álgebra linear: vetores e matrizes"],
  ["Matemática","Produto escalar e produto vetorial"],
  ["Matemática","Matriz identidade, inversa e transposta"],
  ["Matemática","Transformações lineares"],
  ["Matemática","Normas L1 e L2"],
  ["Matemática","Autovalores e autovetores"],

  ["Estatística","Conceitos de probabilidade e modelo de probabilidade"],
  ["Estatística","Probabilidade condicional e independência"],
  ["Estatística","Variáveis aleatórias"],
  ["Estatística","Esperança, variância e covariância"],
  ["Estatística","Distribuições contínuas e discretas"],
  ["Estatística","Distribuições multidimensionais e matriz de covariância"],
  ["Estatística","Estatística descritiva"],
  ["Estatística","Teorema do Limite Central"],
  ["Estatística","Teste de hipótese e intervalo de confiança"],
  ["Estatística","Estimador de máxima verossimilhança"],
  ["Estatística","Inferência bayesiana"],
  ["Estatística","Coeficiente de correlação de Pearson"],
  ["Estatística","Boxplot e avaliação de outliers"],

  ["Ciência de Dados","Aprendizado supervisionado: regressão e classificação"],
  ["Ciência de Dados","Métricas de avaliação"],
  ["Ciência de Dados","Overfitting e underfitting"],
  ["Ciência de Dados","Regularização"],
  ["Ciência de Dados","Seleção de modelos"],
  ["Ciência de Dados","Validação cruzada"],
  ["Ciência de Dados","Conjuntos de treino, validação e teste"],
  ["Ciência de Dados","Trade-off entre variância e viés"],
  ["Ciência de Dados","Regressão linear"],
  ["Ciência de Dados","Regressão logística"],
  ["Ciência de Dados","Árvores de decisão e Random Forests"],
  ["Ciência de Dados","SVM"],
  ["Ciência de Dados","K-NN"],
  ["Ciência de Dados","PCA"],
  ["Ciência de Dados","K-Means"],
  ["Ciência de Dados","Mistura de Gaussianas"],
  ["Ciência de Dados","Regras de associação"],
  ["Ciência de Dados","Redes neurais: definições e arquitetura"],
  ["Ciência de Dados","Funções de ativação"],
  ["Ciência de Dados","Gradiente, gradiente estocástico e backpropagation"],
  ["Ciência de Dados","Regularização L1 e L2 em redes neurais"],
  ["Ciência de Dados","CNN"],
  ["Ciência de Dados","Visão computacional com CNN"],
  ["Ciência de Dados","Classificação de imagens e detecção de objetos"],
  ["Ciência de Dados","Processamento de linguagem natural (PLN)"],
  ["Ciência de Dados","ETL"],
  ["Ciência de Dados","Manipulação, tratamento e visualização de dados"],
  ["Ciência de Dados","Análise de dados com Pandas, NumPy, Jupyter e R"],
  ["Ciência de Dados","Técnicas de classificação"],
  ["Ciência de Dados","Técnicas de regressão"],
  ["Ciência de Dados","Técnicas de agrupamento"],
  ["Ciência de Dados","Técnicas de redução de dimensionalidade"],
  ["Ciência de Dados","Técnicas de associação"],
  ["Ciência de Dados","Sistemas de recomendação"],
  ["Ciência de Dados","Deep Learning"],
  ["Ciência de Dados","Mineração de Dados"],
  ["Ciência de Dados","Ferramenta SAS"],

  ["Linguagens e Ferramentas","Python"],
  ["Linguagens e Ferramentas","NumPy"],
  ["Linguagens e Ferramentas","Matplotlib"],
  ["Linguagens e Ferramentas","Seaborn"],
  ["Linguagens e Ferramentas","Streamlit"],
  ["Linguagens e Ferramentas","Pandas"],
  ["Linguagens e Ferramentas","SciPy"],
  ["Linguagens e Ferramentas","TensorFlow"],
  ["Linguagens e Ferramentas","Keras"],
  ["Linguagens e Ferramentas","PyTorch"],
  ["Linguagens e Ferramentas","R e suas bibliotecas"],
  ["Linguagens e Ferramentas","Apache Hadoop"],
  ["Linguagens e Ferramentas","Apache Spark"],

  ["Banco de Dados","Modelagem de dados: conceitual, lógica e física"],
  ["Banco de Dados","Abordagem relacional"],
  ["Banco de Dados","Normalização das estruturas de dados"],
  ["Banco de Dados","Integridade referencial"],
  ["Banco de Dados","Metadados"],
  ["Banco de Dados","Modelagem dimensional"],
  ["Banco de Dados","SQL"],
  ["Banco de Dados","DDL"],
  ["Banco de Dados","DML"],
  ["Banco de Dados","SGBD"],
  ["Banco de Dados","Propriedades de banco de dados"],
  ["Banco de Dados","Banco de dados NoSQL"],
  ["Banco de Dados","Banco de dados em memória"],
  ["Banco de Dados","Data lakes e soluções para Big Data"]
];

let db = null;
let currentUser = null;
let cloudMode = false;
let state = {
  topics: [],
  studies: [],
  questions: [],
  settings: {name:"", questionGoal:2000, profile:"4. Inteligência da Informação"}
};

const $ = id => document.getElementById(id);
const todayISO = () => new Date().toISOString().slice(0,10);
const uid = () => crypto.randomUUID ? crypto.randomUUID() : String(Date.now()+Math.random());
const fmtDate = d => new Date(d+"T12:00:00").toLocaleDateString("pt-BR");
const esc = s => String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

function toast(msg){ const t=$("toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2200); }
function initialTopics(){ return BASE_TOPICS.map((t,i)=>({id:uid(),discipline:t[0],topic:t[1],status:"nao_iniciado",order:i})); }

function ensureProfile4Topics(){
  const existing = new Set(state.topics.map(x=>x.discipline+"|"+x.topic));
  let added = 0;
  BASE_TOPICS.forEach((t,i)=>{
    const key=t[0]+"|"+t[1];
    if(!existing.has(key)){
      state.topics.push({id:uid(),discipline:t[0],topic:t[1],status:"nao_iniciado",order:state.topics.length});
      existing.add(key); added++;
    }
  });
  // Remove the generic placeholder from v1 if it still exists and is not completed.
  state.topics = state.topics.filter(x => !(x.discipline==="Conhecimentos Específicos" && x.topic==="Conteúdo específico do perfil selecionado" && x.status!=="concluido"));
  if(added && !cloudMode) saveLocal();
  return added;
}


function saveLocal(){
  localStorage.setItem("dataprev_estudos_v1", JSON.stringify(state));
}
function loadLocal(){
  const x = localStorage.getItem("dataprev_estudos_v1");
  if(x){ try{ state=JSON.parse(x); }catch(e){} }
  if(!state.topics?.length) state.topics=initialTopics();
  ensureProfile4Topics();
  state.studies ||= []; state.questions ||= []; state.settings ||= {name:"",questionGoal:2000,profile:"4. Inteligência da Informação"};
  saveLocal();
}

async function initCloud(){
  const cfg=window.APP_CONFIG||{};
  if(!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) return false;
  db = supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);
  cloudMode=true;
  db.auth.onAuthStateChange((event, session)=>{
    if(event==="PASSWORD_RECOVERY"){
      setTimeout(()=>$("newPasswordDialog").showModal(),100);
    }
  });
  const {data:{session}}=await db.auth.getSession();
  if(session?.user){ currentUser=session.user; await loadCloud(); return true; }
  $("authView").classList.remove("hidden"); $("appView").classList.add("hidden");
  return true;
}

async function loadCloud(){
  const [{data:topics},{data:studies},{data:questions},{data:settings}] = await Promise.all([
    db.from("topics").select("*").order("sort_order"),
    db.from("studies").select("*").order("study_date",{ascending:false}),
    db.from("questions").select("*").order("question_date",{ascending:false}),
    db.from("settings").select("*").maybeSingle()
  ]);
  state.topics=(topics||[]).map(x=>({id:x.id,discipline:x.discipline,topic:x.topic,status:x.status,order:x.sort_order}));
  state.studies=(studies||[]).map(x=>({id:x.id,date:x.study_date,discipline:x.discipline,topic:x.topic,minutes:x.minutes,notes:x.notes||""}));
  state.questions=(questions||[]).map(x=>({id:x.id,date:x.question_date,discipline:x.discipline,topic:x.topic,total:x.total,correct:x.correct,notes:x.notes||""}));
  state.settings=settings?{name:settings.name||"",questionGoal:settings.question_goal||2000,profile:settings.profile||""}:{name:"",questionGoal:2000,profile:"4. Inteligência da Informação"};
  if(!state.topics.length){
    const rows=initialTopics().map(x=>({user_id:currentUser.id,discipline:x.discipline,topic:x.topic,status:x.status,sort_order:x.order}));
    await db.from("topics").insert(rows);
    return loadCloud();
  }
  // Inclui novos tópicos da versão 2 sem apagar o progresso já salvo.
  const cloudExisting = new Set(state.topics.map(x=>x.discipline+"|"+x.topic));
  const missing = BASE_TOPICS.filter(t=>!cloudExisting.has(t[0]+"|"+t[1]));
  if(missing.length){
    const start=state.topics.length;
    const rows=missing.map((t,i)=>({user_id:currentUser.id,discipline:t[0],topic:t[1],status:"nao_iniciado",sort_order:start+i}));
    await db.from("topics").insert(rows);
    return loadCloud();
  }
  $("authView").classList.add("hidden"); $("appView").classList.remove("hidden");
  $("modeBadge").textContent="Sincronizado";
  $("logoutBtn").classList.remove("hidden");
  renderAll();
}

async function persistTopic(topic){
  if(!cloudMode){saveLocal();return}
  await db.from("topics").update({status:topic.status}).eq("id",topic.id);
}
async function addTopic(discipline,topic){
  if(cloudMode){
    const {data,error}=await db.from("topics").insert({user_id:currentUser.id,discipline,topic,status:"nao_iniciado",sort_order:state.topics.length}).select().single();
    if(error) throw error;
    state.topics.push({id:data.id,discipline:data.discipline,topic:data.topic,status:data.status,order:data.sort_order});
  }else{
    state.topics.push({id:uid(),discipline,topic,status:"nao_iniciado",order:state.topics.length}); saveLocal();
  }
}
async function addStudy(x){
  if(cloudMode){
    const {data,error}=await db.from("studies").insert({user_id:currentUser.id,study_date:x.date,discipline:x.discipline,topic:x.topic,minutes:x.minutes,notes:x.notes}).select().single();
    if(error) throw error; x.id=data.id;
  } else {x.id=uid(); state.studies.unshift(x); saveLocal(); return}
  state.studies.unshift(x);
}
async function addQuestions(x){
  if(cloudMode){
    const {data,error}=await db.from("questions").insert({user_id:currentUser.id,question_date:x.date,discipline:x.discipline,topic:x.topic,total:x.total,correct:x.correct,notes:x.notes}).select().single();
    if(error) throw error; x.id=data.id;
  } else {x.id=uid(); state.questions.unshift(x); saveLocal(); return}
  state.questions.unshift(x);
}
async function saveSettings(){
  if(cloudMode){
    const payload={user_id:currentUser.id,name:state.settings.name,question_goal:state.settings.questionGoal,profile:state.settings.profile};
    const {error}=await db.from("settings").upsert(payload,{onConflict:"user_id"}); if(error) throw error;
  } else saveLocal();
}
async function deleteRecord(type,id){
  if(cloudMode){
    const table=type==="study"?"studies":"questions";
    await db.from(table).delete().eq("id",id);
  }
  if(type==="study") state.studies=state.studies.filter(x=>x.id!==id);
  else state.questions=state.questions.filter(x=>x.id!==id);
  if(!cloudMode) saveLocal();
  renderAll();
}

function disciplines(){
  return [...new Set(state.topics.map(x=>x.discipline))];
}
function fillSelect(select, values, selected=""){
  select.innerHTML=values.map(v=>`<option value="${esc(v)}" ${v===selected?"selected":""}>${esc(v)}</option>`).join("");
}
function topicOptions(discipline, select){
  const vals=state.topics.filter(x=>x.discipline===discipline).map(x=>x.topic);
  fillSelect(select, vals);
}
function statusLabel(s){return {nao_iniciado:"Não iniciado",em_andamento:"Em andamento",concluido:"Concluído",revisar:"Revisar"}[s]||s}

function categoryClass(d){
  const map={
    "Língua Portuguesa":"cat-portugues",
    "Língua Inglesa":"cat-ingles",
    "Raciocínio Lógico":"cat-logica",
    "Atualidades e IA":"cat-atualidades",
    "Legislação":"cat-legislacao",
    "Matemática":"cat-matematica",
    "Estatística":"cat-estatistica",
    "Ciência de Dados":"cat-ciencia",
    "Linguagens e Ferramentas":"cat-linguagens",
    "Banco de Dados":"cat-banco"
  };
  return map[d]||"cat-default";
}

function renderDashboard(){
  const mins=state.studies.reduce((a,b)=>a+(Number(b.minutes)||0),0);
  const totalQ=state.questions.reduce((a,b)=>a+(Number(b.total)||0),0);
  const correct=state.questions.reduce((a,b)=>a+(Number(b.correct)||0),0);
  const acc=totalQ?Math.round(correct/totalQ*100):0;
  const done=state.topics.filter(x=>x.status==="concluido").length;
  const pct=state.topics.length?Math.round(done/state.topics.length*100):0;
  $("statHours").textContent=(mins/60).toFixed(mins%60?1:0)+"h";
  $("statQuestions").textContent=totalQ;
  $("statAccuracy").textContent=acc+"%";
  $("statDone").textContent=`${done}/${state.topics.length}`;
  $("overallPct").textContent=pct+"%"; $("overallBar").style.width=pct+"%"; $("bigAccuracy").textContent=acc+"%";
  $("disciplineProgress").innerHTML=disciplines().map(d=>{
    const a=state.topics.filter(x=>x.discipline===d), z=a.filter(x=>x.status==="concluido").length, p=a.length?Math.round(z/a.length*100):0;
    return `<div class="p-row"><span>${esc(d)}</span><div class="mini-progress"><div style="width:${p}%"></div></div><span>${p}%</span></div>`;
  }).join("");
  const byTopic={};
  state.questions.forEach(q=>{ const k=q.discipline+"|"+q.topic; byTopic[k] ||= {t:0,c:0,d:q.discipline,topic:q.topic}; byTopic[k].t+=+q.total; byTopic[k].c+=+q.correct; });
  const weak=Object.values(byTopic).filter(x=>x.t>=5 && x.c/x.t<.70).sort((a,b)=>a.c/a.t-b.c/b.t);
  $("attentionBox").innerHTML=weak.length?`Atenção: ${weak.length} assunto(s) com aproveitamento abaixo de 70%.<br>${weak.slice(0,3).map(x=>esc(x.topic)+" ("+Math.round(x.c/x.t*100)+"%)").join("<br>")}`:"Nenhum assunto com desempenho abaixo de 70% nos registros atuais.";
  const acts=[
    ...state.studies.map(x=>({...x,type:"Estudo",score:`${x.minutes} min`})),
    ...state.questions.map(x=>({...x,type:"Questões",score:`${x.correct}/${x.total} · ${Math.round(x.correct/x.total*100)}%`}))
  ].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6);
  $("recentActivities").innerHTML=acts.length?acts.map(x=>`<div class="activity"><span>${fmtDate(x.date)}</span><span>${esc(x.discipline)} · ${esc(x.topic)}</span><strong>${x.score}</strong></div>`).join(""):`<p class="muted">Ainda não há atividades registradas.</p>`;
}
function renderCronograma(){
  const selected=$("cronFilter").value;
  const ds=disciplines();
  $("cronFilter").innerHTML=`<option value="">Todas as disciplinas</option>`+ds.map(d=>`<option ${d===selected?"selected":""}>${esc(d)}</option>`).join("");
  const list=selected?ds.filter(d=>d===selected):ds;
  $("cronogramaList").innerHTML=list.map(d=>{
    const topics=state.topics.filter(x=>x.discipline===d);
    const done=topics.filter(x=>x.status==="concluido").length;
    const pct=topics.length?Math.round(done/topics.length*100):0;
    const rows=topics.map(x=>`<label class="check-topic ${x.status==="concluido"?"done":""}">
      <input type="checkbox" data-topic-check="${x.id}" ${x.status==="concluido"?"checked":""}>
      <span class="checkmark"></span>
      <span class="topic-text">${esc(x.topic)}</span>
    </label>`).join("");
    return `<section class="subject-card ${categoryClass(d)}">
      <div class="subject-head">
        <div>
          <h4>${esc(d)}</h4>
          <span>${done} de ${topics.length} concluídos</span>
        </div>
        <div class="subject-progress-wrap">
          <strong>${pct}%</strong>
          <div class="subject-progress"><div style="width:${pct}%"></div></div>
        </div>
      </div>
      <div class="checklist">${rows}</div>
    </section>`;
  }).join("");
  document.querySelectorAll("[data-topic-check]").forEach(el=>el.addEventListener("change",async e=>{
    const t=state.topics.find(x=>x.id===e.target.dataset.topicCheck);
    t.status=e.target.checked?"concluido":"nao_iniciado";
    await persistTopic(t);
    renderAll();
    toast(e.target.checked?"Assunto concluído ✓":"Marcação removida");
  }));
}
function renderForms(){
  const ds=disciplines();
  fillSelect($("studyDiscipline"),ds,$("studyDiscipline").value||ds[0]);
  fillSelect($("qDiscipline"),ds,$("qDiscipline").value||ds[0]);
  topicOptions($("studyDiscipline").value,$("studyTopic"));
  topicOptions($("qDiscipline").value,$("qTopic"));
  $("studyDate").value ||= todayISO(); $("qDate").value ||= todayISO();
  $("studentName").value=state.settings.name||"";
  $("questionGoal").value=state.settings.questionGoal||2000;
  $("profileSelect").value=state.settings.profile||"";
}
function renderHistory(){
  const rows=[
    ...state.studies.map(x=>({id:x.id,type:"study",date:x.date,kind:"Estudo",discipline:x.discipline,topic:x.topic,detail:`${x.minutes} min`,notes:x.notes})),
    ...state.questions.map(x=>({id:x.id,type:"question",date:x.date,kind:"Questões",discipline:x.discipline,topic:x.topic,detail:`${x.correct}/${x.total} (${Math.round(x.correct/x.total*100)}%)`,notes:x.notes}))
  ].sort((a,b)=>b.date.localeCompare(a.date));
  $("historyTable").innerHTML=rows.length?`<div class="table-wrap"><table class="history-table"><thead><tr><th>Data</th><th>Tipo</th><th>Disciplina</th><th>Assunto</th><th>Resultado</th><th>Observação</th><th></th></tr></thead><tbody>${rows.map(x=>`<tr><td>${fmtDate(x.date)}</td><td>${x.kind}</td><td>${esc(x.discipline)}</td><td>${esc(x.topic)}</td><td>${esc(x.detail)}</td><td>${esc(x.notes||"")}</td><td><button class="delete-btn" data-del-type="${x.type}" data-del-id="${x.id}">Excluir</button></td></tr>`).join("")}</tbody></table></div>`:`<p class="muted">Sem registros.</p>`;
  document.querySelectorAll("[data-del-id]").forEach(b=>b.addEventListener("click",()=>{ if(confirm("Excluir este registro?")) deleteRecord(b.dataset.delType,b.dataset.delId); }));
}
function renderHeader(){
  const now=new Date(); const days=Math.max(0,Math.ceil((EXAM_DATE-now)/(1000*60*60*24)));
  $("daysLeft").textContent=`${days} dias restantes`;
  $("todayText").textContent=now.toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"long",year:"numeric"});
}
function renderAll(){ renderHeader(); renderDashboard(); renderCronograma(); renderForms(); renderHistory(); }

document.querySelectorAll(".nav-btn").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".nav-btn").forEach(x=>x.classList.remove("active")); b.classList.add("active");
  document.querySelectorAll(".view").forEach(x=>x.classList.remove("active")); $(b.dataset.view).classList.add("active");
  $("pageTitle").textContent=b.textContent;
}));
$("cronFilter").addEventListener("change",renderCronograma);
$("studyDiscipline").addEventListener("change",e=>topicOptions(e.target.value,$("studyTopic")));
$("qDiscipline").addEventListener("change",e=>topicOptions(e.target.value,$("qTopic")));
$("addTopicBtn").addEventListener("click",()=>$("topicDialog").showModal());
$("confirmTopicBtn").addEventListener("click",async e=>{
  const d=$("newTopicDiscipline").value.trim(), t=$("newTopicName").value.trim();
  if(!d||!t){e.preventDefault();toast("Preencha disciplina e assunto");return}
  await addTopic(d,t); $("newTopicDiscipline").value=""; $("newTopicName").value=""; renderAll(); toast("Assunto adicionado");
});
$("saveStudyBtn").addEventListener("click",async()=>{
  const x={date:$("studyDate").value,discipline:$("studyDiscipline").value,topic:$("studyTopic").value,minutes:+$("studyMinutes").value,notes:$("studyNotes").value.trim()};
  if(!x.date||!x.discipline||!x.topic||!x.minutes){toast("Preencha os campos obrigatórios");return}
  await addStudy(x); $("studyMinutes").value=""; $("studyNotes").value=""; renderAll(); toast("Estudo salvo");
});
$("saveQuestionsBtn").addEventListener("click",async()=>{
  const x={date:$("qDate").value,discipline:$("qDiscipline").value,topic:$("qTopic").value,total:+$("qTotal").value,correct:+$("qCorrect").value,notes:$("qNotes").value.trim()};
  if(!x.date||!x.discipline||!x.topic||!x.total||x.correct<0||x.correct>x.total){toast("Confira os dados das questões");return}
  await addQuestions(x); $("qTotal").value=""; $("qCorrect").value=""; $("qNotes").value=""; renderAll(); toast("Questões salvas");
});
$("saveSettingsBtn").addEventListener("click",async()=>{
  state.settings={name:$("studentName").value.trim(),questionGoal:+$("questionGoal").value||0,profile:$("profileSelect").value};
  await saveSettings(); renderAll(); toast("Configurações salvas");
});
$("exportBtn").addEventListener("click",()=>{
  const rows=[["data","tipo","disciplina","assunto","minutos","questoes","acertos","observacao"]];
  state.studies.forEach(x=>rows.push([x.date,"estudo",x.discipline,x.topic,x.minutes,"","",x.notes]));
  state.questions.forEach(x=>rows.push([x.date,"questoes",x.discipline,x.topic,"",x.total,x.correct,x.notes]));
  const csv=rows.map(r=>r.map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(";")).join("\n");
  const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv"})); a.download="dataprev-estudos.csv"; a.click();
});
$("loginBtn").addEventListener("click",async()=>{
  const {error}=await db.auth.signInWithPassword({email:$("email").value,password:$("password").value});
  if(error){$("authMsg").textContent=error.message;return}
  const {data:{user}}=await db.auth.getUser(); currentUser=user; await loadCloud();
});
$("forgotBtn").addEventListener("click",()=>{
  $("resetEmail").value=$("email").value||"";
  $("resetDialog").showModal();
});
$("sendResetBtn").addEventListener("click",async e=>{
  e.preventDefault();
  const email=$("resetEmail").value.trim();
  if(!email){toast("Informe seu e-mail");return}
  const redirectTo=window.location.origin+window.location.pathname;
  const {error}=await db.auth.resetPasswordForEmail(email,{redirectTo});
  if(error){toast(error.message);return}
  $("resetDialog").close();
  toast("Link de recuperação enviado para o e-mail");
});
$("saveNewPasswordBtn").addEventListener("click",async e=>{
  e.preventDefault();
  const p=$("newPassword").value, c=$("confirmPassword").value;
  if(p.length<6){toast("A senha deve ter pelo menos 6 caracteres");return}
  if(p!==c){toast("As senhas não coincidem");return}
  const {error}=await db.auth.updateUser({password:p});
  if(error){toast(error.message);return}
  $("newPasswordDialog").close();
  toast("Senha alterada com sucesso");
  setTimeout(()=>location.href=window.location.origin+window.location.pathname,1000);
});
$("signupBtn").addEventListener("click",async()=>{
  const {error}=await db.auth.signUp({email:$("email").value,password:$("password").value});
  $("authMsg").textContent=error?error.message:"Conta criada. Se a confirmação de e-mail estiver habilitada, confirme o e-mail antes de entrar.";
});
$("logoutBtn").addEventListener("click",async()=>{await db.auth.signOut();location.reload()});

(async function(){
  loadLocal();
  const configured=await initCloud();
  if(!configured){ $("modeBadge").textContent="Modo local"; renderAll(); }
})();
