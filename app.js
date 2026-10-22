const toast=document.getElementById('toast');let toastTimer;
function message(text){toast.textContent=text;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2500)}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const text=document.getElementById(button.dataset.copy).textContent;try{await navigator.clipboard.writeText(text);message('已複製，貼到你的 Agent 開始吧！')}catch{const range=document.createRange();range.selectNodeContents(document.getElementById(button.dataset.copy));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);message('已選取指令，請按複製快捷鍵。')}}));
const guides={mac:'先在「關於這台 Mac」確認 Apple 晶片或 Intel；選擇相符版本，開啟下載檔，依官方安裝指示操作，再從「應用程式」啟動並登入。',win:'先在「設定 → 系統 → 關於」確認系統類型；選擇相符的 Windows 版本，開啟安裝程式依指示操作，再從開始功能表啟動並登入。若工具提示需額外元件，依官方說明完成。'};
document.querySelectorAll('[data-os]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-os]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.getElementById('osguide').textContent=guides[button.dataset.os]}));
const checks=[...document.querySelectorAll('[data-check]')];const key='ai-classroom-progress-v1';let canSave=true;
try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))checks.forEach((c,i)=>c.checked=saved.includes(Number(c.dataset.check)))}catch{canSave=false}
function update(save=false){const done=checks.filter(c=>c.checked).length;document.getElementById('progresslabel').textContent=`已完成 ${done} / ${checks.length}`;document.getElementById('progressbar').style.width=done/checks.length*100+'%';if(save)try{localStorage.setItem(key,JSON.stringify(checks.flatMap((c,i)=>c.checked?[Number(c.dataset.check)]:[])))}catch{canSave=false}document.getElementById('savehint').textContent=canSave?'':'瀏覽器目前無法保存進度，勾選僅在本次開啟期間有效。'}
checks.forEach(c=>c.addEventListener('change',()=>update(true)));document.getElementById('reset').addEventListener('click',()=>{checks.forEach(c=>c.checked=false);update(true);message('學習進度已重設')});update();

const topicFields=['project-topic','project-audience','project-content'].map(id=>document.getElementById(id));
const projectRules='風格：有圖片、大字、清楚活潑，手機也方便閱讀。\n使用簡單 HTML 與 CSS，缺少資訊標示「待補」，不要編造。\n存放在目前資料夾，告訴我如何開啟預覽，並檢查連結及手機版。';
function updateProjectPrompt(){const [topic,audience,content]=topicFields.map(field=>field.value.trim());document.getElementById('prompt4').textContent=`請讀取目前資料夾的文字與照片，製作「${topic||'【請填入你的網頁主題】'}」一頁式網頁。\n對象：${audience||'【請填入閱讀對象】'}。\n內容：${content||'【請填入希望包含的內容】'}。\n${projectRules}`;}
topicFields.forEach(field=>field.addEventListener('input',updateProjectPrompt));updateProjectPrompt();
