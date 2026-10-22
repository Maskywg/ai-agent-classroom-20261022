function createSurvey() {
  const p = PropertiesService.getUserProperties();
  const old = p.getProperty('SHORT_SURVEY_ID');
  if (old) { showLinks(FormApp.openById(old)); return; }
  const f = FormApp.create('AI Agent 課前調查問卷', false);
  f.setDescription('約3分鐘。請依現況填答，不必先下載或付費。下載、安裝、訂閱與能否使用 Agent 是不同狀態。');
  f.setCollectEmail(false).setPublishingSummary(false);
  const single = (t, a) => f.addMultipleChoiceItem().setTitle(t).setChoiceValues(a.split('|')).setRequired(true);
  const multi = (t, a, required) => f.addCheckboxItem().setTitle(t).setChoiceValues(a.split('|')).setRequired(required).showOtherOption(true);
  f.addTextItem().setTitle('1. 姓名或稱呼').setRequired(true);
  single('2. 上課可以使用哪種電腦？', 'Windows筆電|Mac筆電|只有手機或平板|不確定');
  single('3. 使用AI的經驗？', '幾乎沒有|聊天、查資料、翻譯|製作圖片、簡報、文章|用Agent操作檔案或做作品|用Agent寫程式或串接工具');
  single('4. 最想先學哪一套？', 'Claude Code|ChatGPT／Codex|Google Antigravity|都想了解，由老師選|想看示範再決定');
  multi('5. 其他也想了解的工具（選填）', 'Claude Code|ChatGPT／Codex|Google Antigravity|NotebookLM|GitHub', false);
  const grid = (t, rows, cols) => f.addGridItem().setTitle(t).setRows(rows.split('|')).setColumns(cols.split('|')).setRequired(true);
  grid('6. 安裝與使用狀態', 'Claude Code|ChatGPT／Codex|Antigravity', '未安裝|只有聊天App|已安裝未登入|已登入未實作|已完成Agent任務|不確定')
    .setHelpText('只有聊天App：尚未啟用Code／Codex。Antigravity請選其他狀態。');
  grid('7. 目前付費狀態', 'Claude|ChatGPT／Codex|Google AI／Antigravity', '未付費|自費訂閱|公司或學校提供|試用或贈送|只有API計費|不確定')
    .setHelpText('付費不代表一定包含Agent功能。不需填帳密或付款資料。');
  single('8. 如果需要付費，你的意願？', '希望免費為主|了解費用再決定|優先使用已有方案|可以合理付費|尚未決定');
  multi('9. 最想做什麼？最多選三項', '個人或診所網站|旅遊或活動網頁|整理檔案照片|整理文獻筆記|簡報教材文件|試算表資料|GitHub與發布網站|搭配NotebookLM|自動化流程|使用老師範例', true)
    .setValidation(FormApp.createCheckboxValidation().requireSelectAtMost(3).setHelpText('最多選三項').build());
  multi('10. 已有的工具帳號', 'GitHub|Google／Drive|NotebookLM|Notion|都沒有或不確定', true)
    .setHelpText('選「都沒有或不確定」時，請勿同時勾其他選項。');
  f.addTextItem().setTitle('11. 想實作的主題（選填）').setHelpText('例如：診所介紹、旅遊行程、同學會。可填「老師範例」，請勿提供患者個資。');
  multi('12. 需要哪些課前協助？', '安裝|註冊登入|確認付費與Agent資格|連接GitHub|檔案與權限|課前線上說明|不需協助', true)
    .setHelpText('選「不需協助」時，請勿同時勾其他選項。');
  f.addSectionHeaderItem().setTitle('官方下載與工具入口').setHelpText([
    '先查看即可，不必先購買方案。',
    'Claude／Claude Code：https://claude.com/download',
    'Claude Code入門：https://code.claude.com/docs/en/desktop-quickstart',
    'ChatGPT／Codex：https://chatgpt.com/download/',
    'Antigravity：https://antigravity.google/download',
    'GitHub：https://github.com/signup',
    'NotebookLM：https://notebooklm.google.com/'
  ].join('\n'));
  f.setConfirmationMessage('謝謝填寫！課程工具與準備方式將另行通知。');
  f.setPublished(true);
  f.setAcceptingResponses(true);
  p.setProperty('SHORT_SURVEY_ID', f.getId());
  showLinks(f);
}
function showLinks(f) {
  console.log('老師編輯網址：' + f.getEditUrl());
  console.log('學員填答網址：' + f.getPublishedUrl());
}
// 程式結束：請確認此行也已複製。