// Set up game globals for Jest — mirrors the browser's global scope
// where all JS files are loaded as <script> tags sharing one namespace.
// Functions reference globals at call time, so setting them here before
// any test runs is sufficient.

const { state }                                  = require('../state.js');
const { RESOURCE_DEFS, isResourceVisible }        = require('../resources.js');
const { UNIT_LABELS, UNIT_COSTS, getUnitCost,
        canAfford, buyUnit }                      = require('../units.js');
const { formatNumber, formatCostString }          = require('../ui.js');
const { deepMerge }                              = require('../save.js');

global.state             = state;
global.RESOURCE_DEFS     = RESOURCE_DEFS;
global.isResourceVisible = isResourceVisible;
global.UNIT_LABELS       = UNIT_LABELS;
global.UNIT_COSTS        = UNIT_COSTS;
global.getUnitCost       = getUnitCost;
global.canAfford         = canAfford;
global.buyUnit           = buyUnit;
global.formatNumber      = formatNumber;
global.formatCostString  = formatCostString;
global.deepMerge         = deepMerge;
