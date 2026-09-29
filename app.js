const DEFAULTS = {
  brandName: 'JOGO',
  footerName: 'Central do Jogo',
  footerTagline: 'Divirta-se e jogue com a galera.',
  heroEyebrow: 'PRONTO PARA JOGAR?',
  heroTitle: 'Jogue.\nRole o dado.\nEncare o desafio.',
  heroText: 'Uma central rápida para entender a partida, rolar o dado e descobrir o próximo desafio.',
  heroChallengeIcon: '🔥',
  heroChallengeTitle: 'A sorte decidiu.',
  heroChallengeSub: 'Role o dado para descobrir seu desafio.',
  primaryColor: '#ff5a2f',
  accentColor: '#ffc35c',
  tutorialTitle: 'Como jogar',
  tutorialIntro: 'Leia o passo a passo e depois vá direto para o dado.',
  diceTitle: 'Role o dado',
  diceIntro: 'Clique para girar. O resultado escolhe um desafio para você.',
  challengeTitle: 'Desafios',
  challengeIntro: 'Todos os desafios cadastrados aparecem aqui.',
  gameSectionTitle: 'Abrir jogo',
  gameSectionIntro: 'Espaço preparado para o jogo principal.',
  gameUrl: '',
  gameEmptyTitle: 'O jogo ainda não foi conectado',
  popupEnabled: true,
  popupKicker: 'AVISO',
  popupTitle: 'Bem-vindo!',
  popupBody: 'Confira as instruções e boa partida.',
  popupButton: 'Começar',
  tutorial: [
    { icon: '👥', title: 'Junte a galera', text: 'Escolham quem começa e deixem o celular acessível para todo mundo.' },
    { icon: '🎲', title: 'Role o dado', text: 'Toque no dado. O número sorteado define qual desafio será mostrado.' },
    { icon: '🔥', title: 'Cumpra o desafio', text: 'Leia a missão, façam a rodada e continuem até a próxima vez de jogar.' },
    { icon: '🏆', title: 'Valha o resultado', text: 'Use as regras do jogo original para decidir pontos, bônus ou consequências.' }
  ],
  challenges: [
    { icon: '🍕', title: 'Desafio relâmpago', text: 'Faça uma resposta criativa em até 10 segundos.', difficulty: 'Fácil', tag: 'Criatividade' },
    { icon: '🎭', title: 'Imite alguém', text: 'Escolha uma pessoa da roda e faça uma imitação por 15 segundos.', difficulty: 'Médio', tag: 'Galera' },
    { icon: '🧠', title: 'Pergunta impossível', text: 'Responda uma pergunta inventada pelo grupo sem pensar demais.', difficulty: 'Médio', tag: 'Raciocínio' },
    { icon: '💃', title: 'Movimento surpresa', text: 'Crie um passinho e desafie alguém a repetir.', difficulty: 'Difícil', tag: 'Diversão' },
    { icon: '😎', title: 'Escolha da mesa', text: 'A galera escolhe uma tarefa rápida para você cumprir.', difficulty: 'Médio', tag: 'Interação' },
    { icon: '📣', title: 'Grito da rodada', text: 'Invente um grito de guerra para sua equipe e faça todo mundo repetir.', difficulty: 'Fácil', tag: 'Equipe' },
    { icon: '⚡', title: 'Sem pensar', text: 'Fale três respostas diferentes para a mesma pergunta em cinco segundos.', difficulty: 'Difícil', tag: 'Velocidade' },
    { icon: '🎯', title: 'Acerte o tema', text: 'Diga algo que combine com a categoria escolhida pela mesa.', difficulty: 'Fácil', tag: 'Precisão' }
  ]
};

const DEV_EMAIL = 'thdyazpereira@gmail.com';
const DEV_TOKEN = 'Td@0';
const STORAGE_KEY = 'pizzaria-game-config-v1';

let state = loadState();
let currentFilter = 'Todos';
let selectedChallenge = null;

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return deepClone(DEFAULTS);
    return { ...deepClone(DEFAULTS), ...JSON.parse(raw) };
  } catch { return deepClone(DEFAULTS); }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return [...document.querySelectorAll(sel)]; }
function escapeHtml(text) {
  return String(text).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function renderTextWithBreaks(text) {
  return escapeHtml(text).replace(/\n/g, '<br>');
}

function applyTheme() {
  document.documentElement.style.setProperty('--primary', state.primaryColor);
  document.documentElement.style.setProperty('--accent', state.accentColor);
  qs('#brandName').textContent = state.brandName;
  qs('#footerName').textContent = state.footerName;
  qs('#footerTagline').textContent = state.footerTagline;
  qs('#heroEyebrow').textContent = state.heroEyebrow;
  qs('#heroTitle').innerHTML = renderTextWithBreaks(state.heroTitle).replace(/Role o dado\./, '<span>Role o dado.</span>');
  qs('#heroText').textContent = state.heroText;
  qs('#heroChallengeIcon').textContent = state.heroChallengeIcon;
  qs('#heroChallengeTitle').textContent = state.heroChallengeTitle;
  qs('#heroChallengeSub').textContent = state.heroChallengeSub;
  qs('#tutorialTitle').textContent = state.tutorialTitle;
  qs('#tutorialIntro').textContent = state.tutorialIntro;
  qs('#diceTitle').textContent = state.diceTitle;
  qs('#diceIntro').textContent = state.diceIntro;
  qs('#challengeTitle').textContent = state.challengeTitle;
  qs('#challengeIntro').textContent = state.challengeIntro;
  qs('#gameSectionTitle').textContent = state.gameSectionTitle;
  qs('#gameSectionIntro').textContent = state.gameSectionIntro;
  qs('#gameEmptyTitle').textContent = state.gameEmptyTitle;
  renderTutorial();
  renderChallenges();
  renderGame();
  applyLogo();
}

function renderTutorial() {
  qs('#tutorialGrid').innerHTML = state.tutorial.map((item, i) => `
    <article class="tutorial-card">
      <div class="num">${String(i + 1).padStart(2,'0')}</div>
      <div class="tutorial-icon">${escapeHtml(item.icon)}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </article>
  `).join('');
}

function getFilters() {
  const base = ['Todos'];
  const tags = [...new Set(state.challenges.map(c => c.tag).filter(Boolean))];
  return base.concat(tags);
}

function renderFilters() {
  const filters = getFilters();
  if (!filters.includes(currentFilter)) currentFilter = 'Todos';
  qs('#challengeFilters').innerHTML = filters.map(f => `
    <button class="filter ${f === currentFilter ? 'active' : ''}" data-filter="${escapeHtml(f)}">${escapeHtml(f)}</button>
  `).join('');
  qsa('.filter').forEach(btn => btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    renderChallenges();
  }));
}

function renderChallenges() {
  renderFilters();
  const list = currentFilter === 'Todos' ? state.challenges : state.challenges.filter(c => c.tag === currentFilter);
  qs('#challengeCount').textContent = `${list.length} ${list.length === 1 ? 'desafio' : 'desafios'}`;
  if (!list.length) {
    qs('#challengeGrid').innerHTML = '<div class="game-empty" style="grid-column:1/-1;min-height:260px"><div class="game-empty-icon">🫥</div><h3>Nenhum desafio nesta categoria</h3><p>Volte para “Todos” ou cadastre novos desafios no painel.</p></div>';
    return;
  }
  qs('#challengeGrid').innerHTML = list.map((c, idx) => `
    <article class="challenge-card" data-challenge-index="${state.challenges.indexOf(c)}">
      <div class="challenge-top"><div class="challenge-icon">${escapeHtml(c.icon)}</div><div class="difficulty">${escapeHtml(c.difficulty || 'Desafio')}</div></div>
      <h3>${escapeHtml(c.title)}</h3>
      <p>${escapeHtml(c.text)}</p>
      <div class="challenge-tag">#${escapeHtml(c.tag || 'desafio')}</div>
    </article>
  `).join('');
}

function renderGame() {
  const url = (state.gameUrl || '').trim();
  const empty = qs('#gameEmpty');
  const frame = qs('#gameFrame');
  if (url) {
    frame.src = url;
    frame.hidden = false;
    empty.hidden = true;
  } else {
    frame.hidden = true;
    frame.removeAttribute('src');
    empty.hidden = false;
  }
}

function applyLogo() {
  const logo = localStorage.getItem('pizzaria-game-logo');
  const mark = qs('#brandMark');
  if (!logo) { mark.innerHTML = '🍕'; return; }
  mark.innerHTML = `<img src="${logo}" alt="Logo" />`;
}

function openModal(id) { qs('#' + id).hidden = false; document.body.classList.add('locked'); }
function closeModal(id) { qs('#' + id).hidden = true; if (!qsa('.modal-backdrop:not([hidden])').length) document.body.classList.remove('locked'); }

function maybeShowPopup() {
  if (!state.popupEnabled || sessionStorage.getItem('pizzaria-popup-seen')) return;
  qs('#popupModalKicker').textContent = state.popupKicker;
  qs('#popupModalTitle').textContent = state.popupTitle;
  qs('#popupModalBody').textContent = state.popupBody;
  qs('#popupModalAction').textContent = state.popupButton;
  openModal('popupModal');
  sessionStorage.setItem('pizzaria-popup-seen', '1');
}

function fillSettingsForm() {
  qsa('[data-setting]').forEach(el => {
    const key = el.dataset.setting;
    if (key in state) {
      if (el.type === 'checkbox') el.checked = Boolean(state[key]);
      else el.value = state[key] ?? '';
    }
  });
}
function syncSettingsFromForm() {
  qsa('[data-setting]').forEach(el => {
    const key = el.dataset.setting;
    if (!(key in state)) return;
    state[key] = el.type === 'checkbox' ? el.checked : el.value;
  });
}

function renderTutorialEditor() {
  qs('#tutorialEditor').innerHTML = state.tutorial.map((item, i) => `
    <div class="editor-item" data-index="${i}">
      <div class="editor-top"><div class="editor-label">Passo ${i+1}</div><button class="remove-btn" data-remove-tutorial="${i}">Remover</button></div>
      <div class="admin-grid two">
        <label>Ícone<input class="icon-input" data-tutorial="${i}" data-field="icon" value="${escapeHtml(item.icon)}" maxlength="4" /></label>
        <label>Título<input data-tutorial="${i}" data-field="title" value="${escapeHtml(item.title)}" /></label>
        <label class="span-2">Texto<textarea data-tutorial="${i}" data-field="text">${escapeHtml(item.text)}</textarea></label>
      </div>
    </div>
  `).join('');
  qsa('[data-tutorial]').forEach(el => el.addEventListener('input', e => {
    const i = Number(e.target.dataset.tutorial);
    state.tutorial[i][e.target.dataset.field] = e.target.value;
  }));
  qsa('[data-remove-tutorial]').forEach(btn => btn.addEventListener('click', () => { state.tutorial.splice(Number(btn.dataset.removeTutorial),1); renderTutorialEditor(); }));
}

function renderChallengeEditor() {
  qs('#challengeEditor').innerHTML = state.challenges.map((item, i) => `
    <div class="editor-item">
      <div class="editor-top"><div class="editor-label">Desafio ${i+1}</div><button class="remove-btn" data-remove-challenge="${i}">Remover</button></div>
      <div class="admin-grid two">
        <label>Ícone<input class="icon-input" data-challenge="${i}" data-field="icon" value="${escapeHtml(item.icon)}" maxlength="4" /></label>
        <label>Título<input data-challenge="${i}" data-field="title" value="${escapeHtml(item.title)}" /></label>
        <label>Categoria<input data-challenge="${i}" data-field="tag" value="${escapeHtml(item.tag || '')}" /></label>
        <label>Dificuldade<input data-challenge="${i}" data-field="difficulty" value="${escapeHtml(item.difficulty || '')}" /></label>
        <label class="span-2">Desafio<textarea data-challenge="${i}" data-field="text">${escapeHtml(item.text)}</textarea></label>
      </div>
    </div>
  `).join('');
  qsa('[data-challenge]').forEach(el => el.addEventListener('input', e => {
    const i = Number(e.target.dataset.challenge);
    state.challenges[i][e.target.dataset.field] = e.target.value;
  }));
  qsa('[data-remove-challenge]').forEach(btn => btn.addEventListener('click', () => { state.challenges.splice(Number(btn.dataset.removeChallenge),1); renderChallengeEditor(); }));
}

function openDevGate() {
  qs('#devToken').value = '';
  qs('#devEmail').value = DEV_EMAIL;
  qs('#devError').hidden = true;
  openModal('devGateModal');
  setTimeout(() => qs('#devToken').focus(), 50);
}

function openAdmin() {
  closeModal('devGateModal');
  fillSettingsForm();
  renderTutorialEditor();
  renderChallengeEditor();
  openModal('adminModal');
}

function rollDice() {
  if (!state.challenges.length) return;
  const die = qs('#die');
  const result = qs('#diceResult');
  const hint = qs('#diceHint');
  die.classList.remove('rolling');
  void die.offsetWidth;
  die.classList.add('rolling');
  result.textContent = 'Girando…';
  hint.textContent = 'A sorte está escolhendo...';
  const number = Math.floor(Math.random() * 6) + 1;
  const index = (number - 1) % state.challenges.length;
  selectedChallenge = state.challenges[index];
  setTimeout(() => {
    result.textContent = `Saiu ${number}!`;
    hint.textContent = selectedChallenge.title;
    qs('#heroChallengeIcon').textContent = selectedChallenge.icon;
    qs('#heroChallengeTitle').textContent = selectedChallenge.title;
    qs('#heroChallengeSub').textContent = selectedChallenge.text;
    qs('#desafios').scrollIntoView({behavior:'smooth', block:'start'});
    setTimeout(() => {
      const cards = qsa('.challenge-card');
      const selectedIndex = state.challenges.indexOf(selectedChallenge);
      const target = cards.find(card => Number(card.dataset.challengeIndex) === selectedIndex);
      if (target) {
        target.scrollIntoView({behavior:'smooth', block:'center'});
      }
    }, 350);
  }, 1800);
}

function wireEvents() {
  qs('#openDevGate').addEventListener('click', openDevGate);
  qs('#closeDevGate').addEventListener('click', () => closeModal('devGateModal'));
  qs('#closeAdmin').addEventListener('click', () => closeModal('adminModal'));
  qs('#closePopup').addEventListener('click', () => closeModal('popupModal'));
  qs('#popupModalAction').addEventListener('click', () => closeModal('popupModal'));
  qs('#devGateForm').addEventListener('submit', e => {
    e.preventDefault();
    const token = qs('#devToken').value.trim();
    const email = qs('#devEmail').value.trim().toLowerCase();
    if (token !== DEV_TOKEN || email !== DEV_EMAIL) {
      qs('#devError').textContent = 'Token ou e-mail inválido.';
      qs('#devError').hidden = false;
      return;
    }
    openAdmin();
  });
  qs('#logoutDev').addEventListener('click', () => closeModal('adminModal'));
  qs('#rollDice').addEventListener('click', rollDice);
  qs('#rollDiceBottom').addEventListener('click', rollDice);
  qs('#addTutorial').addEventListener('click', () => { state.tutorial.push({icon:'✨',title:'Novo passo',text:'Edite este texto no painel.'}); renderTutorialEditor(); });
  qs('#addChallenge').addEventListener('click', () => { state.challenges.push({icon:'✨',title:'Novo desafio',text:'Edite este desafio no painel.',difficulty:'Médio',tag:'Novo'}); renderChallengeEditor(); renderChallenges(); });
  qs('#saveSettings').addEventListener('click', () => {
    syncSettingsFromForm();
    saveState();
    applyTheme();
    renderTutorialEditor();
    renderChallengeEditor();
    qs('#saveState').textContent = 'Salvo neste navegador ✓';
  });
  qs('#resetDefaults').addEventListener('click', () => {
    state = deepClone(DEFAULTS);
    saveState();
    fillSettingsForm(); renderTutorialEditor(); renderChallengeEditor(); applyTheme();
    qs('#saveState').textContent = 'Padrões restaurados';
  });
  qsa('.admin-tab').forEach(tab => tab.addEventListener('click', () => {
    qsa('.admin-tab').forEach(t => t.classList.toggle('active', t === tab));
    qsa('.admin-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === tab.dataset.tab));
  }));
  qs('#logoUpload').addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { localStorage.setItem('pizzaria-game-logo', reader.result); applyLogo(); qs('#saveState').textContent = 'Logo carregada ✓'; };
    reader.readAsDataURL(file);
  });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') qsa('.modal-backdrop:not([hidden])').forEach(m => m.hidden = true); if (e.key === 'Escape') document.body.classList.remove('locked'); });
}

applyTheme();
wireEvents();
maybeShowPopup();
