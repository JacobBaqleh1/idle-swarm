// Resource metadata: label and which unit must be visible before the resource shows
const RESOURCE_DEFS = {
  food:    { label: 'Food',    visibleUnit: null        }, // always visible
  rock:    { label: 'Rock',    visibleUnit: 'miner'     },
  soil:    { label: 'Soil',    visibleUnit: 'farmer'    },
  wood:    { label: 'Wood',    visibleUnit: 'carpenter' },
  foliage: { label: 'Foliage', visibleUnit: 'grasscutter' },
  fungus:  { label: 'Fungus',  visibleUnit: 'aphid'     },
  delve:   { label: 'Delve',   visibleUnit: 'scientist' },
  metal:   { label: 'Metal',   visibleUnit: null        }, // reserved for future use
};

function isResourceVisible(key) {
  const def = RESOURCE_DEFS[key];
  if (!def) return false;
  if (def.visibleUnit === null) {
    // food is always visible; metal hidden until a future unit unlocks it
    return key === 'food';
  }
  return state.units[def.visibleUnit] && state.units[def.visibleUnit].visible;
}

if (typeof module !== 'undefined') module.exports = { RESOURCE_DEFS, isResourceVisible };
