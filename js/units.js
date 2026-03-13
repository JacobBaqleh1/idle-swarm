// Unit display names
const UNIT_LABELS = {
  larva:       'Larva',
  ant:         'Ant',
  queen:       'Queen',
  miner:       'Miner',
  scientist:   'Scientist',
  farmer:      'Farmer',
  carpenter:   'Carpenter',
  grasscutter: 'Grass Cutter',
  aphid:       'Aphid',
};

// Cost in resources for each unit. Each entry is { resource: amount, ... }
const UNIT_COSTS = {
  larva:       { food: 10  },
  ant:         { food: 100 },
  queen:       { food: 500 },
  miner:       { food: 100 },
  scientist:   { food: 200, rock: 100 },
  farmer:      { food: 100 },
  carpenter:   { food: 100 },
  grasscutter: { food: 200 },
  aphid:       { food: 200 },
};

// Returns the current scaled cost for a unit as { resource: scaledAmount, ... }
function getUnitCost(unitKey) {
  const unit = state.units[unitKey];
  const baseCosts = UNIT_COSTS[unitKey];
  const mult = Math.pow(unit.costMult, unit.purchased);
  const scaled = {};
  for (const res in baseCosts) {
    scaled[res] = Math.ceil(baseCosts[res] * mult);
  }
  return scaled;
}

function canAfford(unitKey) {
  const cost = getUnitCost(unitKey);
  for (const res in cost) {
    if (state.resources[res] < cost[res]) return false;
  }
  return true;
}

function buyUnit(unitKey) {
  if (!canAfford(unitKey)) return false;
  const cost = getUnitCost(unitKey);
  for (const res in cost) {
    state.resources[res] -= cost[res];
  }
  state.units[unitKey].count += 1;
  state.units[unitKey].purchased += 1;
  return true;
}

if (typeof module !== 'undefined') module.exports = { UNIT_LABELS, UNIT_COSTS, getUnitCost, canAfford, buyUnit };
