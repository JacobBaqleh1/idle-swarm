const state = {
  resources: {
    food: 0,
    rock: 0,
    soil: 0,
    wood: 0,
    foliage: 0,
    fungus: 0,
    delve: 0,
    metal: 0,
  },
  units: {
    larva:       { count: 0, purchased: 0, baseCost: 10,  costMult: 1.15, unlocked: true,  visible: true  },
    ant:         { count: 0, purchased: 0, baseCost: 100, costMult: 1.15, unlocked: false, visible: false },
    queen:       { count: 0, purchased: 0, baseCost: 500, costMult: 1.15, unlocked: false, visible: false },
    miner:       { count: 0, purchased: 0, baseCost: 100, costMult: 1.15, unlocked: false, visible: false },
    scientist:   { count: 0, purchased: 0, baseCost: 200, costMult: 1.15, unlocked: false, visible: false },
    farmer:      { count: 0, purchased: 0, baseCost: 100, costMult: 1.15, unlocked: false, visible: false },
    carpenter:   { count: 0, purchased: 0, baseCost: 100, costMult: 1.15, unlocked: false, visible: false },
    grasscutter: { count: 0, purchased: 0, baseCost: 200, costMult: 1.15, unlocked: false, visible: false },
    aphid:       { count: 0, purchased: 0, baseCost: 200, costMult: 1.15, unlocked: false, visible: false },
  },
  delveUpgrades: {
    larva2x:         { purchased: false, cost: 800  },
    queenMakesAnts:  { purchased: false, cost: 2000 },
    unlockFarmer:    { purchased: false, cost: 100  },
    unlockCarpenter: { purchased: false, cost: 200  },
  },
  paragonPoints: 0,
  paragonUpgrades: {
    larva2x:     { purchased: false, cost: 50  },
    ant2x:       { purchased: false, cost: 100 },
    queen2x:     { purchased: false, cost: 500 },
    miner2x:     { purchased: false, cost: 500 },
    scientist2x: { purchased: false, cost: 200 },
  },
  totalFoodEver: 0,
  ascensionCount: 0,
  flags: {
    ascendTabVisible: false,
    delveTabVisible:  false,
    inParagonScreen:  false,
  },
};

if (typeof module !== 'undefined') module.exports = { state };
