const SAVE_KEY = 'idleSwarm';

function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Save failed:', e);
  }
}

// Deep-merge src into dst — handles new keys added in future versions gracefully
function deepMerge(dst, src) {
  for (const key in src) {
    if (!Object.prototype.hasOwnProperty.call(src, key)) continue;
    if (src[key] !== null && typeof src[key] === 'object' && !Array.isArray(src[key])) {
      if (typeof dst[key] !== 'object' || dst[key] === null) dst[key] = {};
      deepMerge(dst[key], src[key]);
    } else {
      dst[key] = src[key];
    }
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    deepMerge(state, saved);
  } catch (e) {
    console.warn('Load failed:', e);
  }
}

// Default state values to restore on reset — mirrors the initial state shape
const DEFAULT_STATE = {
  resources: { food: 0, rock: 0, soil: 0, wood: 0, foliage: 0, fungus: 0, delve: 0, metal: 0 },
  units: {
    larva:       { count: 0, unlocked: true,  visible: true  },
    ant:         { count: 0, unlocked: false, visible: false },
    queen:       { count: 0, unlocked: false, visible: false },
    miner:       { count: 0, unlocked: false, visible: false },
    scientist:   { count: 0, unlocked: false, visible: false },
    farmer:      { count: 0, unlocked: false, visible: false },
    carpenter:   { count: 0, unlocked: false, visible: false },
    grasscutter: { count: 0, unlocked: false, visible: false },
    aphid:       { count: 0, unlocked: false, visible: false },
  },
  delveUpgrades: {
    larva2x:         { purchased: false },
    queenMakesAnts:  { purchased: false },
    unlockFarmer:    { purchased: false },
    unlockCarpenter: { purchased: false },
  },
  flags: { ascendTabVisible: false, delveTabVisible: false, inParagonScreen: false },
};

function resetGame() {
  localStorage.removeItem(SAVE_KEY);
  deepMerge(state, DEFAULT_STATE);
  // Also reset totalFoodEver and ascensionCount on a full reset
  state.totalFoodEver = 0;
  state.ascensionCount = 0;
  render();
}

if (typeof module !== 'undefined') module.exports = { saveGame, loadGame, resetGame, deepMerge };
