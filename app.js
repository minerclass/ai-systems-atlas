'use strict';
const $ = selector => document.querySelector(selector);
const sources = new Map(ATLAS.sources.map(s => [s[0],s]));
const companies = new Map(ATLAS.companies.map(c => [c.id,c]));
function sourceLink(id,label='Read the primary source ↗') {
  const s=sources.get(id);
  return `<a href="${s[2]}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}
function showCompany(id) {
  const c=companies.get(id);
  document.querySelectorAll('[data-company]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.company===id)));
  $('#company-detail').innerHTML=`<p class="eyebrow">${c.role}</p><h3>${c.name}</h3><div class="tags">${c.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><p>${c.summary}</p><h4>How it connects</h4><p>${c.connection}</p><div class="detail-note"><h4>Keep the distinction</h4><p>${c.distinction}</p></div><p class="small">${c.sources.map(s=>sourceLink(s,sources.get(s)[1])).join(' · ')}</p>`;
}
const roles=['Compute & software','Model development','Platform & infrastructure','Applications & distribution'];
$('#company-nodes').innerHTML=roles.map(role=>`<div class="role-group"><div class="role-label">${role}</div><div class="role-buttons">${ATLAS.companies.filter(c=>c.role===role).map(c=>`<button data-company="${c.id}" aria-pressed="false">${c.name}</button>`).join('')}</div></div>`).join('');
for (const name of ['compare-a','compare-b']) $('#'+name).innerHTML=ATLAS.companies.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
$('#compare-a').value='nvidia';$('#compare-b').value='anthropic';
function renderTimelines() {
  const year=Number($('#year').value);$('#year-output').textContent=year;
  $('#timelines').innerHTML=['compare-a','compare-b'].map(key=>{
    const c=companies.get($('#'+key).value),events=c.events.filter(e=>e[0]<=year);
    return `<div class="timeline-lane"><h4>${c.name}</h4><div class="time-rail" aria-hidden="true">${events.map(e=>`<span class="time-dot" style="left:${(e[0]-1993)/33*100}%"></span>`).join('')}<span class="time-start">1993</span><span class="time-end">2026</span></div>${events.length?`<div class="milestones">${events.map(e=>`<article class="milestone"><time>${e[0]}</time><h5>${e[1]}</h5><p>${e[2]}</p>${sourceLink(e[3],'Source ↗')}</article>`).join('')}</div>`:`<p class="empty">No selected milestone for ${c.name} by ${year}. Move the year control forward to reveal its path.</p>`}</div>`;
  }).join('');
}
$('#company-nodes').addEventListener('click',event=>{
  const b=event.target.closest('[data-company]');if(!b)return;
  const previous=$('#compare-a').value;
  if($('#compare-b').value===b.dataset.company)$('#compare-b').value=previous;
  $('#compare-a').value=b.dataset.company;showCompany(b.dataset.company);renderTimelines();
});
for(const key of ['compare-a','compare-b']) $('#'+key).addEventListener('change',()=>{
  const other=key==='compare-a'?'compare-b':'compare-a';
  if($('#'+other).value===$('#'+key).value) $('#'+other).value=ATLAS.companies.find(c=>c.id!==$('#'+key).value).id;
  showCompany($('#compare-a').value);renderTimelines();
});
$('#year').addEventListener('input',renderTimelines);showCompany('nvidia');renderTimelines();
$('#chip-controls').innerHTML=Object.entries(ATLAS.chips).map(([id,c])=>`<button data-chip="${id}" aria-pressed="false">${c.name}</button>`).join('');
function showChip(id) {
  const c=ATLAS.chips[id];
  document.querySelectorAll('[data-chip]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.chip===id)));
  $('#chip-caption').textContent=c.caption;$('#chip-legend').textContent=c.legend;
  $('#chip-drawing').className='chip-drawing '+id;
  $('#chip-drawing').innerHTML=Array.from({length:c.cells},(_,i)=>`<span class="cell ${i<c.active?'active':''}" style="animation-delay:${id==='tpu'?(Math.floor(i/8)+i%8)*.15:i*.035}s"></span>`).join('');
  $('#chip-detail').innerHTML=`<p class="eyebrow">${c.name}</p><h3>${c.title}</h3><p>${c.summary}</p><h4>What it offers</h4><p>${c.strength}</p><h4>What to check</h4><p>${c.constraint}</p><div class="detail-note"><h4>Connect it to a real system</h4><p>${c.example}</p></div><p class="small">${sourceLink(c.source)}</p>`;
}
$('#chip-controls').addEventListener('click',event=>{const b=event.target.closest('[data-chip]');if(b)showChip(b.dataset.chip)});showChip('gpu');
let locationMode='local',step=0;
const paths={
  local:[
    ['Your app','Begin with the interface','A locally configured application receives input on your device. This diagram assumes model execution stays local and optional network tools are disabled. Local processing alone does not establish a complete privacy policy.'],
    ['Tokenizer','Turn text into tokens','The tokenizer converts text into model-specific units and IDs. Tokens may represent words, word pieces, punctuation, or other patterns; they are not simply one token per word.'],
    ['Weights + compute','Process the context','The runtime loads a compatible model, then uses a supported compute backend. Prefill processes input tokens and builds intermediate state such as a KV cache.'],
    ['Token loop','Generate incrementally','The model computes possible next tokens. A decoding method chooses a token, and the system repeats with the growing context. Ordinary inference does not update the model weights.'],
    ['Your screen','Return an output','Generated tokens become displayed text. Fluent language is not evidence that the answer is true. Evaluate the output against the task and appropriate sources.']
  ],
  cloud:[
    ['Your app','Begin with the interface','The interface may run on your device while the model runs elsewhere. The company providing the interface need not be the company that trained the model.'],
    ['Network request','Cross the device boundary','The application sends a request to a remote service. Data handling, retention, and access depend on the provider, account, settings, and contract. This schematic does not assert a specific vendor policy.'],
    ['Remote compute','Process on a server','The service tokenizes input and runs the model on remote infrastructure. GPUs or other accelerators may be involved; the exact hardware is not established by the app’s brand.'],
    ['Token loop','Generate on the server','The model produces tokens incrementally, often streamed back to the app. Server-side processing and the network both affect the experience; this animation is not a latency benchmark.'],
    ['Your screen','Return an output','The application displays the result. Browsing, retrieval, and tool use are additional systems that may add other data paths. A fluent answer still needs evaluation.']
  ]
};
function renderPrompt() {
  $('#local').setAttribute('aria-pressed',String(locationMode==='local'));$('#cloud').setAttribute('aria-pressed',String(locationMode==='cloud'));
  $('#boundary').textContent=locationMode==='local'?'DEVICE BOUNDARY / MODEL EXECUTION STAYS ON DEVICE IN THIS EXAMPLE':'DEVICE → NETWORK → REMOTE SERVICE → DEVICE';
  $('#pipeline').innerHTML=paths[locationMode].map((s,i)=>`<button data-step="${i}" aria-pressed="${step===i}" aria-label="Step ${i+1}: ${s[0]}"><span class="step-index">0${i+1}</span><span class="step-name">${s[0]}</span></button>`).join('');
  const s=paths[locationMode][step];$('#step-detail').innerHTML=`<p class="eyebrow">${locationMode==='local'?'Local':'Cloud'} inference / Step ${step+1} of 5</p><h3>${s[1]}</h3><p>${s[2]}</p><p class="small">Technical reading: ${sourceLink('generation','Text generation')} · ${sourceLink('cache','KV caching')} · ${sourceLink('inference','Prefill and decoding')}</p>`;
  $('#next-step').textContent=step===4?'Restart path ↺':'Next step →';
}
$('#local').addEventListener('click',()=>{locationMode='local';step=0;renderPrompt()});$('#cloud').addEventListener('click',()=>{locationMode='cloud';step=0;renderPrompt()});
$('#next-step').addEventListener('click',()=>{step=(step+1)%5;renderPrompt()});
$('#pipeline').addEventListener('click',event=>{const b=event.target.closest('[data-step]');if(b){step=Number(b.dataset.step);renderPrompt();$('#pipeline').querySelector(`[data-step="${step}"]`).focus()}});renderPrompt();
function memoryBudget() {
  const params=Number($('#parameters').value),bits=Number($('#precision').value),capacity=Number($('#memory').value),reserve=Number($('#reserve').value),runtime=Number($('#runtime').value);
  const weights=params*bits/8*1.1,used=weights+reserve+runtime,free=Math.max(0,capacity-used),over=used>capacity;
  $('#reserve-output').textContent=reserve+' GB';$('#runtime-output').textContent=runtime+' GB';
  $('#fit-badge').textContent=over?'Over budget':'Within budget';$('#fit-badge').className=over?'over':'';
  $('#memory-total').textContent=`${used.toFixed(1)} GB assumed / ${capacity} GB pool`;
  const parts=[['weights','Weights + 10% allowance',weights],['runtime','Runtime + context',runtime],['reserve','OS + other apps',reserve],['free','Unallocated',free]];
  const denominator=Math.max(capacity,used);
  $('#memory-bar').innerHTML=parts.map(([cls,name,value])=>`<span class="memory-segment ${cls}" style="width:${value/denominator*100}%" title="${name}: ${value.toFixed(1)} GB"></span>`).join('');
  $('#memory-bar').setAttribute('aria-label',parts.map(([,name,value])=>`${name}: ${value.toFixed(1)} GB`).join('; '));
  $('#memory-key').innerHTML=parts.map(([cls,name,value])=>`<span class="key-item"><i class="swatch ${cls}" aria-hidden="true"></i>${name}: ${value.toFixed(1)} GB</span>`).join('');
  $('#memory-verdict').textContent=over?`This configuration exceeds the pool by ${(used-capacity).toFixed(1)} GB under these assumptions. Try fewer parameters, lower weight precision, or a larger memory pool. Bar segments are scaled to total demand when over budget.`:`There is ${free.toFixed(1)} GB of headroom under these assumptions. This is a memory-budget result, not a compatibility, speed, or answer-quality guarantee.`;
}
for(const id of ['parameters','precision','memory','reserve','runtime']) $('#'+id).addEventListener('input',memoryBudget);
$('#reset-lab').addEventListener('click',()=>{for(const [id,value] of Object.entries({parameters:8,precision:4,memory:32,reserve:6,runtime:4}))$('#'+id).value=value;memoryBudget()});memoryBudget();
const explanations={company:{right:'Yes. Google DeepMind was formed in April 2023 by combining DeepMind and Google Brain. It belongs within Google’s wider ecosystem.',wrong:'Try again. Google DeepMind is an AI research organization within Google. Open its company node and compare the 2023 milestones.'},chip:{right:'Yes. Hardware is useful when the model, supported operations, runtime, and memory align. A headline TOPS figure does not resolve those questions.',wrong:'Try again. Having an NPU does not automatically make every LLM compatible. Inspect the NPU schematic’s “What to check” explanation.'},memory:{right:'Yes. Quantization reduces weight storage, but effects on quality depend on the model, quantization method, and task. Test the behavior you need.',wrong:'Try again. A smaller representation can change behavior. The memory lab shows storage tradeoffs; it does not certify answer quality.'}};
const completed=new Set();
function renderProgress(){$('#progress').textContent=`${completed.size} of 3 distinctions explored. Progress lasts for this page session.`}
document.querySelectorAll('[data-question]').forEach(group=>group.addEventListener('click',event=>{
  const b=event.target.closest('[data-answer]');if(!b)return;
  const id=group.dataset.question,right=b.dataset.answer==='right';
  group.querySelectorAll('button').forEach(button=>{button.classList.remove('selected-right','selected-wrong');button.setAttribute('aria-pressed','false')});
  b.classList.add(right?'selected-right':'selected-wrong');b.setAttribute('aria-pressed','true');$('#'+id+'-feedback').textContent=explanations[id][right?'right':'wrong'];
  if(right)completed.add(id);renderProgress();
}));
$('#reset-questions').addEventListener('click',()=>{completed.clear();document.querySelectorAll('[data-answer]').forEach(b=>{b.classList.remove('selected-right','selected-wrong');b.setAttribute('aria-pressed','false')});for(const id of Object.keys(explanations))$('#'+id+'-feedback').textContent='Choose an answer to test the distinction.';renderProgress()});
$('#source-list').className='source-list';$('#source-list').innerHTML=ATLAS.sources.map(s=>`<div class="source-item">${sourceLink(s[0],s[1]+' ↗')}<p>${s[3]}</p></div>`).join('');
let motionOn=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function setMotion(){document.body.classList.toggle('motion-off',!motionOn);$('#motion').setAttribute('aria-pressed',String(motionOn));$('#motion').textContent='Motion: '+(motionOn?'on':'off')}
$('#motion').addEventListener('click',()=>{motionOn=!motionOn;setMotion()});setMotion();$('#print').addEventListener('click',()=>window.print());
