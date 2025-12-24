/* data.js */

const CHAIN_IMAGES = {
    injured: './images/chains/injured.png',
    downed: './images/chains/downed.png',
    airborne: './images/chains/airborne.png',
    all: './images/chains/all.png'
};

const CHAIN_NAMES = { injured: '受傷', downed: '消沉', airborne: '滯空', all: '任意' };

const DB_HEROES = [
    { 
        id: 'h1', name: '普莉菲斯', nameEn: 'Plitvice', element: 'fire', rarity: 'unique',
        chain: { 
			ex1: { start: 'injured', end: 'downed' },
			ex2: { start: 'downed', end: 'airborne' }
		}, 
        allowWeapons: ['1h_sword', '2h_sword'], 
        exclusiveWeapons: ['w001', 'w001_ex2'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '火屬攻+50%' }, ex2: { text: '爆傷+100%' } },
            sixStar: { ex1: { text: '火屬攻+50%' }, ex2: { text: '爆傷+100%' } }
        }
    },
    { 
        id: 'h2', name: '拉碧絲', nameEn: 'Lapice', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' }, ex2: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['1h_sword', '2h_sword'], exclusiveWeapons: ['w002', 'w002_ex2'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '光屬攻+50%' }, ex2: { text: '近戰攻+50%' } },
            sixStar: { ex1: { text: '光屬攻+50%' }, ex2: { text: '近戰攻+50%' } }
        }
    },
    { 
        id: 'h3', name: '瑪麗娜', nameEn: 'Marina', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'injured' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w003'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '生命力+40%' } },
            sixStar: { ex1: { text: '光屬攻+50%' } } // 這裡原文似乎有誤(光屬攻?)，保留原樣
        }
    },
    { 
        id: 'h4', name: '阿拉貝爾', nameEn: 'Arabelle', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w004'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '暗屬攻+50%' } },
            sixStar: { ex1: { text: '暗屬攻+55%' } }
        }
    },
    { 
        id: 'h5', name: '偶像伊娃', nameEn: 'IdolCaptain Eva', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w005'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '普屬攻+50%' } },
            sixStar: { ex1: { text: '普屬攻+55%' } }
        }
    },
    { 
        id: 'h6', name: '芭莉', nameEn: 'Bari', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' }, ex2: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w006', 'w006_ex2'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '技傷+90%' }, ex2: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '技傷+90%' }, ex2: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h7', name: '瑞皮娜', nameEn: 'Lupina', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w007'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h8', name: '蘭兒', nameEn: 'Lahn', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'injured' }, ex2: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['gauntlet' ,'basket'], exclusiveWeapons: ['w008' , 'w008_ex2'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '生命力+40%' }, ex2: { text: '技傷+90%' } },
            sixStar: { ex1: { text: '生命力+40%' }, ex2: { text: '技傷+90%' } }
        }
    },
    { 
        id: 'h9', name: '尤金', nameEn: 'Eugene', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'injured' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w009'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰攻+50%' } },
            sixStar: { ex1: { text: '近戰攻+50%' } }
        }
    },
    { 
        id: 'h10', name: '蒂尼亞', nameEn: 'Tinia', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['bow'], exclusiveWeapons: ['w010'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程攻+50%' } },
            sixStar: { ex1: { text: '遠程攻+50%' } }
        }
    },
    { 
        id: 'h11', name: '比什巴赫', nameEn: 'Vishuvac', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'injured' }, ex2: { start: 'all', end: 'airborne' } }, 
        allowWeapons: ['claw' , 'gauntlet'], exclusiveWeapons: ['w011' , 'w011_ex2'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '生命+40%' }, ex2: { text: '爆傷+100%' } },
            sixStar: { ex1: { text: '生命+40%' }, ex2: { text: '爆傷+100%' } }
        }
    },
    { 
        id: 'h12', name: '奈里', nameEn: 'Nari', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w012'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程攻+50%' } },
            sixStar: { ex1: { text: '遠程攻+50%' } }
        }
	},
    { 
        id: 'h13', name: '比安卡', nameEn: 'Bianca', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w013'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%\n爆傷+20%' } }
        }
    },
    { 
        id: 'h14', name: '奧格瑪', nameEn: 'Oghma', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' }, ex2: { start: 'airborne', end: 'injured' } }, 
        allowWeapons: ['1h_sword' , 'rifle'], exclusiveWeapons: ['w014' , 'w014_ex2'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '防禦力+45%' }, ex2: { text: '技傷+90%' } },
            sixStar: { ex1: { text: '防禦力+45%' }, ex2: { text: '技傷+90%' } }
        }
    },
    { 
        id: 'h15', name: '阿列夫', nameEn: 'Alef', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w015'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程防+80%' } },
            sixStar: { ex1: { text: '遠程防+80%' } }
        }
	},
    { 
        id: 'h16', name: '米雅', nameEn: 'Miya', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w016'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '技傷+90%' } },
            sixStar: { ex1: { text: '技傷+90%' } }
        }
	},
    { 
        id: 'h17', name: '未來公主', nameEn: 'FuturePrincess', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w017'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '生命力+40%' } },
            sixStar: { ex1: { text: '生命力+40%' } }
        }
	},
    { 
        id: 'h18', name: '加拉姆', nameEn: 'Garam', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' }, ex2: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w018','w018_ex2'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '水屬攻+50%' }, ex2: { text: '技回+30%\n技傷+30%' } },
            sixStar: { ex1: { text: '水屬攻+50%' }, ex2: { text: '技回+30%\n技傷+30%' } }
        }
	},
    { 
        id: 'h19', name: '貝斯', nameEn: 'Beth', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w019'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '近戰攻+50%' } },
            sixStar: { ex1: { text: '近戰攻+55%' } }
        }
    },
    { 
        id: 'h20', name: '魯', nameEn: 'Rue', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' }, ex2: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['rifle' , '2h_sword'], exclusiveWeapons: ['w020','w020_ex2'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '土屬攻+50%' }, ex2: { text: '土屬攻+50%' } },
            sixStar: { ex1: { text: '土屬攻+50%' }, ex2: { text: '土屬攻+50%' } }
        }
	},
    { 
        id: 'h21', name: '加百列', nameEn: 'Gabriel', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'injured' } }, 
        allowWeapons: ['bow'], exclusiveWeapons: ['w021'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%\n爆傷+20%' } }
        }
    },
    { 
        id: 'h22', name: '琳恩', nameEn: 'Lynn', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w022'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰攻+50%' } },
            sixStar: { ex1: { text: '近戰攻+50%' } }
        }
    },
    { 
        id: 'h23', name: '未來騎士', nameEn: 'FutureKnight', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' }, ex2: { start: 'airborne', end: 'injured' } }, 
        allowWeapons: ['rifle', '2h_sword'], exclusiveWeapons: ['w023' , 'w023_ex2'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '技回+30%\n技傷+30%' }, ex2: { text: '防禦力+45%' } },
            sixStar: { ex1: { text: '技回+30%\n技傷+30%' }, ex2: { text: '防禦力+45%' } }
        }
    },
    { 
        id: 'h24', name: '維洛妮卡', nameEn: 'Veronica', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w024'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '技傷+90%' } },
            sixStar: { ex1: { text: '技傷+90%' } }
        }
    },
    { 
        id: 'h25', name: '諾克西亞', nameEn: 'Noxia', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'airborne' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w025'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '生命力+40%' } },
            sixStar: { ex1: { text: '生命力+40%' } }
        }
    },
    { 
        id: 'h26', name: '梅麗爾', nameEn: 'Mayreel', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['claw'], exclusiveWeapons: ['w026'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h27', name: 'MK.99', nameEn: 'MK99', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w027'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程攻+50%' } },
            sixStar: { ex1: { text: '遠程攻+50%' } }
        }
    },
    { 
        id: 'h28', name: '莉莉絲', nameEn: 'Lilith', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['claw'], exclusiveWeapons: ['w028'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰攻+50%' } },
            sixStar: { ex1: { text: '近戰攻+50%' } }
        }
    },
    { 
        id: 'h29', name: '露西', nameEn: 'Lucy', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w029'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%\n爆傷+20%' } }
        }
    },
    { 
        id: 'h30', name: '蘇熙', nameEn: 'BeachSohee', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w030'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰攻+50%' } },
            sixStar: { ex1: { text: '近戰攻+50%' } }
        }
    },
    { 
        id: 'h31', name: '優姬', nameEn: 'BeachYuze', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w031'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '技回+30%\n技傷+30%' } },
            sixStar: { ex1: { text: '技回+30%\n技傷+30%' } }
        }
    },
    { 
        id: 'h32', name: '艾莉諾', nameEn: 'Eleanor', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['bow'], exclusiveWeapons: ['w032'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '技傷+45%\n光屬攻+25%' } },
            sixStar: { ex1: { text: '技傷+45%\n光屬攻+25%' } }
        }
    },
    { 
        id: 'h33', name: '辛緹拉', nameEn: 'Scintilla', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w033'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰攻+50%' } },
            sixStar: { ex1: { text: '近戰攻+50%' } }
        }
    },
    { 
        id: 'h34', name: '艾麗娜', nameEn: 'Erina', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w034'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '防禦力+45%' } },
            sixStar: { ex1: { text: '防禦力+45%' } }
        }
    },
    { 
        id: 'h35', name: '卡瑪爾', nameEn: 'Kamael', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'injured' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w035'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '遠程攻+50%' } },
            sixStar: { ex1: { text: '遠程攻+55%' } }
        }
    },
    { 
        id: 'h36', name: 'MK.2', nameEn: 'MK2', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'injured' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w036'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h37', name: '奧爾卡', nameEn: 'Orca', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w037'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '遠程攻+50%' } },
            sixStar: { ex1: { text: '遠程攻+55%' } }
        }
    },
    { 
        id: 'h38', name: '卡娜', nameEn: 'Kanna', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w038'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '普屬攻+50%' } },
            sixStar: { ex1: { text: '普屬攻+50%' } }
        }
    },
    { 
        id: 'h39', name: '漢娜', nameEn: 'Hana', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w039'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h40', name: '卡蘿', nameEn: 'Carol', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w040'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h41', name: '克拉拉', nameEn: 'Clara', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'injured' } }, 
        allowWeapons: ['bow'], exclusiveWeapons: ['w041'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '遠程攻+50%' } },
            sixStar: { ex1: { text: '遠程攻+55%' } }
        }
    },
    { 
        id: 'h42', name: '帕爾瓦蒂', nameEn: 'Parvati', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w042'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h43', name: '普利希拉', nameEn: 'Priscilla', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w043'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '護盾+40%' } },
            sixStar: { ex1: { text: '護盾+40%' } }
        }
    },
    { 
        id: 'h44', name: '克勞德', nameEn: 'Claude', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w044'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程攻+50%' } },
            sixStar: { ex1: { text: '遠程攻+50%' } }
        }
    },
    { 
        id: 'h45', name: '亞拉', nameEn: 'Ara', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w045'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '生命力+40%' } },
            sixStar: { ex1: { text: '生命力+40%' } }
        }
    },
    { 
        id: 'h46', name: '蕾伊', nameEn: 'Rey', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w046'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h47', name: 'AA.72', nameEn: 'AA72', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w047'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%\n爆傷+20%' } }
        }
    },
    { 
        id: 'h48', name: '蘿蘭茵', nameEn: 'SummerLoraine', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w048'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程攻+50%' } },
            sixStar: { ex1: { text: '遠程攻+50%' } }
        }
    },
    { 
        id: 'h49', name: '瘋狂熊貓三重奏', nameEn: 'MadPandaTrio', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w049'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰攻+50%' } },
            sixStar: { ex1: { text: '近戰攻+50%' } }
        }
    },
    { 
        id: 'h50', name: '克羅姆小姐', nameEn: 'MissChrome', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w050'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h51', name: '瓦倫西亞', nameEn: 'Valencia', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w051'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆傷+100%' } },
            sixStar: { ex1: { text: '爆傷+100%' } }
        }
    },
    { 
        id: 'h52', name: '克羅賽爾', nameEn: 'Croselle', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w052'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '生命力+40%' } },
            sixStar: { ex1: { text: '生命力+40%' } }
        }
    },
    { 
        id: 'h53', name: '安德拉斯', nameEn: 'Andras', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w053'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程攻+50%' } },
            sixStar: { ex1: { text: '遠程攻+50%' } }
        }
    },
    { 
        id: 'h54', name: '菫', nameEn: 'Sumire', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w054'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h55', name: '派蒙', nameEn: 'Pymon', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w055'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '防禦力+45%' } },
            sixStar: { ex1: { text: '防禦力+45%' } }
        }
    },
    { 
        id: 'h56', name: '蘿賽塔', nameEn: 'Rosetta', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w056'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '一般攻+55%\n技傷+30%' } },
            sixStar: { ex1: { text: '一般攻+55%\n技傷+30%' } }
        }
    },
    { 
        id: 'h57', name: '白色小孩', nameEn: 'WhiteSnow', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'injured' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w057'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰傷+50%' } },
            sixStar: { ex1: { text: '近戰傷+50%' } }
        }
    },
    { 
        id: 'h58', name: '卡蜜', nameEn: 'CorpsCommander', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w058'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h59', name: '卡登', nameEn: 'Kai', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w059'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '一般攻+55%\n技傷+30%' } },
            sixStar: { ex1: { text: '一般攻+55%\n技傷+30%' } }
        }
    },
    { 
        id: 'h60', name: '千慮', nameEn: 'Chun Ryeo', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w060'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程攻+50%' } },
            sixStar: { ex1: { text: '遠程攻+50%' } }
        }
    },
    { 
        id: 'h61', name: '亞美莉絲', nameEn: 'Ameris', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['claw'], exclusiveWeapons: ['w061'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '土屬攻+50%' } },
            sixStar: { ex1: { text: '土屬攻+50%' } }
        }
    },
    { 
        id: 'h62', name: '矽雅', nameEn: 'Sia', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w062'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '技傷+45%\n攻擊力20%' } },
            sixStar: { ex1: { text: '技傷+45%\n攻擊力20%' } }
        }
    },
    { 
        id: 'h63', name: '愛彌', nameEn: 'BeachAmy', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w063'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h64', name: '銀荷', nameEn: 'Eunha', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w064'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '遠程傷+50%' } },
            sixStar: { ex1: { text: '遠程傷+55%' } }
        }
    },
    { 
        id: 'h65', name: '夏碧拉', nameEn: 'BeachShapira', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w065'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '光屬攻+50%' } },
            sixStar: { ex1: { text: '光屬攻+50%' } }
        }
    },
    { 
        id: 'h66', name: '莫里安', nameEn: 'Morrian', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w066'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '護盾+40%' } },
            sixStar: { ex1: { text: '護盾+40%' } }
        }
    },
    { 
        id: 'h67', name: '碧內特', nameEn: 'Vinette', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w067'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '技回+30%\n技傷+30%' } },
            sixStar: { ex1: { text: '技回+30%\n技傷+30%' } }
        }
    },
    { 
        id: 'h68', name: '雲苓', nameEn: 'WinLing', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w068'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '火屬攻+50%' } },
            sixStar: { ex1: { text: '火屬攻+50%' } }
        }
    },
    { 
        id: 'h69', name: '奧迪勒', nameEn: 'Odile', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['claw'], exclusiveWeapons: ['w069'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '防禦力+45%' } },
            sixStar: { ex1: { text: '防禦力+45%' } }
        }
    },
    { 
        id: 'h70', name: '米可', nameEn: 'Mikke', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w070'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰傷+50%' } },
            sixStar: { ex1: { text: '近戰傷+50%' } }
        }
    },
    { 
        id: 'h71', name: '安潔', nameEn: 'Angie', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w071'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰傷+50%' } },
            sixStar: { ex1: { text: '近戰傷+50%' } }
        }
    },
    { 
        id: 'h72', name: '瘟疫醫生', nameEn: 'PlagueDoctor', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w072'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '一般攻+55%\n技傷+30%' } },
            sixStar: { ex1: { text: '一般攻+55%\n技傷+30%' } }
        }
    },
    { 
        id: 'h73', name: '幽娜', nameEn: 'Yuna', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['bow'], exclusiveWeapons: ['w073'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '技傷+45%\n攻擊力+20%' } },
            sixStar: { ex1: { text: '技傷+45%\n攻擊力+20%' } }
        }
    },
    { 
        id: 'h74', name: '愛斯泰爾', nameEn: 'Estel', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['bow'], exclusiveWeapons: ['w074'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '技回+30%\n技傷+30%' } },
            sixStar: { ex1: { text: '技回+30%\n技傷+30%' } }
        }
    },
    { 
        id: 'h75', name: '托卡', nameEn: 'Toga', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w076'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h76', name: '沄', nameEn: 'Yun', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w076'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h77', name: '珂兒芮', nameEn: 'Cornet', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w077'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '光屬攻+50%' } },
            sixStar: { ex1: { text: '光屬攻+50%' } }
        }
    },
    { 
        id: 'h78', name: '蕾娜', nameEn: 'Lena', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w078'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '防禦力+45%' } },
            sixStar: { ex1: { text: '防禦力+45' } }
        }
    },
    { 
        id: 'h79', name: '多彬', nameEn: 'Dabin', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w079'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%\n爆傷+20%' } }
        }
    },
    { 
        id: 'h80', name: '瑞秋', nameEn: 'Rachel_Beach Racer', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'injured' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w080'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '防禦力+45%' } },
            sixStar: { ex1: { text: '防禦力+45%' } }
        }
    },
    { 
        id: 'h81', name: '莎雅', nameEn: 'Saya', element: 'fire', rarity: 'unique', 
		chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w081'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰傷+50%' } },
            sixStar: { ex1: { text: '近戰傷+50%' } }
        }
    },
    { 
        id: 'h82', name: '安娜', nameEn: 'Anna', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w082'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '技回+30%\n技傷30%' } },
            sixStar: { ex1: { text: '防禦力+45' } }
        }
    },
    { 
        id: 'h83', name: '璐麗', nameEn: 'Ruri', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w083'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程攻+50%' } },
            sixStar: { ex1: { text: '遠程攻+50%' } }
        }
    },
    { 
        id: 'h84', name: '桃花', nameEn: 'Dohwa', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w084'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '普屬攻+50%' } },
            sixStar: { ex1: { text: '普屬攻+50%' } }
        }
    },
    { 
        id: 'h85', name: '棗', nameEn: 'Natsume', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w085'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h86', name: '塔莎', nameEn: 'Tasha', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w086'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰傷+50%' } },
            sixStar: { ex1: { text: '近戰傷+50%' } }
        }
    },
    { 
        id: 'h87', name: '妮芙堤', nameEn: 'Nifty', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w087'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '遠程傷+50%' } },
            sixStar: { ex1: { text: '遠程傷+50%' } }
        }
    },
    { 
        id: 'h88', name: '亞美莉絲', nameEn: 'Ameris_Chocolate Collector', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w088'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆傷+100%' } },
            sixStar: { ex1: { text: '爆傷+100%' } }
        }
    },
    { 
        id: 'h89', name: '基魯加斯', nameEn: 'Girgas_Sweet Troublemaker', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w089'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%' } }
        }
    },
    { 
        id: 'h90', name: '卡莉', nameEn: 'Callie', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w090'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%\n爆傷+20%' } }
        }
    },
    { 
        id: 'h91', name: '小滿', nameEn: 'Xiaoman', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w091'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '近戰傷+50%' } },
            sixStar: { ex1: { text: '近戰傷+55%' } }
        }
    },
    { 
        id: 'h92', name: 'J', nameEn: 'J', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['bow'], exclusiveWeapons: ['w092'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '一般攻+55%\n技傷+30%' } },
            sixStar: { ex1: { text: '一般攻+60%\n技傷+35%' } }
        }
    },
    { 
        id: 'h93', name: '黛西', nameEn: 'Daisy', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w093'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '防禦力+45%' } },
            sixStar: { ex1: { text: '防禦力+45%' } }
        }
    },
    { 
        id: 'h94', name: '麗', nameEn: 'Beach Cleanup Hitter Rie', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w094'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '生命力+40%' } },
            sixStar: { ex1: { text: '生命力+45%' } }
        }
    },
    { 
        id: 'h95', name: '蘭迪', nameEn: 'Randi', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w095'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '遠程傷+50%' } },
            sixStar: { ex1: { text: '遠程傷+55%' } }
        }
    },
    { 
        id: 'h96', name: '克露希埃', nameEn: 'Chriselle', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w096'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '生命力+40%' } },
            sixStar: { ex1: { text: '生命力+45%' } }
        }
    },
    { 
        id: 'h97', name: '卡洛兒', nameEn: 'Kahlor', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'downed' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w097'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '爆擊率+40%' } },
            sixStar: { ex1: { text: '爆擊率+40%\n爆傷+20%' } }
        }
    },
    { 
        id: 'h98', name: '伊露妮', nameEn: 'Illuni', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w098'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '技回+30%\n技傷+30%' } },
            sixStar: { ex1: { text: '技回+30%\n技傷+50%' } }
        }
    },
    { 
        id: 'h99', name: '若藻', nameEn: 'Wakamo', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w099'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '水屬攻+50%' } },
            sixStar: { ex1: { text: '水屬攻+55%' } }
        }
    },
    { 
        id: 'h100', name: '遙', nameEn: 'Haruka', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w100'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '近戰傷+50%' } },
            sixStar: { ex1: { text: '近戰傷+55%' } }
        }
    },
	{ 
        id: 'h131', name: '諾艾爾', nameEn: 'Noel', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w131'], 
        coreStates: { base: {}, ascended: null, sixStar: {} },
        buffs: {
            base: { ex1: { text: '技回+30%\n技傷+30%' } },
            sixStar: { ex1: { text: '技回+30%\n技傷+50%' } }
        }
    },
    { 
        id: 's1', name: '莉娜', nameEn: 'Lina', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['s001'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '遠程攻+50%' } } }
    },
    { 
        id: 's2', name: '高里', nameEn: 'Gourry', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['s002'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '近戰攻+50%' } } }
    },
    { 
        id: 's3', name: '傑洛士', nameEn: 'Xelloss', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['s003'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '技回+30%\n技傷+30%' } } }
    },
    { 
        id: 's4', name: '達伊', nameEn: 'Dai', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['s004'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '爆擊率+40%' } } }
    },
    { 
        id: 's5', name: '瑪姆', nameEn: 'Maam', element: 'earth', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['s005'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '生命力+40%' } } }
    },
    { 
        id: 's6', name: '波普', nameEn: 'Popp', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['s006'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '遠程攻+50%' } } }
    },
    { 
        id: 's7', name: '利姆露', nameEn: 'RimuruTempest', element: 'water', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'injured' } }, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['s007'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '近戰攻+50%' } } }
    },
    { 
        id: 's8', name: '朱菜', nameEn: 'Shuna', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'all', end: 'downed' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['s008'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '技回+30%\n技傷+30%' } } }
    },
    { 
        id: 's9', name: '米莉姆', nameEn: 'MilimNava', element: 'dark', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'injured' } }, 
        allowWeapons: ['claw'], exclusiveWeapons: ['s009'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '近戰攻+50%' } } }
    },
    { 
        id: 's10', name: '芙莉蓮', nameEn: 'Frieren', element: 'light', rarity: 'unique',
        chain: { ex1: { start: 'downed', end: 'airborne' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['s010'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '遠程攻+50%' } } }
    },
    { 
        id: 's11', name: '修塔爾克', nameEn: 'Stark', element: 'fire', rarity: 'unique',
        chain: { ex1: { start: 'injured', end: 'airborne' } }, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['s011'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '防禦力+45%' } } }
    },
    { 
        id: 's12', name: '費倫', nameEn: 'Fern', element: 'basic', rarity: 'unique',
        chain: { ex1: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['staff'], exclusiveWeapons: ['s012'], 
        coreStates: { base: {}, ascended: null, sixStar: null },
        buffs: { base: { ex1: { text: '技傷+90%' } } }
    },
    { 
        id: 'h101', name: '女騎士', nameEn: 'Female Knight', element: 'basic', rarity: 'rare',
        chain: { ex1: { start: 'airborne', end: 'downed' } ,ex2: { start: 'airborne', end: 'downed' } }, 
        allowWeapons: ['1h_sword' , '2h_sword' , 'bow' , 'rifle'], exclusiveWeapons: ['w101' , 'w101_ex2'], 
        coreStates: { base: {}, ascended: {} , sixStar: {} },
        buffs: {
            base: { ex1: { text: '攻擊力+36%\n普屬攻+10%' } , ex2: { text: '普屬攻+46%' }},
			ascended: { ex1: { text: '攻擊力+50%' } , ex2: { text: '普屬攻+46%' } },
            sixStar: { ex1: { text: '攻擊力+50%' } , ex2: { text: '普屬攻+54%' } }
        }
    },
    { 
        id: 'h102', name: '伊娃', nameEn: 'Eva', element: 'light', rarity: 'rare',
        chain: { ex1: { start: 'airborne', end: 'downed' }}, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w102'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '防禦力+22%\n光屬攻+22%' } },
			ascended: { ex1: { text: '防禦力+22%\n光屬攻+22%' } },
            sixStar: { ex1: { text: '防禦力+22%\n光屬攻+22%' } }
        }
    },
    { 
        id: 'h103', name: '艾薇拉', nameEn: 'Elvira', element: 'fire', rarity: 'rare',
        chain: { ex1: { start: 'airborne', end: 'injured' }}, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w103'], 
        coreStates: { base: {}, ascended: {} , sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程攻+48%' } },
			ascended: { ex1: { text: '遠程攻+52%' } },
            sixStar: { ex1: { text: '遠程攻+52%' } }
        }
    },
    { 
        id: 'h104', name: '白獸', nameEn: 'WhiteBeast', element: 'water', rarity: 'rare',
        chain: { ex1: { start: 'injured', end: 'airborne' }}, 
        allowWeapons: ['claw'], exclusiveWeapons: ['w104'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '水屬攻+48%' } },
			ascended: { ex1: { text: '水屬攻+52%' } },
            sixStar: { ex1: { text: '水屬攻+52%' } }
        }
    },
    { 
        id: 'h105', name: '卡麗娜', nameEn: 'Karina', element: 'dark', rarity: 'rare',
        chain: { ex1: { start: 'downed', end: 'injured' }}, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w105'], 
        coreStates: { base: {}, ascended: {} , sixStar: null },
        buffs: {
            base: { ex1: { text: '暗屬攻+40%\n擊殺恢復+3%' } },
			ascended: { ex1: { text: '暗屬攻+46%\n擊殺恢復+5%' } },
            sixStar: { ex1: { text: '暗屬攻+46%\n擊殺恢復+5%' } }
        }
    },
    { 
        id: 'h106', name: '蘿蘭茵', nameEn: 'Loraine', element: 'basic', rarity: 'rare',
        chain: { ex1: { start: 'all', end: 'injured' }}, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w106'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '護盾+36%' } },
			ascended: { ex1: { text: '護盾+36%' } },
            sixStar: { ex1: { text: '護盾+36%' } }
        }
    },
    { 
        id: 'h107', name: '拉葳', nameEn: 'Lavi', element: 'fire', rarity: 'rare',
        chain: { ex1: { start: 'downed', end: 'airborne' }}, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w107'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '防禦力+48%' } },
			ascended: { ex1: { text: '防禦力+48%' } },
            sixStar: { ex1: { text: '防禦力+48%' } }
        }
    },
    { 
        id: 'h108', name: '法葳', nameEn: 'Favi', element: 'water', rarity: 'rare',
        chain: { ex1: { start: 'all', end: 'injured' }}, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w108'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '受傷連鎖，攻擊力、回復力+240%' } },
			ascended: { ex1: { text: '受傷連鎖，攻擊力、回復力+240%' } },
            sixStar: { ex1: { text: '受傷連鎖，攻擊力、回復力+240%' } }
        }
    },
    { 
        id: 'h109', name: '奧芭', nameEn: 'Aoba', element: 'earth', rarity: 'rare',
        chain: { ex1: { start: 'all', end: 'downed' }}, 
        allowWeapons: ['bow'], exclusiveWeapons: ['w109'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '土屬攻+45%' } },
			ascended: { ex1: { text: '土屬攻+45%' } },
            sixStar: { ex1: { text: '土屬攻+45%' } }
        }
    },
    { 
        id: 'h110', name: '葛蕾茉莉', nameEn: 'Gremory', element: 'dark', rarity: 'rare',
        chain: { ex1: { start: 'all', end: 'airborne' }}, 
        allowWeapons: ['basket'], exclusiveWeapons: ['w110'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '技傷+80%' } },
			ascended: { ex1: { text: '技傷+80%' } },
            sixStar: { ex1: { text: '技傷+80%' } }
        }
    },
    { 
        id: 'h111', name: '瑞秋', nameEn: 'Rachel', element: 'water', rarity: 'rare',
        chain: { ex1: { start: 'injured', end: 'downed' }}, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w111'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程攻+48%' } },
			ascended: { ex1: { text: '遠程攻+48%' } },
            sixStar: { ex1: { text: '遠程攻+48%' } }
        }
    },
    { 
        id: 'h112', name: '赫卡蒂', nameEn: 'Hekate', element: 'earth', rarity: 'rare',
        chain: { ex1: { start: 'downed', end: 'injured' }}, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w112'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+37%' } },
			ascended: { ex1: { text: '爆擊率+37%' } },
            sixStar: { ex1: { text: '爆擊率+37%' } }
        }
    },
    { 
        id: 'h113', name: '可可', nameEn: 'Coco', element: 'water', rarity: 'rare',
        chain: { ex1: { start: 'injured', end: 'airborne' }}, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w113'], 
        coreStates: { base: {}, ascended: {} , sixStar: null },
        buffs: {
            base: { ex1: { text: '技傷+80%' } },
			ascended: { ex1: { text: '技傷+93%' } },
            sixStar: { ex1: { text: '技傷+93%' } }
        }
    },
    { 
        id: 'h114', name: '瑪莉安', nameEn: 'Marianne', element: 'earth', rarity: 'rare',
        chain: { ex1: { start: 'downed', end: 'airborne' }}, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w114'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '土屬攻+46%' } },
			ascended: { ex1: { text: '土屬攻+46%' } },
            sixStar: { ex1: { text: '土屬攻+46%' } }
        }
    },
    { 
        id: 'h115', name: '蘇熙', nameEn: 'Sohee', element: 'light', rarity: 'rare',
        chain: { ex1: { start: 'downed', end: 'airborne' }}, 
        allowWeapons: ['rifle'], exclusiveWeapons: ['w115'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '技回+30%\n技傷+30%' } },
			ascended: { ex1: { text: '技回+30%\n技傷+30%' } },
            sixStar: { ex1: { text: '技回+30%\n技傷+30%' } }
        }
    },
    { 
        id: 'h116', name: '梅兒', nameEn: 'Mei', element: 'light', rarity: 'rare',
        chain: { ex1: { start: 'downed', end: 'airborne' }}, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w116'], 
        coreStates: { base: {}, ascended: {} , sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰防+64%' } },
			ascended: { ex1: { text: '近戰防+80%' } },
            sixStar: { ex1: { text: '近戰防+80%' } }
        }
    },
    { 
        id: 'h117', name: '飛兒', nameEn: 'Fei', element: 'light', rarity: 'rare',
        chain: { ex1: { start: 'downed', end: 'airborne' }}, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w116'], 
        coreStates: { base: {}, ascended: {} , sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰防+64%' } },
			ascended: { ex1: { text: '近戰防+80%' } },
            sixStar: { ex1: { text: '近戰防+80%' } }
        }
    },
    { 
        id: 'h118', name: '馬文', nameEn: 'Marvin', element: 'earth', rarity: 'rare',
        chain: { ex1: { start: 'airborne', end: 'downed' }}, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w118'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '生命力+38%' } },
			ascended: { ex1: { text: '生命力+38%' } },
            sixStar: { ex1: { text: '生命力+38%' } }
        }
    },
    { 
        id: 'h119', name: '克雷格', nameEn: 'Craig', element: 'earth', rarity: 'rare',
        chain: { ex1: { start: 'downed', end: 'airborne' }}, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w119'], 
        coreStates: { base: {}, ascended: {} , sixStar: null },
        buffs: {
            base: { ex1: { text: '防禦力+44%' } },
			ascended: { ex1: { text: '防禦力+48%' } },
            sixStar: { ex1: { text: '防禦力+48%' } }
        }
    },
    { 
        id: 'h120', name: '赤雪', nameEn: 'Akayuki', element: 'fire', rarity: 'rare',
        chain: { ex1: { start: 'injured', end: 'downed' }}, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w120'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+38%' } },
			ascended: { ex1: { text: '爆擊率+38%' } },
            sixStar: { ex1: { text: '爆擊率+38%' } }
        }
    },
    { 
        id: 'h121', name: '蘭芳', nameEn: 'Ranpang', element: 'basic', rarity: 'rare',
        chain: { ex1: { start: 'injured', end: 'airborne' }}, 
        allowWeapons: ['gauntlet'], exclusiveWeapons: ['w121'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '防禦力+42%' } },
			ascended: { ex1: { text: '防禦力+42%' } },
            sixStar: { ex1: { text: '防禦力+42%' } }
        }
    },
    { 
        id: 'h122', name: '優姬', nameEn: 'Yuze', element: 'dark', rarity: 'rare',
        chain: { ex1: { start: 'airborne', end: 'injured' }}, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w122'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '生命力+36%' } },
			ascended: { ex1: { text: '生命力+36%' } },
            sixStar: { ex1: { text: '生命力+36%' } }
        }
    },
    { 
        id: 'h123', name: '艾伊莎', nameEn: 'Aisha', element: 'light', rarity: 'rare',
        chain: { ex1: { start: 'all', end: 'downed' }}, 
        allowWeapons: ['1h_sword'], exclusiveWeapons: ['w123'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '生命力+36%' } },
			ascended: { ex1: { text: '生命力+36%' } },
            sixStar: { ex1: { text: '生命力+36%' } }
        }
    },
    { 
        id: 'h124', name: '夏碧拉', nameEn: 'Shapira', element: 'dark', rarity: 'rare',
        chain: { ex1: { start: 'airborne', end: 'injured' }}, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w124'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰傷+46%' } },
			ascended: { ex1: { text: '近戰傷+46%' } },
            sixStar: { ex1: { text: '近戰傷+46%' } }
        }
    },
    { 
        id: 'h125', name: '多爾夫', nameEn: 'Dolf', element: 'fire', rarity: 'rare',
        chain: { ex1: { start: 'downed', end: 'injured' }}, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w125'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '技回+28%\n技傷+33%' } },
			ascended: { ex1: { text: '技回+28%\n技傷+33%' } },
            sixStar: { ex1: { text: '技回+28%\n技傷+33%' } }
        }
    },
    { 
        id: 'h126', name: '愛彌', nameEn: 'Amy', element: 'basic', rarity: 'rare',
        chain: { ex1: { start: 'downed', end: 'injured' }}, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w126'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '近戰傷+48%' } },
			ascended: { ex1: { text: '近戰傷+48%' } },
            sixStar: { ex1: { text: '近戰傷+48%' } }
        }
    },
    { 
        id: 'h127', name: '基魯加斯', nameEn: 'Girgas', element: 'fire', rarity: 'rare',
        chain: { ex1: { start: 'injured', end: 'airborne' }}, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w127'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '技傷+82%' } },
			ascended: { ex1: { text: '技傷+82%' } },
            sixStar: { ex1: { text: '技傷+82%' } }
        }
    },
    { 
        id: 'h128', name: '凱特琳', nameEn: 'Catherine', element: 'water', rarity: 'rare',
        chain: { ex1: { start: 'airborne', end: 'injured' }}, 
        allowWeapons: ['bow'], exclusiveWeapons: ['w128'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '遠程防+66%' } },
			ascended: { ex1: { text: '遠程防+66%' } },
            sixStar: { ex1: { text: '遠程防+66%' } }
        }
    },
    { 
        id: 'h129', name: '麗', nameEn: 'Rie', element: 'basic', rarity: 'rare',
        chain: { ex1: { start: 'airborne', end: 'downed' }}, 
        allowWeapons: ['2h_sword'], exclusiveWeapons: ['w129'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '爆擊率+37%' } },
			ascended: { ex1: { text: '爆擊率+37%' } },
            sixStar: { ex1: { text: '爆擊率+37%' } }
        }
    },
    { 
        id: 'h130', name: '涅娃', nameEn: 'Neva', element: 'light', rarity: 'rare',
        chain: { ex1: { start: 'downed', end: 'injured' }}, 
        allowWeapons: ['staff'], exclusiveWeapons: ['w130'], 
        coreStates: { base: {}, ascended: null , sixStar: null },
        buffs: {
            base: { ex1: { text: '光屬攻+46%' } },
			ascended: { ex1: { text: '光屬攻+46%' } },
            sixStar: { ex1: { text: '光屬攻+46%' } }
        }
    }
];

const DB_WEAPONS = [
    { id: 'w001', name: '引人注目', nameEn: 'Prominence', type: '2h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w001_Prominence.png' },
    { id: 'w001_ex2', name: '光環', nameEn: 'Halo', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w001_ex2_Halo.png' },
    { id: 'w002', name: '天真', nameEn: 'Innocent', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w002_Innocent.png' },
    { id: 'w002_ex2', name: '光芒四射', nameEn: 'Radiant', type: '2h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w002_ex2_Radiant.png' },
    { id: 'w003', name: '阿爾馬達', nameEn: 'Armada', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w003_Armada.png' },
    { id: 'w004', name: '集體滅絕', nameEn: 'Genocide', type: 'rifle', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w004_Genocide.png' },
    { id: 'w005', name: '天使之聲', nameEn: 'Angel Voice', type: 'staff', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w005_Angel Voice.png' },
    { id: 'w006', name: '梅麗爾', nameEn: 'Mayreel', type: 'basket', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w006_Mayreel.png' },
    { id: 'w006_ex2', name: '皮諾', nameEn: 'Pino', type: 'basket', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w006_ex2_Pino.png' },
    { id: 'w007', name: '亞馬洛克', nameEn: 'Amarok', type: 'staff', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w007_Amarok.png' },
    { id: 'w008', name: '純潔的心', nameEn: 'Pure Mind', type: 'gauntlet', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w008_Pure Mind.png' },
    { id: 'w008_ex2', name: '鏡花水月', nameEn: 'Elusive Reflection', type: 'basket', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w008_ex2_Elusive Reflection.png' },
    { id: 'w009', name: '勇敢的心', nameEn: 'Brave Heart', type: '2h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w009_Brave Heart.png' },
    { id: 'w010', name: '薩倫加弓', nameEn: 'Sarnga', type: 'bow', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w010_Sarnga.png' },
    { id: 'w011', name: '火山號角', nameEn: 'Volcanic Horn', type: 'claw', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w011_Volcanic Horn.png' },
    { id: 'w011_ex2', name: '火山核心', nameEn: 'Volcanic Core', type: 'gauntlet', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w011_ex2_Volcanic Core.png' },
    { id: 'w012', name: '至聖寶珠', nameEn: 'Sage Bead', type: 'basket', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w012_Sage Bead.png' },
    { id: 'w013', name: '阿斯塔蒂', nameEn: 'Astarte', type: '2h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w013_Astarte.png' },
    { id: 'w014', name: '方陣剎那', nameEn: 'Eckesachs', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w014_Eckesachs.png' },
    { id: 'w014_ex2', name: '方陣剎那Mode.R', nameEn: 'Eckesachs Mode.R', type: 'rifle', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w014_ex2_Eckesachs Mode.R.png' },
    { id: 'w015', name: '歐魯斯', nameEn: 'Ouros', type: 'gauntlet', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w015_Ouros.png' },
    { id: 'w016', name: '香格里拉', nameEn: 'Shangrila', type: 'basket', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w016_Shangrila.png' },
    { id: 'w017', name: '解放者', nameEn: 'Liberator', type: 'staff', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w017_Liberator.png' },
    { id: 'w018', name: '千雷', nameEn: 'Thousand Thunder', type: 'bow', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w018_Thousand Thunder.png' },
    { id: 'w018_ex2', name: '滄海扇', nameEn: 'Ocean Gale', type: 'basket', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w018_ex2_Ocean Gale.png' },
    { id: 'w019', name: '獵食者', nameEn: 'Predator', type: '2h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w019_Predator.png' },
    { id: 'w020', name: '終結者', nameEn: 'Terminator', type: 'rifle', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w020_Terminator.png' },
    { id: 'w020_ex2', name: '夢魘', nameEn: 'Nightmare', type: '2h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w020_ex2_Nightmare.png' },
    { id: 'w021', name: '聖母讚', nameEn: 'Magnificat', type: 'bow', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w021_Magnificat.png' },
    { id: 'w022', name: '紅蓮', nameEn: 'Red Lotus', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w022_Red Lotus.png' },
    { id: 'w023', name: '宇宙毀滅者', nameEn: 'Cosmic Destroyer', type: 'rifle', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w023_Cosmic Destroyer.png' },
    { id: 'w023_ex2', name: '原子破獲者', nameEn: 'Atomic Destroyer', type: '2h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w023_ex2_Atomic Destroyer.png' },
    { id: 'w024', name: '彌賽亞', nameEn: 'Messiah', type: 'staff', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w024_Messiah.png' },
    { id: 'w025', name: '紫魄', nameEn: 'Furfur', type: 'basket', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w025_Furfur.png' },
    { id: 'w026', name: '索拉里斯', nameEn: 'Solaris', type: 'claw', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w026_Solaris.png' },
    { id: 'w027', name: '奧米加衝鋒槍', nameEn: 'Omega Blaster', type: 'rifle', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w027_Omega Blaster.png' },
    { id: 'w028', name: '女王的優雅', nameEn: 'Queens Grace', type: 'claw', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w028_Queens Grace.png' },
    { id: 'w029', name: '幻想曲', nameEn: 'Fantasia', type: 'staff', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w029_Fantasia.png' },
    { id: 'w030', name: '海之女神', nameEn: 'Nereid', type: '2h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w030_Nereid.png' },
    { id: 'w031', name: '海洋守護者', nameEn: 'Ocean Keeper', type: '2h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w031_Ocean Keeper.png' },
    { id: 'w032', name: '讚美詩', nameEn: 'Benedictus', type: 'basket', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w032_Benedictus.png' },
    { id: 'w033', name: '伊弗利特', nameEn: 'Ifrit', type: 'gauntlet', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w033_Ifrit.png' },
    { id: 'w034', name: '巴爾蒙克', nameEn: 'Balmung', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w034_Balmung.png' },
    { id: 'w035', name: '艾奎諾克斯', nameEn: 'Equinox', type: 'staff', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w035_Equinox.png' },
    { id: 'w036', name: '反叛', nameEn: 'Rebellion', type: 'rifle', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w036_Rebellion.png' },
    { id: 'w037', name: '復仇者', nameEn: 'Nnemesis', type: 'rifle', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w037_Nnemesis.png' },
    { id: 'w038', name: '愛的教訓', nameEn: 'Mind Snap', type: 'staff', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w038_Mind Snap.png' },
    { id: 'w039', name: '斷開鎖練', nameEn: 'Unchained', type: 'staff', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w039_Unchained.png' },
    { id: 'w040', name: '小星星', nameEn: 'Little Star', type: '1h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w040_Little Star.png' },
    { id: 'w041', name: '派蒙的碎片III', nameEn: 'Paimons Fragment III', type: 'bow', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w041_Paimons Fragment III.png' },
	{ id: 'w042', name: '辦公用品', nameEn: 'Office Supply', type: 'gauntlet', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w042_Office Supply.png' },
    { id: 'w043', name: '蝕', nameEn: 'Eclipse', type: 'basket', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w043_Eclipse.png' },
    { id: 'w044', name: '暮光', nameEn: 'Twilight', type: 'gauntlet', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w044_Twilight.png' },
    { id: 'w045', name: '萬波息筆', nameEn: 'Bringer of Tranquility', type: 'basket', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w045_Bringer of Tranquility.png' },
    { id: 'w046', name: '天衣無縫', nameEn: 'Heavenly Perfection', type: '1h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w046_Heavenly Perfection.png' },
    { id: 'w047', name: '藍色尖刺', nameEn: 'Blue Spear', type: 'rifle', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w047_Blue Spear.png' },
    { id: 'w048', name: '海洋呼喚', nameEn: 'Ocean Call', type: 'basket', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w048_Ocean Call.png' },
    { id: 'w049', name: '威望', nameEn: 'Prestige', type: 'gauntlet', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w049_Prestige.png' },
    { id: 'w050', name: '黑曼巴蛇', nameEn: 'Black Mamba', type: 'rifle', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w050_Black Mamba.png' },
    { id: 'w051', name: '阿格斯', nameEn: 'Arges', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w051_Arges.png' },
    { id: 'w052', name: '存取遭拒', nameEn: 'Permission Denied', type: 'gauntlet', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w052_Permission Denied.png' },
    { id: 'w053', name: '獵頭者', nameEn: 'Head Hunter', type: 'staff', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w053_Head Hunter.png' },
    { id: 'w054', name: '影丸', nameEn: 'Kagemaru', type: 'claw', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w054_Kagemaru.png' },
	{ id: 'w055', name: '行星破獲者', nameEn: 'Planet Buster', type: 'gauntlet', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w055_Planet Buster.png' },
    { id: 'w056', name: '拉特爾', nameEn: 'Ratel', type: 'rifle', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w056_Ratel.png' },
    { id: 'w057', name: '造雪機', nameEn: 'Snow Maker', type: 'gauntlet', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w057_Snow Maker.png' },
    { id: 'w058', name: '攻無不克', nameEn: 'Fail-not', type: 'staff', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w058_Fail-not.png' },
    { id: 'w059', name: '迪朗達爾', nameEn: 'Epic One Handed Sword', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w059_Epic One Handed Sword.png' },
    { id: 'w060', name: '玄山拳祕笈', nameEn: 'Secret Book of the Shen Mountain Fist', type: 'basket', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w060_Secret Book of the Shen Mountain Fist.png' },
    { id: 'w061', name: '龍齒', nameEn: 'Dragon Fang', type: 'claw', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w061_Dragon Fang.png' },
    { id: 'w062', name: '海洋之淚', nameEn: 'Oceans Tear', type: 'basket', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w062_Oceans Tear.png' },
    { id: 'w063', name: '羅摩之斧', nameEn: 'Parashu', type: '1h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w063_Parashu.png' },
    { id: 'w064', name: '千變萬化', nameEn: 'Infinite Change', type: 'basket', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w064_Infinite Change.png' },
    { id: 'w065', name: '皇家鏟子', nameEn: 'Loyal Shovel', type: '2h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w065_Loyal Shovel.png' },
    { id: 'w066', name: '愛娜溫', nameEn: 'Alraune', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w066_Alraune.png' },
    { id: 'w067', name: '納米粒子加速器', nameEn: 'Nanoparticle Accelerator', type: 'rifle', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w067_Nanoparticle Accelerator.png' },
    { id: 'w068', name: '煉火拳套', nameEn: 'Refiners Flame', type: 'gauntlet', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w068_Refiners Flame.png' },
    { id: 'w069', name: '難題解決者', nameEn: 'Trouble Shooter', type: 'claw', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w069_Trouble Shooter.png' },
    { id: 'w070', name: '血吸', nameEn: 'Chisui', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w070_Chisui.png' },
    { id: 'w071', name: '榮光', nameEn: 'Gloria', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w071_Gloria.png' },
    { id: 'w072', name: '悔悟', nameEn: 'Repentance', type: 'staff', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w072_Repentance.png' },
    { id: 'w073', name: '約束', nameEn: 'Restrain', type: 'bow', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w073_Restrain.png' },
    { id: 'w074', name: '奧德賽', nameEn: 'Odyssey', type: 'bow', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w074_Odyssey.png' },
    { id: 'w075', name: '萬人之敵', nameEn: 'Formidable Courage', type: 'rifle', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w075_Formidable Courage.png' },
    { id: 'w076', name: '龍泉劍', nameEn: 'Dragon Spring Sword', type: '1h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w076_Dragon Spring Sword.png' },
    { id: 'w077', name: '翠綠寶袋', nameEn: 'Pouch of Verdure', type: 'basket', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w077_Pouch of Verdure.png' },
    { id: 'w078', name: '天體球', nameEn: 'Celestial Orb', type: 'basket', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w078_Celestial Orb.png' },
    { id: 'w079', name: '天字銃筒', nameEn: 'Heavenly Cannon', type: 'rifle', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w079_Heavenly Cannon.png' },
    { id: 'w080', name: '銀河系獎盃', nameEn: 'Milkyway Trophy', type: '1h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w080_Milkyway Trophy.png' },
    { id: 'w081', name: '斬靈刀', nameEn: 'Ghost-Cutter Sword', type: '1h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w081_Ghost-Cutter Sword.png' },
    { id: 'w082', name: '槍布雷拉', nameEn: 'Gunbrella', type: 'rifle', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w082_Gunbrella.png' },
    { id: 'w083', name: 'Inter-V', nameEn: 'Inter-V', type: 'staff', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w083_Inter-V.png' },
    { id: 'w084', name: '意外之喜', nameEn: 'Serendipity', type: 'basket', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w084_Serendipity.png' },
    { id: 'w085', name: '冰雨', nameEn: 'Hisame', type: '1h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w085_Hisame.png' },
    { id: 'w086', name: '驅魔玉矛', nameEn: 'Jade Spear of Exorcism', type: 'staff', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w086_Jade Spear of Exorcism.png' },
	{ id: 'w087', name: '超速加農砲', nameEn: 'Overdrive Cannon', type: 'rifle', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w088_Overdrive Cannon.png' },
    { id: 'w088', name: '甜食雷達', nameEn: 'Sweet Radar', type: 'staff', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w087_Sweet Radar.png' },
    { id: 'w089', name: '甜食幼龍', nameEn: 'Sweet Hatchling', type: '2h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w089_Sweet Hatchling.png' },
    { id: 'w090', name: '血腥拳套', nameEn: 'Bloody Fist', type: 'gauntlet', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w090_Bloody Fist.png' },
    { id: 'w091', name: '勢如破竹', nameEn: 'Unstoppable Momentum', type: 'gauntlet', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w091_Unstoppable Momentum.png' },
    { id: 'w092', name: '黛菲涅絲', nameEn: 'Delphines', type: 'bow', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w092_Delphines.png' },
    { id: 'w093', name: '冰柱巴倫', nameEn: 'Icicle Baron', type: '2h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w093_Icicle Baron.png' },
    { id: 'w094', name: '究極維多利亞', nameEn: 'Ultimate Victoria', type: '2h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w094_Ultimate Victoria.png' },
    { id: 'w095', name: '夏日夢想家', nameEn: 'Summer Dreamer', type: 'gauntlet', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w095_Summer Dreamer.png' },
    { id: 'w096', name: '橡子步槍', nameEn: 'Acorn Rifle', type: 'rifle', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w096_Acorn Rifle.png' },
    { id: 'w097', name: '火山狂怒', nameEn: 'Volcanic Fury', type: '2h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w097_Volcanic Fury.png' },
    { id: 'w098', name: '魔力護符', nameEn: 'Talisman of Mana', type: 'basket', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w098_Talisman of Mana.png' },
    { id: 'w099', name: '森羅萬象', nameEn: 'Entirety', type: 'basket', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w099_Entirety.png' },
    { id: 'w100', name: '星能王冠', nameEn: 'Star Power Tiara', type: 'staff', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w100_Star Power Tiara.png' },
	{ id: 'w131', name: '地精醫療包', nameEn: 'Gnome Medical Bag', type: 'basket', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w131_Gnome Medical Bag.png' },
	{ id: 'w101', name: '利貝拉', nameEn: 'Libera', type: '1h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w101_Libera.png' },
	{ id: 'w101_ex2', name: '利貝拉Type.B', nameEn: 'Libera Type.B', type: 'bow', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w101_ex2_Libera Type.B.png' },
	{ id: 'w102', name: '正義', nameEn: 'Justice', type: 'staff', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w102_Justice.png' },
	{ id: 'w103', name: '麻煩精', nameEn: 'Trouble Maker', type: 'rifle', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w103_Trouble Maker.png' },
	{ id: 'w104', name: '芬里爾', nameEn: 'Fenrir', type: 'claw', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w104_Fenrir.png' },
	{ id: 'w105', name: '新月', nameEn: 'Crescent Moon', type: 'staff', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w105_Crescent Moon.png' },
	{ id: 'w106', name: '艾瑪', nameEn: 'Emma', type: 'basket', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w106_Emma.png' },
	{ id: 'w107', name: '粉碎者', nameEn: 'Pulverizer', type: 'gauntlet', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w107_Pulverizer.png' },
	{ id: 'w108', name: '冰霜傑克', nameEn: 'Jack Frost', type: 'basket', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w108_Jack Frost.png' },
	{ id: 'w109', name: '奧伯隆', nameEn: 'Oberon', type: 'bow', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w109_Oberon.png' },
	{ id: 'w110', name: '好奇解答者', nameEn: 'Curiosity Solver', type: 'basket', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w110_Curiosity Solver.png' },
	{ id: 'w111', name: '藍玫瑰', nameEn: 'Blue Rose', type: 'rifle', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w111_Blue Rose.png' },
	{ id: 'w112', name: '交涉者', nameEn: 'Negotiator', type: 'rifle', isExclusive: true, chainSkill: '', icon: './images/weapons/w112_Negotiator.png' },
	{ id: 'w113', name: '女巫之心', nameEn: 'Witch Heart', type: 'staff', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w113_Witch Heart.png' },
	{ id: 'w114', name: '無情', nameEn: 'Merciless', type: 'rifle', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w114_Merciless.png' },
	{ id: 'w115', name: '瑪奇頓破壞者', nameEn: 'Magiton Buster', type: 'rifle', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w115_Magiton Buster.png' },
	{ id: 'w116', name: '鬥士的自尊', nameEn: 'Pride of Fighter', type: 'gauntlet', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w116_Pride of Fighter.png' },
	{ id: 'w118', name: '法爾肯', nameEn: 'Vulkan', type: 'gauntlet', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w118_Vulkan.png' },
	{ id: 'w119', name: '沉默', nameEn: 'Silence', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w119_Silence.png' },
	{ id: 'w120', name: '村雨', nameEn: 'Murasame', type: '1h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w120_Murasame.png' },
	{ id: 'w121', name: '堅決的心', nameEn: 'Firm Determination', type: 'claw', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w121_Firm Determination.png' },
	{ id: 'w122', name: '塔爾塔羅斯', nameEn: 'Tartaros', type: '2h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w122_Tartaros.png' },
	{ id: 'w123', name: '真理', nameEn: 'Veritas', type: '1h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w123_Veritas.png' },
	{ id: 'w124', name: '法夫納', nameEn: 'Fafnir', type: '2h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w124_Fafnir.png' },
	{ id: 'w125', name: '太陽神', nameEn: 'Helios', type: 'staff', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w125_Helios.png' },
	{ id: 'w126', name: '雙子座', nameEn: 'Geminus', type: '2h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/w126_Geminus.png' },
	{ id: 'w127', name: '龍之怒', nameEn: 'Wrath of Dragon', type: 'staff', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/w127_Wrath of Dragon.png' },
	{ id: 'w128', name: '掠奪者', nameEn: 'Marauder', type: 'bow', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w128_Marauder.png' },
	{ id: 'w129', name: '維多利亞', nameEn: 'Victoria', type: '2h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/w129_Victoria.png' },
	{ id: 's001', name: '魔血符', nameEn: 'Demons Blood Talisman', type: 'gauntlet', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/s001_Demons Blood Talisman.png' },
	{ id: 's002', name: '光之劍', nameEn: 'Sword of Light', type: '2h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/s002_Sword of Light.png' },
	{ id: 's003', name: '傑洛士的權杖', nameEn: 'Xellos Staff', type: 'staff', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/s003_Xellos Staff.png' },
	{ id: 's004', name: '達伊之劍', nameEn: 'Sword of Dai', type: '1h_sword', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/s004_Sword of Dai.png' },
	{ id: 's005', name: '魔甲拳', nameEn: 'Dark Armour Fist', type: 'gauntlet', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/s005_Dark Armour Fist.png' },
	{ id: 's006', name: '黑魔杖', nameEn: 'Black Rod', type: 'staff', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/s006_Black Rod.png' },
	{ id: 's007', name: '利姆露的劍', nameEn: 'Rimurus Blade', type: '1h_sword', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/s007_Rimurus Blade.png' },
	{ id: 's008', name: '朱菜的杖', nameEn: 'Shunas Staff', type: 'staff', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/s008_Shunas Staff.png' },
	{ id: 's009', name: '龍指虎', nameEn: 'Dragon Kunckles', type: 'claw', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/s009_Dragon Kunckles.png' },
	{ id: 's010', name: '芙莉蓮的手杖', nameEn: 'Frierens Staff', type: 'staff', isExclusive: true, chainSkill: 'downed', icon: './images/weapons/s010_Frierens Staff.png' },
	{ id: 's011', name: '修塔爾克的斧頭', nameEn: 'Starks Axe', type: '2h_sword', isExclusive: true, chainSkill: 'injured', icon: './images/weapons/s011_Starks Axe.png' },
	{ id: 's012', name: '費倫的手杖', nameEn: 'Ferns Staff', type: 'staff', isExclusive: true, chainSkill: 'airborne', icon: './images/weapons/s012_Ferns Staff.png' },
];

const DB_ACCESSORIES = [
    { id: 'a1', name: '牛頭人項鍊', icon: './images/accessories/Minotaurs Necklace.png', partyBuff: { text: '普屬攻+0%' } },
    { id: 'a2', name: '手環', icon: './images/accessories/Shadow beast Confining Bracelet.png', partyBuff: { text: '爆擊率+10%' } },
    { id: 'a3', name: '普魔鏡項鍊', icon: './images/accessories/Mirror Earring of Patience.png', partyBuff: { text: '普屬攻+15%' } },
	{ id: 'a3', name: '火魔鏡項鍊', icon: './images/accessories/Ruby Mirror Ring.png', partyBuff: { text: '火屬攻+15%' } },
	{ id: 'a3', name: '水魔鏡項鍊', icon: './images/accessories/Mirror Earring of Worship.png', partyBuff: { text: '水屬攻+15%' } },
	{ id: 'a3', name: '土魔鏡項鍊', icon: './images/accessories/Mirror Necklace of Riches.png', partyBuff: { text: '土屬攻+15%' } },
	{ id: 'a3', name: '光魔鏡項鍊', icon: './images/accessories/Mirror Earring of Faith.png', partyBuff: { text: '光屬攻+15%' } },
	{ id: 'a3', name: '暗魔鏡項鍊', icon: './images/accessories/Mirror Earring of Nobility.png', partyBuff: { text: '暗屬攻+15%' } },
];

const DB_RELICS = [
    { id: 'r1', name: '聖杯', stats: { crit: 10, atk: 0, def: 0 , hp: 0}, icon: './images/relics/glass.png' },
    { id: 'r2', name: '書本', stats: { crit: 0, atk: 10, def: 0 , hp: 0 }, icon: './images/relics/book.png' },
    { id: 'r3', name: '蠟燭', stats: { crit: 0, atk: 0, def: 15 , hp: 0 }, icon: './images/relics/candelabrum.png' },
	{ id: 'r4', name: '鈴鐺', stats: { crit: 0, atk: 0, def: 0 , hp: 10 }, icon: './images/relics/bell.png' }
];

const DB_BOSSES = [
    // 確保所有 Boss 都有 element 屬性，以符合 script.js 的邏輯
    { id: 'b01', name: '九尾狐', icon: './images/boss/Garam.png' },
    { id: 'b02', name: '牛頭人', icon: './images/boss/Minotaur.png' },
    { id: 'b03', name: '沙漠牛蟲', icon: './images/boss/Bullworm.png' },
    { id: 'b04', name: '卡門', icon: './images/attribute/ic_attribute_basic.png' },
    { id: 'b05', name: '史萊姆', icon: './images/boss/Lava Slime.png' },
    { id: 'b06', name: '司令官', icon: './images/boss/Invader Commander.png' },
    { id: 'b07', name: '老鼠', icon: './images/attribute/ic_attribute_basic.png' },
    { id: 'b08', name: '妖精', icon: './images/boss/Fairy.png' }, 
	{ id: 'b09', name: '阿嬤', icon: './images/boss/Cyborg Erina.png' },
	{ id: 'b10', name: '帝國騎士', icon: './images/boss/Empire Kinght.png' },
	{ id: 'b11', name: '哥布林', icon: './images/boss/Goblin Chief.png' },
	{ id: 'b12', name: '校長', icon: './images/boss/Elphaba.png' },
	{ id: 'b13', name: '海軍', icon: './images/boss/Marina.png' },
	{ id: 'b14', name: '蚊子', icon: './images/boss/Harvester.png' },
	{ id: 'b15', name: '雪人', icon: './images/boss/Gast.png' },
	{ id: 'b16', name: '傑利小瓦爾特', icon: './images/attribute/ic_attribute_basic.png' },
	{ id: 'b17', name: '惡魔', icon: './images/boss/Ancient Demon.png' },
	{ id: 'b18', name: '暗影', icon: './images/boss/Shadow Beast.png' },
	{ id: 'b19', name: '熊貓', icon: './images/boss/Mad Panda.png' },
	{ id: 'b20', name: '導演', icon: './images/attribute/ic_attribute_basic.png' },
	{ id: 'b21', name: '鄧肯', icon: './images/boss/Minister Duncan.png' },
	{ id: 'b22', name: '老頭', icon: './images/boss/Viper Clan Leader.png' },
	{ id: 'b23', name: '沙沙', icon: './images/boss/Sandmonster.png' },
	{ id: 'b24', name: '鉻小姐', icon: './images/boss/Miss Chrome.png' },
	{ id: 'b25', name: '暗砲', icon: './images/boss/Arabelle.png' },
	{ id: 'b26', name: '小紅帽', icon: './images/boss/Elvirabium.png' },
];
//#5cd65c
const CONSTANTS = {
    elements: {
        basic: { label: '普', color: '#b0b0b0', bg: '#eee', icon: './images/attribute/attribute_basic.png' },
        fire: { label: '火', color: '#ff4d4d', bg: '#ffe6e6', icon: './images/attribute/attribute_fire.png' },
        water: { label: '水', color: '#4da6ff', bg: '#e6f2ff', icon: './images/attribute/attribute_water.png' },
        earth: { label: '土', color: '#BF5B16', bg: '#e6ffe6', icon: './images/attribute/attribute_earth.png' },
        light: { label: '光', color: '#ffcc00', bg: '#fff5e6', icon: './images/attribute/attribute_light.png' },
        dark: { label: '暗', color: '#a366ff', bg: '#f2e6ff', icon: './images/attribute/attribute_dark.png' }
    },
    rarities: {unique: '獨特',rare: '稀有',normal: '一般'},
    weaponTypes: {
        '1h_sword': '單手劍', '2h_sword': '雙手劍', rifle: '步槍', 
        bow: '弓', basket: '籃子', staff: '權杖', gauntlet: '拳套', 
		claw: '鉤爪'
    }
};