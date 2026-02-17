/* script.js */

// ==========================================================
// 1. 變數與設定
// ==========================================================
let appData = [];
let editContext = { qIdx: 0, tIdx: 0, mIdx: 0, type: '' };
let currentTab = 'all';
let currentRarity = 'all';
let modalBossState = { step: 'element', element: null };
let globalHeroState = 'sixStar';
let globalHeroStyle = 'base';

// DOM Elements
const modal = document.getElementById('selection-modal');
const grid = document.getElementById('grid-content');
const tabContainer = document.getElementById('tab-container');
const searchInput = document.getElementById('search-input');
const toggleExclusive = document.getElementById('toggle-exclusive');
const globalStateToggleBtn = document.getElementById('global-state-toggle');
const clearSlotBtn = document.getElementById('btn-clear-slot');
const modalTitle = document.getElementById('modal-title');
const styleToggleBtn = document.getElementById('global-style-toggle');

const BUFF_PARSER_MAP = {
    '技回': 'wepRegen', '技傷': 'skillDmg', '防禦力': 'def', '生命力': 'hp',
    '爆擊率': 'crit', '爆傷': 'critDmg', '遠程防': 'rangeDef', '近戰防': 'meleeDef',
    '普屬攻': 'normalAtk', '火屬攻': 'fireAtk', '水屬攻': 'waterAtk', 
    '土屬攻': 'earthAtk', '光屬攻': 'lightAtk', '暗屬攻': 'darkAtk',
    '遠程': 'rangeAtk', '近戰': 'meleeAtk', '攻擊力': 'Atk', '一般攻': 'generalAtk',
    '遠程攻': 'rangeAtk', '近戰攻': 'meleeAtk', '護盾': 'shieldIncr' ,
	"擊殺恢復" : 'killRecover' , "受傷連鎖，攻擊力、回復力" : 'injuredAtkHealIncr'
};

const MAX_CHAIN_ROWS = 4; // 已修正: 從 3 改為 4
const MAX_CHAIN_SETS = 2;

// 修正結構：現在儲存的是 '這個連鎖槽位選了哪一個英雄的索引'
const defaultChainSlot = {
    time: '',
    // selectedIndex: -1 (未選中), 0, 1, 2, 3 (英雄在 team.members 陣列中的索引)
    selectedIndex: -1, 
};

function createDefaultChainSet() {
    return {
        presets: Array(MAX_CHAIN_ROWS).fill(null).map(() => 
            Array(4).fill(null).map(() => ({...defaultChainSlot}))
        ),
        note: '',
        activeRows: 2, 
    };
}


// ==========================================================
// 2. 輔助函式 (Helpers)
// ==========================================================

function findHero(id) { return (typeof DB_HEROES !== 'undefined' ? DB_HEROES : []).find(h => h.id === id); }
function findWeapon(id) { return (typeof DB_WEAPONS !== 'undefined' ? DB_WEAPONS : []).find(w => w.id === id); }
function findAccessory(id) { return (typeof DB_ACCESSORIES !== 'undefined' ? DB_ACCESSORIES : []).find(a => a.id === id); } 
function findRelic(id) { return (typeof DB_RELICS !== 'undefined' ? DB_RELICS : []).find(r => r.id === id); }

//英雄狀態造型路徑
function getHeroIconUrl(id, state, style) {
    const hero = findHero(id);
    let stateSuffix = '';
	
	if (state === 'ascended' && hero.coreStates && hero.coreStates.ascended !== null) {
        stateSuffix = '_Ascended';
    } else if (state === 'sixStar' && hero.coreStates && hero.coreStates.sixStar !== null) {
        stateSuffix = '_6Star';
    }

    // 造型前綴/資料夾 (決定造型)
    let stylePrefix = '';
    if (style !== 'base' && hero.styles && hero.styles.includes(style)) {
        // 假設造型圖片放在 ./images/heroes/styles/ 中，且命名為 HeroName_style.png
        return `./images/heroes/styles/${hero.nameEn}_${style}.png`; 
    }
    
    // 預設路徑 (英雄基本名稱 + 狀態後綴)
    return `./images/heroes/${hero.nameEn}${stateSuffix}.png`;
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
                 for(let k in BUFF_PARSER_MAP) {
                     if (match[1].includes(k)) type = BUFF_PARSER_MAP[k];
                 }
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

function getHeroInfo(heroData, globalState, w1Id) {
    if (!heroData) return { icon: './images/slots/hero.png', partyBuffVal: null, chain: null };

    const hasSixStar = heroData.coreStates && heroData.coreStates.sixStar !== null;
    const hasAscended = heroData.coreStates && heroData.coreStates.ascended !== null;
    
    // 決定使用哪個狀態的數據 (ascended > sixStar > base)
    let stateKey = 'base';
	
	if (globalState === 'ascended') {
        // 狀態 2: 強制晉升 (🌟)
        if (hasAscended) {
            stateKey = 'ascended';
        }
        
    } else if (globalState === 'sixStar') { 
        // 狀態 3: 智能判斷 (開花/晉升混合模式 🌸)
        if (hasSixStar) {
            stateKey = 'sixStar'; // 優先使用開花狀態
        } else if (hasAscended) {
            stateKey = 'ascended'; // 如果沒有開花，但有晉升，則使用晉升狀態
        }
    }
	
	
    
    // 傳遞 globalHeroStyle 來決定圖標
    const iconPath = getHeroIconUrl(heroData.id, stateKey, globalHeroStyle);

    const isEx2 = heroData.exclusiveWeapons && heroData.exclusiveWeapons.some(w => w.endsWith('_ex2') && w1Id === w);
    
    // 讀取對應狀態的 buffs
    const buffs = heroData.buffs[stateKey] || heroData.buffs.base;
    const activeBuff = isEx2 ? (buffs.ex2 || buffs.ex1) : buffs.ex1;
    const partyBuffVal = activeBuff && activeBuff.text ? parseBuffText(activeBuff.text) : null;

    // 讀取對應狀態的 chain (假設 ascended 也有專屬 chain 欄位)
    let chain = heroData.chain.ex1 || heroData.chain;
    if (isEx2 && heroData.chain.ex2) chain = heroData.chain.ex2;
    // 如果有 ascended 專屬 chain，則使用它 (假設命名為 chain.ascended)
    if (stateKey === 'ascended' && heroData.chain.ascended) chain = heroData.chain.ascended; 

    return { icon: iconPath, partyBuffVal, chain, stateKey }; // 返回 stateKey 供後續判斷
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
// 3. 初始化
// ==========================================================

function init() {
    if (typeof DB_BOSSES === 'undefined') { console.error("Data not loaded"); return; }
    
    const saved = localStorage.getItem('gt_raid_v21'); 
    if (saved) {
        try {
            appData = JSON.parse(saved);
            appData.forEach(q => {
                if(!q.teams) q.teams = [];
                while(q.teams.length < 1) addTeamToData(q);
                q.teams.forEach(t => {
                    if(!t.members || t.members.length < 5) {
                        const oldM = t.members || [];
                        t.members = Array(5).fill().map((_, i) => oldM[i] || { heroId: null, w1Id: null, w2Id: null, accId: null, relicId: null });
                    }
                    
                    // Migration / Initialization
                    if(!t.chainData || t.chainData.length !== MAX_CHAIN_SETS) { 
                        t.chainData = Array(MAX_CHAIN_SETS).fill(null).map(() => createDefaultChainSet());
                        t.activeChainSets = 1;
                    }
                    if(typeof t.activeChainSets !== 'number' || t.activeChainSets < 1 || t.activeChainSets > MAX_CHAIN_SETS) {
                        t.activeChainSets = 1; 
                    }
                    
                    // Validate internals and migrate old 'active' to new 'selectedIndex'
                    t.chainData.forEach(set => {
                        if (!set.presets) set.presets = createDefaultChainSet().presets;
                        if (!set.note) set.note = '';
                        if (typeof set.activeRows !== 'number' || set.activeRows > MAX_CHAIN_ROWS) {
                             set.activeRows = Math.min(2, MAX_CHAIN_ROWS);
                        }
                        
                        // Ensure 'presets' array has MAX_CHAIN_ROWS length for consistency
                        while (set.presets.length < MAX_CHAIN_ROWS) {
                            set.presets.push(Array(4).fill(null).map(() => ({...defaultChainSlot})));
                        }
                        set.presets.length = MAX_CHAIN_ROWS; 

                        set.presets.forEach(row => {
                           row.forEach(slot => {
                               if (typeof slot.active === 'boolean' || typeof slot.selectedIndex !== 'number') {
                                   slot.selectedIndex = -1; // Reset to unselected for new logic
                                   delete slot.active; // Clean up old field
                               }
                           });
                       });
                    });

                    delete t.chainTimings;
                    delete t.chainNotes;
                });
            });
        } catch(e) { appData = getEmptyData(); }
    } else {
        appData = getEmptyData();
        appData.forEach(q => { addTeamToData(q); addTeamToData(q); addTeamToData(q); });
    }
    
    if(searchInput) searchInput.addEventListener('input', renderGrid);
    if(toggleExclusive) toggleExclusive.addEventListener('change', renderGrid);
    if(globalStateToggleBtn) globalStateToggleBtn.onclick = toggleAllHeroStates;
    
    renderApp();
}

function getEmptyData() {
    const basicBosses = [
        { id: 'b_reaper', element: 'basic' }, { id: 'b_fairy', element: 'fire' },
        { id: 'b_vizier', element: 'water' }, { id: 'b_hydra', element: 'earth' }
    ];
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
function promptSave() { saveToLocal(); alert('已儲存'); }
function clearAllData() { if(confirm('重置？')) { localStorage.removeItem('gt_raid_v21'); location.reload(); }}

// ==========================================================
// 4. 渲染
// ==========================================================

function renderApp() {
    appData.forEach((qData, qIdx) => {
        const qEl = document.getElementById(`q-${qIdx}`);
        if(!qEl) return;

        const boss = DB_BOSSES.find(b => b.id === qData.bossId) || DB_BOSSES.find(b => b.element === qData.element);
        const elemData = CONSTANTS.elements[qData.element] || CONSTANTS.elements.basic;
        
        qEl.querySelector('.quadrant-header').innerHTML = `
            <div class="boss-display-wrapper" onclick="openModal(${qIdx},0,0,'boss')" style="border-color:${elemData.color}">
                <div class="boss-info-text">
                    <img src="${elemData.icon}" class="boss-attr-icon">
                    <span style="color:${elemData.color}">${elemData.label}</span>
                    <span>${boss ? boss.name : '選擇BOSS'}</span>
                </div>
            </div>
            <button onclick="addTeam(${qIdx})">+ 隊伍</button>
        `;
        
        qEl.querySelector('.team-list').innerHTML = qData.teams.map((t, tIdx) => renderTeam(t, qIdx, tIdx)).join('');
    });
	
    // 更新狀態按鈕文字 (base: 🌱, sixStar: 🌸, ascended: 🌟)
    let stateText = '🌱 基本'; 
	if (globalHeroState === 'ascended') stateText = '🌟 晉升'; 
    if (globalHeroState === 'sixStar') stateText = '🌸 最大';
    
    globalStateToggleBtn.innerText = `${stateText}`;
    
    // NEW: 更新造型按鈕文字
    if (styleToggleBtn) {
         let styleLabel = globalHeroStyle.toUpperCase();
         if (globalHeroStyle === 'april_fool') styleLabel = '愚人節';
         if (globalHeroStyle === 'supper') styleLabel = '超時';
         styleToggleBtn.innerText = `造型: ${styleLabel}`;
    }
}

function renderTeam(team, qIdx, tIdx) {
    const stats = calculateTeamBuffs(team);
    const buffText = generateBuffText(Object.entries(stats).map(([k,v]) => ({type:k, value:v})), ' | ') || '無加成';
    
    const auxHtml = renderAuxMember(team.members[4], qIdx, tIdx, 4);
    const heroesHtml = team.members.slice(0, 4).map((m, mIdx) => renderHeroMember(m, qIdx, tIdx, mIdx)).join('');
    
    let chainPanelsHtml = '';
    
    // Loop through active chain sets (1 or 2)
    for(let setIdx = 0; setIdx < team.activeChainSets; setIdx++) { 
        const chainSet = team.chainData[setIdx];
        
        let chainSetContent = '';

        // Render Chain Rows (Presets)
        for(let rowIdx = 0; rowIdx < chainSet.activeRows; rowIdx++) {
            const chainRow = chainSet.presets[rowIdx];
            
            // mIdx here is the chain slot position (0 to 3)
            const heroSlotsHtml = chainRow.map((slot, mIdx) => {
                
                const selectedHeroIndex = slot.selectedIndex; // -1, 0, 1, 2, or 3
                let iconPath = './images/slots/hero.png';
                let isSelected = selectedHeroIndex !== -1;
                let heroLabel = `H${mIdx+1} slot`;

                if (isSelected) {
                    const selectedMember = team.members[selectedHeroIndex];
                    const h = findHero(selectedMember.heroId);
                    
                    // 檢查被選中的英雄槽位是否真的有英雄
                    if (h) {
                        const info = getHeroInfo(h, globalHeroState, selectedMember.w1Id);
                        iconPath = info.icon;
                        heroLabel = h.name.substring(0, 4);
                    } else {
                        // 如果槽位空了，數據無效，視覺上視為未選中，並重設數據
                        slot.selectedIndex = -1;
                        isSelected = false;
                    }
                }
                
                return `
                    <div class="chain-step-item">
                        <div class="chain-row-icon ${!isSelected ? 'unselected' : ''}" 
                             title="${heroLabel}"
                             onclick="cycleChainSelection(${qIdx}, ${tIdx}, ${setIdx}, ${rowIdx}, ${mIdx})"> 
                            <img src="${iconPath}">
                        </div>
                        <input class="chain-time-input" value="${slot.time}" placeholder="0.0" 
                               onblur="updateChainTime(${qIdx}, ${tIdx}, ${setIdx}, ${rowIdx}, ${mIdx}, this.value)">
                    </div>
                `;
            }).join('');
            
            // 新增：刪除連鎖行按鈕 (只有在 activeRows > 1 時才顯示)
            const removeRowButtonHtml = (chainSet.activeRows > 1) ? 
                `<button class="btn-remove-chain-row" title="刪除此行" onclick="removeChainRow(${qIdx}, ${tIdx}, ${setIdx}, ${rowIdx})">x</button>` : 
                `<div style="width: 1.2rem; flex-shrink: 0;"></div>`; // 保持對齊的空白佔位符

            chainSetContent += `
                <div class="chain-steps-row-container">
                    <div class="chain-steps-row">
                        ${heroSlotsHtml}
                    </div>
                    ${removeRowButtonHtml}
                </div>
            `;
        }

        // Add Row Button
        let addRowButton = '';
        if (chainSet.activeRows < MAX_CHAIN_ROWS) {
            addRowButton = `
                <button class="btn-add-chain-step" onclick="addChainRow(${qIdx}, ${tIdx}, ${setIdx})">
                    + 連鎖 ${chainSet.activeRows + 1}
                </button>
            `;
        }
        
        chainPanelsHtml += `
            <div class="chain-set-group set-${setIdx+1}">
                <button class="btn-remove-chain-set" onclick="removeChainSet(${qIdx}, ${tIdx}, ${setIdx})">x</button>
                <div class="chain-set-content">
                    <div class="chain-timing-steps-content">
                        <div class="chain-rows-group">
                            ${chainSetContent}
                            ${addRowButton}
                        </div>
                    </div>
                    <textarea class="chain-note-input" placeholder="備註" onblur="updateChainNote(${qIdx}, ${tIdx}, ${setIdx}, this.value)">${chainSet.note}</textarea>
                </div>
            </div>
        `;
    }

    // Add Chain Set Button (Top Right)
    if (team.activeChainSets < MAX_CHAIN_SETS) {
        chainPanelsHtml += `
            <div class="btn-add-chain-set-set" onclick="addChainSet(${qIdx}, ${tIdx})">
                +
            </div>
        `;
    }
    
    return `
        <div class="team-container">
            <div class="team-header">
                <div class="team-buff-summary">隊伍 ${tIdx + 1} (${buffText})</div>
                <button class="btn-remove-team" onclick="removeTeam(${qIdx}, ${tIdx})">X</button>
            </div>
            <div class="team-content">
                <div class="member-grid">
                    ${auxHtml}
                    ${heroesHtml}
                </div>
                <div class="chain-panels-container">
                    ${chainPanelsHtml}
                </div>
            </div>
        </div>
    `;
}

function renderHeroMember(member, qIdx, tIdx, mIdx) {
    const h = findHero(member.heroId);
    const info = getHeroInfo(h, globalHeroState, member.w1Id);
    const elem = h ? CONSTANTS.elements[h.element] : CONSTANTS.elements.basic;
    
    let chainHtml = '';
    if (info.chain) {
        chainHtml = `
            <div class="hero-chain-icons">
                <img src="${CHAIN_IMAGES[info.chain.start]}">
                <span>→</span>
                <img src="${CHAIN_IMAGES[info.chain.end]}">
            </div>`;
    }

    return `
        <div class="member-container hero-container">
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

/* --- Actions --- */
function addTeam(qIdx) { addTeamToData(appData[qIdx]); saveAndRender(); }
function removeTeam(q, t) { if(confirm('刪除此隊伍?')) { appData[q].teams.splice(t,1); saveAndRender(); }}

// MODIFIED: 支援 base, sixStar, ascended 循環
function toggleAllHeroStates() { 
	if (globalHeroState === 'base') {
        globalHeroState = 'ascended'; // 進入強制晉升模式 🌟
    } else if (globalHeroState === 'ascended') {
        globalHeroState = 'sixStar'; // 進入智能判斷模式 (開花/晉升混合模式 🌸)
    } else {
        globalHeroState = 'base'; // 返回基本模式 🌱
    }
    saveAndRender();
}

// NEW: 造型切換函數
const HERO_STYLES = ['base', 'jp', 'kr', 'supper', 'april_fool'];

function toggleAllHeroStyle() {
    const currentIndex = HERO_STYLES.indexOf(globalHeroStyle);
    const nextIndex = (currentIndex + 1) % HERO_STYLES.length;
    globalHeroStyle = HERO_STYLES[nextIndex];
    saveAndRender();
}

function addChainSet(q, t) {
    const team = appData[q].teams[t];
    if (team.activeChainSets < MAX_CHAIN_SETS) {
        team.activeChainSets++;
        saveAndRender();
    }
}

function removeChainSet(q, t, setIdx) {
    const team = appData[q].teams[t];
    if (team.activeChainSets > 0) {
        team.chainData.splice(setIdx, 1);
        team.chainData.push(createDefaultChainSet()); 
        team.activeChainSets--;
        saveAndRender();
    }
}

function addChainRow(q, t, setIdx) {
    const chainSet = appData[q].teams[t].chainData[setIdx];
    if (chainSet.activeRows < MAX_CHAIN_ROWS) {
        chainSet.activeRows++;
        saveAndRender();
    }
}

function removeChainRow(q, t, setIdx, rowIdx) {
    const chainSet = appData[q].teams[t].chainData[setIdx];
    if (chainSet.activeRows > 1) {
        // 1. 刪除指定行
        chainSet.presets.splice(rowIdx, 1);
        
        // 2. 在尾部新增一個預設行，以維持陣列長度 (MAX_CHAIN_ROWS)
        chainSet.presets.push(Array(4).fill(null).map(() => ({...defaultChainSlot})));
        
        // 3. 減少活躍行數
        chainSet.activeRows--;
        
        saveAndRender();
    }
}


// 獨立循環選擇邏輯
function cycleChainSelection(q, t, setIdx, rowIdx, slotIdx) {
    const chainSlot = appData[q].teams[t].chainData[setIdx].presets[rowIdx][slotIdx];
    const members = appData[q].teams[t].members; 

    // 1. 取得所有已放置英雄的索引 (0, 1, 2, 3)
    const placedHeroIndices = [];
    for (let i = 0; i < 4; i++) {
        // 檢查英雄槽位是否非空 (有英雄)
        if (members[i].heroId !== null) {
            placedHeroIndices.push(i);
        }
    }
    
    // 如果隊伍中沒有任何英雄，則直接儲存並返回 (保持未選中)
    if (placedHeroIndices.length === 0) {
        chainSlot.selectedIndex = -1;
        saveAndRender();
        return;
    }

    // 2. 建立完整的循環序列: [未選中: -1, H1, H2, ..., Hn]
    const fullCycle = [-1, ...placedHeroIndices];
    
    // 3. 尋找當前選中的索引在循環序列中的位置
    const currentIndex = chainSlot.selectedIndex;
    let currentCycleIndex = fullCycle.indexOf(currentIndex);

    // 如果當前索引不在序列中 (例如英雄被移除後數據殘留)，則從 -1 (未選中) 開始
    if (currentCycleIndex === -1) {
        currentCycleIndex = 0; 
    }
    
    // 4. 計算下一個位置
    const nextCycleIndex = (currentCycleIndex + 1) % fullCycle.length;

    // 5. 更新選中的英雄索引
    chainSlot.selectedIndex = fullCycle[nextCycleIndex];

    saveAndRender();
}

function updateChainTime(q, t, setIdx, rowIdx, mIdx, v) {
    appData[q].teams[t].chainData[setIdx].presets[rowIdx][mIdx].time = v; 
    saveToLocal();
}

function updateChainNote(q, t, setIdx, v) {
    appData[q].teams[t].chainData[setIdx].note = v; saveToLocal();
}

/* --- Modal --- */
function openModal(qIdx, tIdx, mIdx, type) {
    editContext = { qIdx, tIdx, mIdx, type };
    
    document.getElementById('search-bar').style.display = 'flex';
    document.getElementById('btn-clear-slot').style.display = 'block';
    toggleExclusive.parentElement.style.display = 'none';
    
    if (type === 'boss') {
        modalTitle.textContent = '選擇 BOSS';
        modalBossState.step = 'element';
        document.getElementById('search-bar').style.display = 'none';
        document.getElementById('btn-clear-slot').style.display = 'none';
        renderBossModal();
    } else {
        modalTitle.textContent = '選擇項目';
        if (type === 'w1' || type === 'w2') toggleExclusive.parentElement.style.display = 'inline-flex';
        searchInput.value = '';
        currentTab = 'all';
        renderTabs(type);
        renderGrid();
    }
    modal.style.display = 'flex';
}

function selectItem(id) {
    const { qIdx, tIdx, mIdx, type } = editContext;
    const t = appData[qIdx].teams[tIdx];
    const m = t.members[mIdx];

    if (type === 'hero') {
        m.heroId = id;
        m.w1Id = null; m.w2Id = null;
        
        // 英雄槽位 (mIdx) 發生變動，必須檢查所有連鎖排程並重設
        t.chainData.forEach(set => set.presets.forEach(row => {
            row.forEach(slot => {
                 // 如果任何一個連鎖槽位選中這個位置的英雄，則必須清除選中狀態
                 if (slot.selectedIndex === mIdx) {
                    slot.selectedIndex = -1;
                    slot.time = '';
                 }
            });
        }));
        
    } else if (type === 'w1') m.w1Id = id;
    else if (type === 'w2') m.w2Id = id;
    else if (type === 'relic') m.relicId = id;
    else if (type === 'acc') m.accId = id;
    
    saveAndRender();
    closeModal();
}

function renderGrid() { 
    grid.innerHTML = '';
    const { type, qIdx, tIdx, mIdx } = editContext;
    const search = searchInput.value.toLowerCase();
    
    const member = appData[qIdx].teams[tIdx].members[mIdx];
    const hero = member && member.heroId ? findHero(member.heroId) : null;
    
    let items = [];
    if (type === 'hero') items = DB_HEROES;
    else if (type.startsWith('w')) {
        items = DB_WEAPONS;
        if (toggleExclusive.checked && hero) items = items.filter(w => hero.exclusiveWeapons.includes(w.id));
    } else if (type === 'acc') items = DB_ACCESSORIES;
    else if (type === 'relic') items = DB_RELICS;

    items = items.filter(i => i.name.toLowerCase().includes(search) || (i.nameEn && i.nameEn.toLowerCase().includes(search)));
	
	if (currentTab !== 'all') {
        if (type === 'hero') {
            // 英雄篩選：根據 element (元素/屬性)
            items = items.filter(i => i.element === currentTab);
        } else if (type.startsWith('w')) {
            // 武器篩選：根據 type (武器類型)
            // 假設 DB_WEAPONS 項目中有 'type' 欄位
            items = items.filter(i => i.type === currentTab);
        }
    }

    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'selection-grid-item';
        el.onclick = () => selectItem(item.id);
        
        let icon = item.icon;
        let buffInfo = '';
        let overlay = '';

        if (type === 'hero') {
            const previewState = (globalHeroState==='sixStar' && item.coreStates && item.coreStates.sixStar) ? 'sixStar' : 'base';
            icon = getHeroIconUrl(item.id, previewState);
            const s = item.buffs[previewState] || item.buffs.base;
            const t1 = s.ex1 ? s.ex1.text.replace(/\n/g, ' / ') : '-';
            const t2 = s.ex2 ? s.ex2.text.replace(/\n/g, ' / ') : '-';
            buffInfo = `<div class="modal-hero-buff-summary">1專:${t1}\n2專:${t2}</div>`;
            const c = item.chain.ex1 || item.chain;
            if(c) overlay = `<div class="hero-chain-icons"><img src="${CHAIN_IMAGES[c.start]}"><span>→</span><img src="${CHAIN_IMAGES[c.end]}"></div>`;
        } else if (type.startsWith('w')) {
            icon = getWeaponIconUrl(item.id);
            if(hero && hero.chain) {
                const isEx2 = item.id.endsWith('_ex2');
                const c = isEx2 && hero.chain.ex2 ? hero.chain.ex2 : hero.chain.ex1;
                if(c) overlay = `<div class="weapon-chain-overlay"><img src="${CHAIN_IMAGES[c.end]}"></div>`;
            }
        }
        el.innerHTML = `<div class="selection-icon-container"><img src="${icon}">${overlay}</div><div class="modal-item-name">${item.name}</div>${buffInfo}`;
        grid.appendChild(el);
    });
}

// NEW: 渲染屬性選擇網格
function renderElementSelectionGrid() {
    grid.innerHTML = '';
    
    Object.entries(CONSTANTS.elements).forEach(([k,v]) => {
        const el = document.createElement('div');
        el.className = 'selection-grid-item';
        el.innerHTML = `<div class="selection-icon-container" style="background:${v.bg}"><img src="${v.icon}"></div><div class="modal-item-name" style="color:${v.color}">${v.label}</div>`;
        
        // 點擊屬性時的處理邏輯
        el.onclick = () => { 
            // 1. 設定象限屬性
            appData[editContext.qIdx].element = k; 
            // 2. 儲存並渲染主畫面 (更新象限顏色)
            saveAndRender(); 
            // 3. 關閉當前屬性選擇模態視窗
            closeModal();
            // 4. 立即開啟 BOSS 選擇模態視窗
            openModal(editContext.qIdx, editContext.tIdx, editContext.mIdx, 'boss-list');
        };
        grid.appendChild(el);
    });
}

// NEW: 渲染純 BOSS 列表網格
function renderBossListGrid() {
    grid.innerHTML = '';
    
    DB_BOSSES.forEach(b => {
        const el = document.createElement('div');
        el.className = 'selection-grid-item';
        
        // 由於 BOSS 無屬性，這裡只顯示 BOSS 名稱
        el.innerHTML = `
            <div class="selection-icon-container">
                <img src="${b.icon}">
            </div>
            <div class="modal-item-name">${b.name}</div>
        `;
        
        el.onclick = () => {
            // 只設定 BOSS ID
            appData[editContext.qIdx].bossId = b.id;
            // appData[editContext.qIdx].element 保持在第一步選定的值
            saveAndRender();
            closeModal();
        };
        grid.appendChild(el);
    });
}


// MODIFIED: renderBossModal (現在只負責開啟屬性選擇)
function renderBossModal() {
    // 檢查象限是否已有屬性。如果沒有，則進入屬性選擇階段
    // 如果已有屬性，則直接進入 BOSS 選擇 (理論上不應該，但作為備用)
    if (!appData[editContext.qIdx].element) {
        renderElementSelectionGrid();
    } else {
        renderElementSelectionGrid(); // 總是從屬性開始，讓用戶有機會重新選擇屬性
        // 為了簡單和保持一致性，我們讓 BossModal 總是從屬性選擇開始。
        // 用戶點擊屬性後會進入 BossList Modal。
    }
}


// MODIFIED: openModal 支援新的 'boss-list' 類型
function openModal(qIdx, tIdx, mIdx, type) {
    editContext = { qIdx, tIdx, mIdx, type };
    
    document.getElementById('search-bar').style.display = 'flex';
    document.getElementById('btn-clear-slot').style.display = 'block';
    toggleExclusive.parentElement.style.display = 'none';
    
    if (type === 'boss') {
        // 初始點擊 '選擇BOSS' 按鈕時，只顯示屬性選擇
        modalTitle.textContent = '選擇屬性';
        document.getElementById('search-bar').style.display = 'none';
        document.getElementById('btn-clear-slot').style.display = 'none';
        renderBossModal(); // 這裡現在只渲染屬性列表 (renderElementSelectionGrid)
    } else if (type === 'boss-list') {
        // 從屬性選擇跳轉過來，顯示所有 BOSS 列表
        modalTitle.textContent = '選擇 BOSS';
        document.getElementById('search-bar').style.display = 'none';
        document.getElementById('btn-clear-slot').style.display = 'none';
        renderBossListGrid(); // 渲染所有 BOSS 列表
    } else {
        modalTitle.textContent = '選擇項目';
        if (type === 'w1' || type === 'w2') toggleExclusive.parentElement.style.display = 'inline-flex';
        searchInput.value = '';
        currentTab = 'all';
        renderTabs(type);
        renderGrid();
    }
    modal.style.display = 'flex';
}


function renderTabs(type) {
    tabContainer.innerHTML = '';
    let tabs = [];
    if(type === 'hero') tabs = Object.keys(CONSTANTS.elements);
    if(type.startsWith('w')) tabs = Object.keys(CONSTANTS.weaponTypes);
    let html = `<button class="tab-button ${currentTab==='all'?'active':''}" onclick="switchTab('all')">全部</button>`;
    tabs.forEach(t => {
        const label = CONSTANTS.elements[t]?.label || CONSTANTS.weaponTypes[t] || t;
        const color = CONSTANTS.elements[t]?.color || '#fff';
        html += `<button class="tab-button ${currentTab===t?'active':''}" onclick="switchTab('${t}')" style="color:${color}">${label}</button>`;
    });
    tabContainer.innerHTML = html;
}
function switchTab(t) { currentTab = t; renderGrid(); }
function closeModal() { modal.style.display = 'none'; }
function clearCurrentSlot() { selectItem(null); }
function exportData() {
    const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData));
    const a = document.createElement('a'); a.href = str; a.download = "raid_v22.json";
    document.body.appendChild(a); a.click(); a.remove();
}
function importData(input) {
    const file = input.files[0]; if(!file)return;
    const reader = new FileReader();
    reader.onload = (e) => { try{ appData=JSON.parse(e.target.result); saveAndRender(); }catch(x){alert('Error');} };
    reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', init);