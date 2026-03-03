/* script.js */

// ==========================================================
// 1. 狀態與全域變數 (State & Variables)
// ==========================================================
let appData = []; // 儲存整個應用程式的資料結構 (包含四個象限、隊伍、英雄等)
let editContext = { qIdx: 0, tIdx: 0, mIdx: 0, type: '' }; // 記錄目前正在編輯哪個位置的資料
let currentTab = 'all'; // Modal 視窗目前的分類標籤
let globalHeroState = 'sixStar'; // 全域英雄狀態: base (基礎), sixStar (開花), ascended (晉升)
let globalHeroStyle = 'base'; // 全域英雄造型: base, Super Costume, april_fool

const MAX_CHAIN_ROWS = 4; // 每個連鎖設定群組最多的行數
const MAX_CHAIN_SETS = 2; // 每個隊伍最多的連鎖設定群組數

// 新建連鎖槽位的預設資料結構 (-1 代表未選中英雄)
const defaultChainSlot = {
    time: '',
    selectedIndex: -1, 
};

// ==========================================================
// 2. DOM 元素選取 (DOM Elements)
// ==========================================================
const modal = document.getElementById('selection-modal');
const grid = document.getElementById('grid-content');
const tabContainer = document.getElementById('tab-container');
const searchInput = document.getElementById('search-input');
const toggleExclusive = document.getElementById('toggle-exclusive');
const globalStateToggleBtn = document.getElementById('global-state-toggle');
const clearSlotBtn = document.getElementById('btn-clear-slot');
const modalTitle = document.getElementById('modal-title');
const styleToggleBtn = document.getElementById('global-style-toggle');

// ==========================================================
// 3. 常數對應表 (Constants)
// ==========================================================
const BUFF_PARSER_MAP = {
    '技回': 'wepRegen', '技傷': 'skillDmg', '防禦力': 'def', '生命力': 'hp',
    '爆擊率': 'crit', '爆傷': 'critDmg', '遠程防': 'rangeDef', '近戰防': 'meleeDef',
    '普屬攻': 'normalAtk', '火屬攻': 'fireAtk', '水屬攻': 'waterAtk',
    '土屬攻': 'earthAtk', '光屬攻': 'lightAtk', '暗屬攻': 'darkAtk',
    '遠程': 'rangeAtk', '近戰': 'meleeAtk', '攻擊力': 'Atk', '一般攻': 'generalAtk',
    '遠程攻': 'rangeAtk', '近戰攻': 'meleeAtk', '護盾': 'shieldIncr',
    "擊殺恢復": 'killRecover', "受傷連鎖，攻擊力、回復力": 'injuredAtkHealIncr'
};

// 建立預設的連鎖資料結構 (5個格子: 4英雄 + 1隊長)
function createDefaultChainSet() {
    return {
        presets: Array(MAX_CHAIN_ROWS).fill(null).map(() =>
            Array(5).fill(null).map(() => ({ ...defaultChainSlot }))
        ),
        note: '',
        activeRows: 2,
    };
}

// ==========================================================
// 4. 拖曳邏輯 (Drag and Drop)
// ==========================================================
let dragSrcData = null; // 記錄拖曳來源資料 { type: 'team'|'hero'|'quadrant', qIdx, tIdx, mIdx }
let dropPosition = null; // 記錄放置位置 'before' 或 'after'

// 開始拖曳 (共用方法)
function handleDragStart(e, type, data) {
    dragSrcData = { ...data, type };
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify(dragSrcData));
}
// 各層級的拖曳起點
function handleQuadrantDragStart(e, qIdx) { handleDragStart(e, 'quadrant', { qIdx }); }
function handleTeamDragStart(e, qIdx, tIdx) { e.stopPropagation(); handleDragStart(e, 'team', { qIdx, tIdx }); }
function handleHeroDragStart(e, qIdx, tIdx, mIdx) { e.stopPropagation(); handleDragStart(e, 'hero', { qIdx, tIdx, mIdx }); }

// 結束拖曳 (清理樣式)
function handleDragEnd(e) {
    if (e.target) e.target.classList.remove('dragging');
    const selectors = ['.drag-over', '.drag-over-container', '.drop-above', '.drop-below', '.drag-over-quadrant'];
    document.querySelectorAll(selectors.join(',')).forEach(el => el.classList.remove(...selectors.map(s => s.substring(1))));
    dragSrcData = null; dropPosition = null;
}

// 拖曳經過 (計算上下位置並給予視覺回饋)
function handleDragOver(e) {
    e.preventDefault();
    if (dragSrcData && dragSrcData.type === 'quadrant') return; // 區域拖曳不在此處理
    e.stopPropagation();

    const target = e.currentTarget;
    if (dragSrcData && dragSrcData.type === 'team' && target.classList.contains('team-container')) {
        const rect = target.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        target.classList.remove('drop-above', 'drop-below');
        if (e.clientY < midY) { target.classList.add('drop-above'); dropPosition = 'before'; } 
        else { target.classList.add('drop-below'); dropPosition = 'after'; }
    }
    if (dragSrcData && dragSrcData.type === 'hero' && target.classList.contains('hero-container')) {
        target.classList.add('drag-over');
    }
}

// 容器與區域的 DragOver
function handleContainerDragOver(e) {
    e.preventDefault();
    if (dragSrcData && dragSrcData.type === 'quadrant') return;
    if (dragSrcData && dragSrcData.type === 'team') {
        e.stopPropagation(); e.currentTarget.classList.add('drag-over-container');
    }
}
function handleContainerDragLeave(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    e.currentTarget.classList.remove('drag-over-container');
}
function handleQuadrantDragOver(e) {
    e.preventDefault();
    if (dragSrcData && dragSrcData.type === 'quadrant') e.currentTarget.classList.add('drag-over-quadrant');
}
function handleQuadrantDragLeave(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    e.currentTarget.classList.remove('drag-over-quadrant');
}
function handleDragEnter(e) {
    e.preventDefault();
    if (dragSrcData && dragSrcData.type === 'hero' && e.currentTarget.classList.contains('hero-container')) {
        e.currentTarget.classList.add('drag-over');
    }
}
function handleDragLeave(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    e.currentTarget.classList.remove('drag-over', 'drop-above', 'drop-below');
}

// 放置處理 (Drop)
function handleQuadrantDrop(e, targetQIdx) {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over-quadrant');
    if (!dragSrcData) try { dragSrcData = JSON.parse(e.dataTransfer.getData('text/plain')); } catch (err) { }
    if (!dragSrcData || dragSrcData.type !== 'quadrant' || dragSrcData.qIdx === targetQIdx) return;
    
    // 交換象限資料
    const temp = appData[dragSrcData.qIdx];
    appData[dragSrcData.qIdx] = appData[targetQIdx];
    appData[targetQIdx] = temp;
    saveAndRender();
}

function handleTeamDrop(e, targetQIdx, targetTIdx) {
    if (dragSrcData && dragSrcData.type === 'quadrant') return;
    e.stopPropagation(); e.currentTarget.classList.remove('drop-above', 'drop-below');
    if (!dragSrcData) try { dragSrcData = JSON.parse(e.dataTransfer.getData('text/plain')); } catch (err) { }
    if (!dragSrcData || dragSrcData.type !== 'team') return;

    const [movedTeam] = appData[dragSrcData.qIdx].teams.splice(dragSrcData.tIdx, 1);
    let insertIndex = targetTIdx;
    if (dragSrcData.qIdx === targetQIdx && dragSrcData.tIdx < targetTIdx) insertIndex--;
    if (dropPosition === 'after') insertIndex++;
    
    appData[targetQIdx].teams.splice(insertIndex, 0, movedTeam);
    saveAndRender();
}

function handleContainerDrop(e, targetQIdx) {
    if (dragSrcData && dragSrcData.type === 'quadrant') return;
    e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.remove('drag-over-container');
    if (!dragSrcData) try { dragSrcData = JSON.parse(e.dataTransfer.getData('text/plain')); } catch (err) { }
    if (!dragSrcData || dragSrcData.type !== 'team') return;

    const [movedTeam] = appData[dragSrcData.qIdx].teams.splice(dragSrcData.tIdx, 1);
    appData[targetQIdx].teams.push(movedTeam); // 加到最後
    saveAndRender();
}

function handleHeroDrop(e, targetQIdx, targetTIdx, targetMIdx) {
    if (dragSrcData && dragSrcData.type === 'quadrant') return;
    e.stopPropagation(); e.currentTarget.classList.remove('drag-over');
    if (!dragSrcData) try { dragSrcData = JSON.parse(e.dataTransfer.getData('text/plain')); } catch (err) { }
    if (!dragSrcData || dragSrcData.type !== 'hero' || (dragSrcData.qIdx === targetQIdx && dragSrcData.tIdx === targetTIdx && dragSrcData.mIdx === targetMIdx)) return;

    const srcMembers = appData[dragSrcData.qIdx].teams[dragSrcData.tIdx].members;
    const tgtMembers = appData[targetQIdx].teams[targetTIdx].members;

    // 交換英雄資料
    const temp = srcMembers[dragSrcData.mIdx];
    srcMembers[dragSrcData.mIdx] = tgtMembers[targetMIdx];
    tgtMembers[targetMIdx] = temp;

    // 若在同隊伍內交換，同步更新連鎖選項
    if (dragSrcData.qIdx === targetQIdx && dragSrcData.tIdx === targetTIdx) {
        const team = appData[targetQIdx].teams[targetTIdx];
        const sIdx = dragSrcData.mIdx, tIdx = targetMIdx;
        team.chainData.forEach(set => set.presets.forEach(row => row.forEach(slot => {
            const currentVal = slot.selectedIndex;
            if (currentVal === sIdx) slot.selectedIndex = tIdx;
            else if (currentVal === tIdx) slot.selectedIndex = sIdx;
        })));
    }
    saveAndRender();
}

// ==========================================================
// 5. 輔助與查詢函式 (Helpers)
// ==========================================================
function findHero(id) { return (typeof DB_HEROES !== 'undefined' ? DB_HEROES : []).find(h => h.id === id); }
function findWeapon(id) { return (typeof DB_WEAPONS !== 'undefined' ? DB_WEAPONS : []).find(w => w.id === id); }
function findAccessory(id) { return (typeof DB_ACCESSORIES !== 'undefined' ? DB_ACCESSORIES : []).find(a => a.id === id); }
function findRelic(id) { return (typeof DB_RELICS !== 'undefined' ? DB_RELICS : []).find(r => r.id === id); }

// 取得英雄頭像 (支援造型與狀態切換)
function getHeroIconUrl(id, state, style) {
    const hero = findHero(id);
    if (!hero) return './images/slots/hero.png';

    // 1. 特殊造型判斷
    if (style && style !== 'base' && hero.styles && hero.styles.includes(style)) {
        let fileName = hero.nameEn;
        if (style === 'Super Costume') fileName = `${hero.nameEn}_Super Costume`;
        return `./images/heroes/styles/${style}/${fileName}.png`;
    }

    // 2. 狀態判斷 (開花/晉升)
    let suffix = '';
    if (state === 'sixStar') {
        if (hero.coreStates?.sixStar?.hasImage) suffix = '_6Star';
        else if (hero.coreStates?.ascended?.hasImage) suffix = '_Ascended';
    } else if (state === 'ascended' && hero.coreStates?.ascended?.hasImage) {
        suffix = '_Ascended';
    }

    return `./images/heroes/${hero.nameEn}${suffix}.png`;
}

function getWeaponIconUrl(id) {
    const w = findWeapon(id);
    return w ? w.icon : './images/slots/weapon.png';
}

function parseBuffText(text) {
    if (!text) return null;
    const lines = text.split('\n');
    const buffVal = [];
    const regex = /(.+)\+(\d+)%/;
    lines.forEach(line => {
        const match = line.match(regex);
        if (match) {
            const val = parseInt(match[2], 10);
            let type = BUFF_PARSER_MAP[match[1].trim()];
            if (!type) {
                for (let k in BUFF_PARSER_MAP) { if (match[1].includes(k)) type = BUFF_PARSER_MAP[k]; }
            }
            if (type && val > 0) buffVal.push({ type, value: val });
        }
    });
    return buffVal.length > 0 ? buffVal : null;
}

function generateBuffText(buffVal, separator = ' | ') {
    if (!buffVal || buffVal.length === 0) return '';
    const REVERSE_MAP = {};
    Object.entries(BUFF_PARSER_MAP).forEach(([k, v]) => {
        if (!REVERSE_MAP[v] || k.length < REVERSE_MAP[v].length) REVERSE_MAP[v] = k;
    });
    return buffVal.map(b => `${REVERSE_MAP[b.type] || b.type}+${b.value}%`).join(separator);
}

// 取得英雄所有資訊 (包含 Buff、連鎖、狀態)
function getHeroInfo(heroData, globalState, w1Id) {
    if (!heroData) return { icon: './images/slots/hero.png', partyBuffVal: null, chain: null };

    const hasSixStar = heroData.coreStates && heroData.coreStates.sixStar !== null;
    const hasAscended = heroData.coreStates && heroData.coreStates.ascended !== null;

    let stateKey = 'base';
    if (globalState === 'ascended' && hasAscended) stateKey = 'ascended';
    else if (globalState === 'sixStar') stateKey = hasSixStar ? 'sixStar' : (hasAscended ? 'ascended' : 'base');

    const iconPath = getHeroIconUrl(heroData.id, stateKey, globalHeroStyle);
    const isEx2 = heroData.exclusiveWeapons && heroData.exclusiveWeapons.some(w => w.endsWith('_ex2') && w1Id === w);

    const buffs = heroData.buffs[stateKey] || heroData.buffs.base;
    const activeBuff = isEx2 ? (buffs.ex2 || buffs.ex1) : buffs.ex1;
    const partyBuffVal = activeBuff && activeBuff.text ? parseBuffText(activeBuff.text) : null;

    let chain = heroData.chain.ex1 || heroData.chain;
    if (isEx2 && heroData.chain.ex2) chain = heroData.chain.ex2;
    if (stateKey === 'ascended' && heroData.chain.ascended) chain = heroData.chain.ascended;

    return { icon: iconPath, partyBuffVal, chain, stateKey }; 
}

function calculateTeamBuffs(team) {
    const total = {};
    if (!team.members) return total;
    team.members.slice(0, 4).forEach(m => {
        const h = findHero(m.heroId);
        if (h) {
            const info = getHeroInfo(h, globalHeroState, m.w1Id);
            if (info.partyBuffVal) {
                info.partyBuffVal.forEach(b => total[b.type] = (total[b.type] || 0) + b.value);
            }
        }
    });
    return total;
}

// ==========================================================
// 6. 系統初始化與儲存 (Initialization & Storage)
// ==========================================================
function init() {
    if (typeof DB_BOSSES === 'undefined') { console.error("Data not loaded"); return; }

    const saved = localStorage.getItem('gt_raid_v21');
    if (saved) {
        try {
            appData = JSON.parse(saved);
            // 資料相容性升級檢查 (Migration)
            appData.forEach(q => {
                if (!q.teams) q.teams = [];
                while (q.teams.length < 1) addTeamToData(q);
                q.teams.forEach(t => {
                    if (!t.members || t.members.length < 5) {
                        const oldM = t.members || [];
                        t.members = Array(5).fill().map((_, i) => oldM[i] || { heroId: null, w1Id: null, w2Id: null, accId: null, relicId: null });
                    }
                    if (!t.chainData || t.chainData.length !== MAX_CHAIN_SETS) {
                        t.chainData = Array(MAX_CHAIN_SETS).fill(null).map(() => createDefaultChainSet());
                        t.activeChainSets = 1;
                    }
                    if (typeof t.activeChainSets !== 'number' || t.activeChainSets < 1 || t.activeChainSets > MAX_CHAIN_SETS) t.activeChainSets = 1;

                    t.chainData.forEach(set => {
                        if (!set.presets) set.presets = createDefaultChainSet().presets;
                        if (!set.note) set.note = '';
                        if (typeof set.activeRows !== 'number' || set.activeRows > MAX_CHAIN_ROWS) set.activeRows = Math.min(2, MAX_CHAIN_ROWS);

                        while (set.presets.length < MAX_CHAIN_ROWS) set.presets.push(Array(5).fill(null).map(() => ({ ...defaultChainSlot }))); 
                        set.presets.length = MAX_CHAIN_ROWS;

                        set.presets.forEach(row => {
                            while (row.length < 5) row.push({ ...defaultChainSlot }); // 擴充為 5 格
                            row.length = 5;
                            row.forEach(slot => {
                                if (typeof slot.active === 'boolean' || typeof slot.selectedIndex !== 'number') {
                                    slot.selectedIndex = -1; delete slot.active;
                                }
                            });
                        });
                    });
                    delete t.chainTimings; delete t.chainNotes;
                });
            });
        } catch (e) { appData = getEmptyData(); }
    } else {
        appData = getEmptyData();
        appData.forEach(q => { addTeamToData(q); addTeamToData(q); addTeamToData(q); });
    }

    if (searchInput) searchInput.addEventListener('input', renderGrid);
    if (toggleExclusive) toggleExclusive.addEventListener('change', renderGrid);
    if (globalStateToggleBtn) globalStateToggleBtn.onclick = toggleAllHeroStates;

    renderApp();
}

function getEmptyData() {
    const basicBosses = [{ id: 'b_reaper', element: 'basic' }, { id: 'b_fairy', element: 'fire' }, { id: 'b_vizier', element: 'water' }, { id: 'b_hydra', element: 'earth' }];
    return basicBosses.map(b => {
        const db = DB_BOSSES.find(d => d.id === b.id) || { id: b.id, name: b.id, element: b.element };
        return { bossId: db.id, bossName: db.name, element: db.element, teams: [] };
    });
}

function addTeamToData(quadrant) {
    quadrant.teams.push({
        id: Date.now().toString() + Math.random(),
        members: Array(5).fill().map(() => ({ heroId: null, w1Id: null, w2Id: null, accId: null, relicId: null })),
        chainData: Array(MAX_CHAIN_SETS).fill(null).map(() => createDefaultChainSet()),
        activeChainSets: 1
    });
}

function saveToLocal() { localStorage.setItem('gt_raid_v21', JSON.stringify(appData)); }
function saveAndRender() { saveToLocal(); renderApp(); }
function clearAllData() { if (confirm('重置？')) { localStorage.removeItem('gt_raid_v21'); location.reload(); } }
function exportData() {
    const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData));
    const a = document.createElement('a'); a.href = str; a.download = "raid_v22.json";
    document.body.appendChild(a); a.click(); a.remove();
}
function importData(input) {
    const file = input.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { try { appData = JSON.parse(e.target.result); saveAndRender(); } catch (x) { alert('匯入失敗！檔案可能損毀。'); } };
    reader.readAsText(file);
}

// ==========================================================
// 7. 畫面渲染邏輯 (Rendering)
// ==========================================================
function renderApp() {
    appData.forEach((qData, qIdx) => {
        const qEl = document.getElementById(`q-${qIdx}`);
        if (!qEl) return;

        // 綁定區域拖曳事件
        qEl.setAttribute('draggable', 'true');
        qEl.setAttribute('ondragstart', `handleQuadrantDragStart(event, ${qIdx})`);
        qEl.setAttribute('ondragover', `handleQuadrantDragOver(event)`);
        qEl.setAttribute('ondragleave', `handleQuadrantDragLeave(event)`);
        qEl.setAttribute('ondrop', `handleQuadrantDrop(event, ${qIdx})`);
        qEl.setAttribute('ondragend', `handleDragEnd(event)`);

        const boss = DB_BOSSES.find(b => b.id === qData.bossId) || DB_BOSSES.find(b => b.element === qData.element);
        const elemData = CONSTANTS.elements[qData.element] || CONSTANTS.elements.basic;

        // 渲染區域標題 (屬性/Boss 按鈕)
        qEl.querySelector('.quadrant-header').innerHTML = `
            <div class="boss-display-wrapper" style="border-color:${elemData.color}">
                <div class="header-btn-element" onclick="openModal(${qIdx},0,0,'element')" title="點擊更換屬性">
                    <img src="${elemData.icon}" class="boss-attr-icon">
                    <span style="color:${elemData.color}">${elemData.label}</span>
                </div>
                <div class="header-btn-boss" onclick="openModal(${qIdx},0,0,'boss-list')" title="點擊更換 BOSS">
                    <span>${boss ? boss.name : '選擇BOSS'}</span>
                </div>
            </div>
            <button onclick="addTeam(${qIdx})">+ 隊伍</button>
        `;

        // 渲染隊伍列表
        const teamListContainer = qEl.querySelector('.team-list');
        teamListContainer.innerHTML = '';
        teamListContainer.setAttribute('ondragover', 'handleContainerDragOver(event)');
        teamListContainer.setAttribute('ondragleave', 'handleContainerDragLeave(event)');
        teamListContainer.setAttribute('ondrop', `handleContainerDrop(event, ${qIdx})`);
        teamListContainer.innerHTML = qData.teams.map((t, tIdx) => renderTeam(t, qIdx, tIdx)).join('');
    });

    updateGlobalButtons();
}

function updateGlobalButtons() {
    let stateText = globalHeroState === 'ascended' ? '🌟 晉升' : (globalHeroState === 'sixStar' ? '🌸 最大' : '🌱 基本');
    if (globalStateToggleBtn) globalStateToggleBtn.innerText = stateText;

    if (styleToggleBtn) {
        let styleLabel = globalHeroStyle === 'base' ? '基本頭像' : (globalHeroStyle === 'april_fool' ? '愚人節頭像' : '超時頭像');
        styleToggleBtn.innerText = `造型: ${styleLabel}`;
    }
}

// 渲染單一隊伍卡片
function renderTeam(team, qIdx, tIdx) {
    const stats = calculateTeamBuffs(team);
    const buffText = generateBuffText(Object.entries(stats).map(([k, v]) => ({ type: k, value: v })), ' | ') || '無加成';
    const auxHtml = renderAuxMember(team.members[4], qIdx, tIdx, 4);
    const heroesHtml = team.members.slice(0, 4).map((m, mIdx) => renderHeroMember(m, qIdx, tIdx, mIdx)).join('');

    let chainPanelsHtml = '';
    for (let setIdx = 0; setIdx < team.activeChainSets; setIdx++) {
        const chainSet = team.chainData[setIdx];
        let chainSetContent = '';

        for (let rowIdx = 0; rowIdx < chainSet.activeRows; rowIdx++) {
            const chainRow = chainSet.presets[rowIdx];
            
            // 生成連鎖格子的 HTML
            const heroSlotsHtml = chainRow.map((slot, mIdx) => {
                const selectedHeroIndex = slot.selectedIndex;
                let iconPath = './images/slots/hero.png';
                let isSelected = selectedHeroIndex !== -1;
                let heroLabel = `H${mIdx + 1} slot`;
                let innerIconHtml = '';
                let leaderClass = ''; 

                if (isSelected) {
                    if (selectedHeroIndex === 4) {
                        // 隊長選項處理
                        leaderClass = 'is-leader';
                        const leaderMember = team.members[0];
                        const leaderHero = findHero(leaderMember.heroId);
                        if (leaderHero) {
                            iconPath = getHeroInfo(leaderHero, globalHeroState, leaderMember.w1Id).icon;
                            heroLabel = '隊長 (Leader): ' + leaderHero.name.substring(0, 4);
                        } else heroLabel = '隊長 (未設定)';
                    } else {
                        // 一般英雄選項處理
                        const h = findHero(team.members[selectedHeroIndex].heroId);
                        if (h) {
                            iconPath = getHeroInfo(h, globalHeroState, team.members[selectedHeroIndex].w1Id).icon;
                            heroLabel = h.name.substring(0, 4);
                        } else {
                            slot.selectedIndex = -1; isSelected = false; // 修正無效資料
                        }
                    }
                }
                
                return `
                    <div class="chain-step-item">
                        <div class="chain-row-icon ${!isSelected ? 'unselected' : ''} ${leaderClass}" 
                             title="${heroLabel}"
                             onclick="cycleChainSelection(${qIdx}, ${tIdx}, ${setIdx}, ${rowIdx}, ${mIdx})"> 
                         <img src="${iconPath}">
                     </div>
                     <input class="chain-time-input" value="${slot.time}" placeholder="0.0" 
                             onblur="updateChainTime(${qIdx}, ${tIdx}, ${setIdx}, ${rowIdx}, ${mIdx}, this.value)">
                    </div>
                 `;
            }).join('');

            const removeRowBtn = (chainSet.activeRows > 1) ? `<button class="btn-remove-chain-row" title="刪除此行" onclick="removeChainRow(${qIdx}, ${tIdx}, ${setIdx}, ${rowIdx})">x</button>` : `<div style="width: 1.2rem; flex-shrink: 0;"></div>`;
            chainSetContent += `<div class="chain-steps-row-container"><div class="chain-steps-row">${heroSlotsHtml}</div>${removeRowBtn}</div>`;
        }

        const addRowBtn = chainSet.activeRows < MAX_CHAIN_ROWS ? `<button class="btn-add-chain-step" onclick="addChainRow(${qIdx}, ${tIdx}, ${setIdx})">+ 連鎖 ${chainSet.activeRows + 1}</button>` : '';

        chainPanelsHtml += `
            <div class="chain-set-group set-${setIdx + 1}">
                <div class="chain-set-content">
                    <div class="chain-timing-steps-content">
                        <div class="chain-rows-group">${chainSetContent}${addRowBtn}</div>
                    </div>
                    <textarea class="chain-note-input" placeholder="備註" onblur="updateChainNote(${qIdx}, ${tIdx}, ${setIdx}, this.value)">${chainSet.note}</textarea>
                </div>
            </div>
        `;
    }

    return `
        <div class="team-container" draggable="true"
             ondragstart="handleTeamDragStart(event, ${qIdx}, ${tIdx})"
             ondragover="handleDragOver(event)" ondragenter="handleDragEnter(event)"
             ondragleave="handleDragLeave(event)" ondrop="handleTeamDrop(event, ${qIdx}, ${tIdx})" ondragend="handleDragEnd(event)">
             
            <div class="team-header">
                <div class="team-buff-summary">隊伍 ${tIdx + 1} (${buffText})</div>
                <button class="btn-remove-team" onclick="removeTeam(${qIdx}, ${tIdx})">X</button>
            </div>
            
            <div class="team-content">
                <div class="member-grid">${auxHtml}${heroesHtml}</div>
                <div class="chain-panels-container">${chainPanelsHtml}</div>
            </div>
        </div>
    `;
}

// 渲染單一英雄格子
function renderHeroMember(member, qIdx, tIdx, mIdx) {
    const h = findHero(member.heroId);
    const info = getHeroInfo(h, globalHeroState, member.w1Id);
    const elem = h ? CONSTANTS.elements[h.element] : CONSTANTS.elements.basic;
    const chainHtml = info.chain ? `<div class="hero-chain-icons"><img src="${CHAIN_IMAGES[info.chain.start]}"><span>→</span><img src="${CHAIN_IMAGES[info.chain.end]}"></div>` : '';

    return `
        <div class="member-container hero-container" draggable="true"
             ondragstart="handleHeroDragStart(event, ${qIdx}, ${tIdx}, ${mIdx})"
             ondragover="handleDragOver(event)" ondragenter="handleDragEnter(event)"
             ondragleave="handleDragLeave(event)" ondrop="handleHeroDrop(event, ${qIdx}, ${tIdx}, ${mIdx})" ondragend="handleDragEnd(event)">
             
            <div class="hero-name-top" style="color:${elem.color}">${h ? h.name : '英雄'}</div>
            <div class="hero-slot" onclick="openModal(${qIdx},${tIdx},${mIdx},'hero')" style="border-color:${elem.color}">
                <img src="${info.icon}">
                ${h ? `<div class="hero-attribute-badge" style="border-color:${elem.color}"><img src="${elem.icon}" class="hero-attribute-badge-img"></div>` : ''} 
                ${chainHtml}
            </div>
            <div class="equipment-slots">
                <div class="slot" onclick="openModal(${qIdx},${tIdx},${mIdx},'w1')"><img src="${getWeaponIconUrl(member.w1Id)}"></div>
                <div class="slot" onclick="openModal(${qIdx},${tIdx},${mIdx},'w2')"><img src="${getWeaponIconUrl(member.w2Id)}"></div>
            </div>
        </div>
    `;
}

// 渲染飾品遺物格子
function renderAuxMember(member, qIdx, tIdx, mIdx) {
    const acc = findAccessory(member.accId);
    const relic = findRelic(member.relicId);
    return `
        <div class="member-container aux-container">
            <div class="hero-name-top" style="color:#aaa">特殊</div>
            <div class="general-slots">
                <div class="slot" onclick="openModal(${qIdx},${tIdx},${mIdx},'relic')"><img src="${relic ? relic.icon : './images/slots/relic.png'}"></div>
                <div class="slot" onclick="openModal(${qIdx},${tIdx},${mIdx},'acc')"><img src="${acc ? acc.icon : './images/slots/acc.png'}"></div>
            </div>
        </div>
    `;
}

// ==========================================================
// 8. 互動行為與資料操作 (Interactions & Data Manipulation)
// ==========================================================
function addTeam(qIdx) { addTeamToData(appData[qIdx]); saveAndRender(); }
function removeTeam(q, t) { if (confirm('刪除此隊伍?')) { appData[q].teams.splice(t, 1); saveAndRender(); } }

function toggleAllHeroStates() {
    if (globalHeroState === 'base') globalHeroState = 'ascended';
    else if (globalHeroState === 'ascended') globalHeroState = 'sixStar';
    else globalHeroState = 'base';
    saveAndRender();
}

const HERO_STYLES = ['base', 'Super Costume', 'april_fool'];
function toggleAllHeroStyle() {
    globalHeroStyle = HERO_STYLES[(HERO_STYLES.indexOf(globalHeroStyle) + 1) % HERO_STYLES.length];
    saveAndRender();
}

// 連鎖設定增減
function addChainSet(q, t) { if (appData[q].teams[t].activeChainSets < MAX_CHAIN_SETS) { appData[q].teams[t].activeChainSets++; saveAndRender(); } }
function removeChainSet(q, t, setIdx) {
    const team = appData[q].teams[t];
    if (team.activeChainSets > 0) { team.chainData.splice(setIdx, 1); team.chainData.push(createDefaultChainSet()); team.activeChainSets--; saveAndRender(); }
}
function addChainRow(q, t, setIdx) { if (appData[q].teams[t].chainData[setIdx].activeRows < MAX_CHAIN_ROWS) { appData[q].teams[t].chainData[setIdx].activeRows++; saveAndRender(); } }
function removeChainRow(q, t, setIdx, rowIdx) {
    const chainSet = appData[q].teams[t].chainData[setIdx];
    if (chainSet.activeRows > 1) {
        chainSet.presets.splice(rowIdx, 1);
        chainSet.presets.push(Array(5).fill(null).map(() => ({ ...defaultChainSlot })));
        chainSet.activeRows--; saveAndRender();
    }
}

// 循環切換連鎖選取的英雄
function cycleChainSelection(q, t, setIdx, rowIdx, slotIdx) {
    const chainSlot = appData[q].teams[t].chainData[setIdx].presets[rowIdx][slotIdx];
    const members = appData[q].teams[t].members;

    const placedHeroIndices = [];
    for (let i = 0; i < 4; i++) { if (members[i].heroId !== null) placedHeroIndices.push(i); }
    placedHeroIndices.push(4); // 加入隊長選項

    if (placedHeroIndices.length === 0) { chainSlot.selectedIndex = -1; saveAndRender(); return; }

    const fullCycle = [-1, ...placedHeroIndices];
    let currentCycleIndex = fullCycle.indexOf(chainSlot.selectedIndex);
    if (currentCycleIndex === -1) currentCycleIndex = 0;

    chainSlot.selectedIndex = fullCycle[(currentCycleIndex + 1) % fullCycle.length];
    saveAndRender();
}

function updateChainTime(q, t, setIdx, rowIdx, mIdx, v) { appData[q].teams[t].chainData[setIdx].presets[rowIdx][mIdx].time = v; saveToLocal(); }
function updateChainNote(q, t, setIdx, v) { appData[q].teams[t].chainData[setIdx].note = v; saveToLocal(); }

// ==========================================================
// 9. 彈出選單邏輯 (Modal UI)
// ==========================================================
function selectItem(id) {
    const { qIdx, tIdx, mIdx, type } = editContext;
    const m = appData[qIdx].teams[tIdx].members[mIdx];

    if (type === 'hero') {
        m.heroId = id; m.w1Id = null; m.w2Id = null;
        appData[qIdx].teams[tIdx].chainData.forEach(set => set.presets.forEach(row => row.forEach(slot => {
            if (slot.selectedIndex === mIdx) { slot.selectedIndex = -1; slot.time = ''; } // 清除失效的連鎖關聯
        })));
    } else if (type === 'w1') m.w1Id = id;
    else if (type === 'w2') m.w2Id = id;
    else if (type === 'relic') m.relicId = id;
    else if (type === 'acc') m.accId = id;

    saveAndRender(); closeModal();
}

function openModal(qIdx, tIdx, mIdx, type) {
    editContext = { qIdx, tIdx, mIdx, type };
    document.getElementById('search-bar').style.display = 'flex';
    document.getElementById('btn-clear-slot').style.display = 'block';
    document.getElementById('tab-container').style.display = 'flex';
    toggleExclusive.parentElement.style.display = 'none';

    if (type === 'element') {
        modalTitle.textContent = '選擇屬性';
        document.getElementById('search-bar').style.display = 'none';
        document.getElementById('btn-clear-slot').style.display = 'none';
        document.getElementById('tab-container').style.display = 'none';
        renderElementSelectionGrid();
    } else if (type === 'boss-list') {
        modalTitle.textContent = '選擇 BOSS';
        document.getElementById('search-bar').style.display = 'none';
        document.getElementById('btn-clear-slot').style.display = 'none';
        document.getElementById('tab-container').style.display = 'none';
        renderBossListGrid();
    } else {
        modalTitle.textContent = '選擇項目';
        searchInput.value = ''; currentTab = 'all';
        if (type === 'w1' || type === 'w2') {
            toggleExclusive.parentElement.style.display = 'inline-flex';
            const hero = findHero(appData[qIdx].teams[tIdx].members[mIdx]?.heroId);
            if (hero && hero.allowWeapons && hero.allowWeapons.length > 0) currentTab = hero.allowWeapons[0];
        }
        renderTabs(type); renderGrid();
    }
    modal.style.display = 'flex';
}

function closeModal() { modal.style.display = 'none'; }
function clearCurrentSlot() { selectItem(null); }

function renderTabs(type) {
    tabContainer.innerHTML = '';
    let tabs = type === 'hero' ? Object.keys(CONSTANTS.elements) : (type.startsWith('w') ? Object.keys(CONSTANTS.weaponTypes) : []);
    
    const isAllActive = currentTab === 'all';
    let html = `<button class="tab-button ${isAllActive ? 'active' : ''}" onclick="switchTab('all')" style="${isAllActive ? '' : 'color: #fff'}">全部</button>`;

    tabs.forEach(t => {
        const label = CONSTANTS.elements[t]?.label || CONSTANTS.weaponTypes[t] || t;
        const isActive = currentTab === t;
        const baseColor = CONSTANTS.elements[t]?.color || '#aaa';
        html += `<button class="tab-button ${isActive ? 'active' : ''}" onclick="switchTab('${t}')" style="${isActive ? '' : `color: ${baseColor}`}">${label}</button>`;
    });
    tabContainer.innerHTML = html;
}

function switchTab(t) { currentTab = t; renderTabs(editContext.type); renderGrid(); }

function renderGrid() {
    grid.innerHTML = '';
    const { type, qIdx, tIdx, mIdx } = editContext;
    const search = searchInput.value.toLowerCase();
    const hero = findHero(appData[qIdx].teams[tIdx].members[mIdx]?.heroId);

    let items = type === 'hero' ? DB_HEROES : (type.startsWith('w') ? DB_WEAPONS : (type === 'acc' ? DB_ACCESSORIES : DB_RELICS));
    if (type.startsWith('w') && toggleExclusive.checked && hero) items = items.filter(w => hero.exclusiveWeapons.includes(w.id));
    
    items = items.filter(i => i.name.toLowerCase().includes(search) || (i.nameEn && i.nameEn.toLowerCase().includes(search)));
    if (currentTab !== 'all') items = items.filter(i => type === 'hero' ? i.element === currentTab : i.type === currentTab);

    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'selection-grid-item';
        el.onclick = () => selectItem(item.id);

        let icon = item.icon, buffInfo = '', overlay = '';
        if (type === 'hero') {
            // 判斷當前英雄是否支援晉升或開花狀態
            const hasSixStar = item.coreStates && item.coreStates.sixStar !== null;
            const hasAscended = item.coreStates && item.coreStates.ascended !== null;           
            let stateKey = 'base';
            if (globalHeroState === 'ascended' && hasAscended) stateKey = 'ascended';
            else if (globalHeroState === 'sixStar') stateKey = hasSixStar ? 'sixStar' : (hasAscended ? 'ascended' : 'base');
            icon = getHeroIconUrl(item.id, stateKey, globalHeroStyle);
            // 確保 Buff 顯示也是對應正確的狀態
            const s = item.buffs[stateKey] || item.buffs.base;
            buffInfo = `<div class="modal-hero-buff-summary">1專:${s.ex1 ? s.ex1.text.replace(/\n/g, ' / ') : '-'}\n2專:${s.ex2 ? s.ex2.text.replace(/\n/g, ' / ') : '-'}</div>`;
            
            const c = item.chain.ex1 || item.chain;
            if (c) overlay = `<div class="hero-chain-icons"><img src="${CHAIN_IMAGES[c.start]}"><span>→</span><img src="${CHAIN_IMAGES[c.end]}"></div>`;
        }
        
        el.innerHTML = `<div class="selection-icon-container"><img src="${icon}">${overlay}</div><div class="modal-item-name">${item.name}</div>${buffInfo}`;
        grid.appendChild(el);
    });
}

function renderElementSelectionGrid() {
    grid.innerHTML = '';
    Object.entries(CONSTANTS.elements).forEach(([k, v]) => {
        const el = document.createElement('div');
        el.className = 'selection-grid-item';
        el.innerHTML = `<div class="selection-icon-container" style="background:${v.bg}"><img src="${v.icon}"></div><div class="modal-item-name" style="color:${v.color}">${v.label}</div>`;
        el.onclick = () => { appData[editContext.qIdx].element = k; saveAndRender(); closeModal(); };
        grid.appendChild(el);
    });
}

function renderBossListGrid() {
    grid.innerHTML = '';
    DB_BOSSES.forEach(b => {
        const el = document.createElement('div');
        el.className = 'selection-grid-item';
        el.innerHTML = `<div class="selection-icon-container"><img src="${b.icon}"></div><div class="modal-item-name">${b.name}</div>`;
        el.onclick = () => { appData[editContext.qIdx].bossId = b.id; saveAndRender(); closeModal(); };
        grid.appendChild(el);
    });
}

// 啟動程式
document.addEventListener('DOMContentLoaded', init);