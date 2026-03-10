// Production rates per unit per second (before paragon/delve multipliers)
// Each entry: { resource: ratePerSec, ... } — negative = consumption
const UNIT_PRODUCTION = {
  larva:       { food:    0.5  },
  ant:         { food:    1.0  },
  queen:       { food:   -5.0  }, // queen consumes food; output handled in applyQueenOutput
  miner:       { rock:    1.0  },
  scientist:   { delve:   1.0  },
  farmer:      { soil:    1.0  },
  carpenter:   { wood:    1.0  },
  grasscutter: { foliage: 1.0  },
  aphid:       { fungus:  1.0, foliage: -0.5 },
};

// Tick counter used to trigger autosave every 5 seconds (50 ticks at 10/sec)
let tickCount = 0;
const AUTOSAVE_INTERVAL = 50;

function applyProduction() {
  const units = state.units;
  for (const unitKey in UNIT_PRODUCTION) {
    const count = units[unitKey].count;
    if (count === 0) continue;

    const rates = UNIT_PRODUCTION[unitKey];
    // Queen's food consumption applies here; larva production from queen in applyQueenOutput
    for (const res in rates) {
      let rate = rates[res];

      // Apply paragon multipliers
      if (unitKey === 'larva' && res === 'food' && state.paragonUpgrades.larva2x.purchased) rate *= 2;
      if (unitKey === 'ant'   && res === 'food' && state.paragonUpgrades.ant2x.purchased)  rate *= 2;
      if (unitKey === 'miner' && res === 'rock' && state.paragonUpgrades.miner2x.purchased) rate *= 2;
      if (unitKey === 'scientist' && res === 'delve' && state.paragonUpgrades.scientist2x.purchased) rate *= 2;

      // Apply delve multipliers
      if (unitKey === 'larva' && res === 'food' && state.delveUpgrades.larva2x.purchased) rate *= 2;

      // Each tick is 0.1 seconds (100ms interval)
      state.resources[res] += rate * count * 0.1;

      // Resources cannot go below 0
      if (state.resources[res] < 0) state.resources[res] = 0;
    }
  }

  // Track total food ever earned for ascension
  // We add food income (not consumption) to totalFoodEver separately below
}

function applyQueenOutput() {
  const queenCount = state.units.queen.count;
  if (queenCount === 0) return;

  let larvaRate = 2; // larva/sec per queen
  if (state.paragonUpgrades.queen2x.purchased) larvaRate *= 2;

  state.units.larva.count += larvaRate * queenCount * 0.1;

  // If delve upgrade queenMakesAnts is purchased, queens also produce ants
  if (state.delveUpgrades.queenMakesAnts.purchased) {
    state.units.ant.count += 1 * queenCount * 0.1;
  }
}

function trackFoodEarned() {
  // Sum all positive food contributors each tick
  let foodIncome = 0;
  const foodProducers = ['larva', 'ant'];
  for (const unitKey of foodProducers) {
    const count = state.units[unitKey].count;
    if (count === 0) continue;
    let rate = UNIT_PRODUCTION[unitKey].food;
    if (unitKey === 'larva') {
      if (state.paragonUpgrades.larva2x.purchased) rate *= 2;
      if (state.delveUpgrades.larva2x.purchased)   rate *= 2;
    }
    if (unitKey === 'ant' && state.paragonUpgrades.ant2x.purchased) rate *= 2;
    foodIncome += rate * count * 0.1;
  }
  state.totalFoodEver += foodIncome;
}

function checkUnlocks() {
  const u = state.units;

  // Ant: visible after first larva purchased
  if (u.larva.count >= 1) {
    u.ant.unlocked = true;
    u.ant.visible  = true;
  }

  // Queen: visible after first ant purchased
  if (u.ant.count >= 1) {
    u.queen.unlocked = true;
    u.queen.visible  = true;
  }

  // Miner + Scientist: visible after first ant purchased
  if (u.ant.count >= 1) {
    u.miner.unlocked     = true;
    u.miner.visible      = true;
    u.scientist.unlocked = true;
    u.scientist.visible  = true;
  }

  // Farmer: visible only after delve upgrade purchased
  if (state.delveUpgrades.unlockFarmer.purchased) {
    u.farmer.unlocked = true;
    u.farmer.visible  = true;
  }

  // Carpenter: visible only after delve upgrade purchased
  if (state.delveUpgrades.unlockCarpenter.purchased) {
    u.carpenter.unlocked = true;
    u.carpenter.visible  = true;
  }

  // Grass Cutter and Aphid: unlocked by spending delve (handled in delve tab — stubs here)
  // (Phase 3)
}

function checkTabVisibility() {
  // Jobs tab: visible after miner or scientist first unlocked
  if (state.units.miner.visible || state.units.scientist.visible) {
    const jobsBtn = document.getElementById('tab-btn-jobs');
    if (jobsBtn) jobsBtn.style.display = '';
  }

  // Delve tab: visible after first scientist purchased and delve > 0
  if (state.units.scientist.count >= 1 && state.resources.delve > 0) {
    state.flags.delveTabVisible = true;
    const delveBtn = document.getElementById('tab-btn-delve');
    if (delveBtn) delveBtn.style.display = '';
  }

  // Ascend tab: visible after reaching 1 trillion food ever (never hides)
  if (state.totalFoodEver >= 1e12) {
    state.flags.ascendTabVisible = true;
    const ascendBtn = document.getElementById('tab-btn-ascend');
    if (ascendBtn) ascendBtn.style.display = '';
  }
}

function autoSave() {
  tickCount++;
  if (tickCount >= AUTOSAVE_INTERVAL) {
    tickCount = 0;
    saveGame();
  }
}

function gameTick() {
  applyProduction();
  applyQueenOutput();
  trackFoodEarned();
  checkUnlocks();
  checkTabVisibility();
  render();
  autoSave();
}

if (typeof module !== 'undefined') {
  module.exports = { UNIT_PRODUCTION, applyProduction, applyQueenOutput, trackFoodEarned, checkUnlocks, checkTabVisibility, gameTick };
}
