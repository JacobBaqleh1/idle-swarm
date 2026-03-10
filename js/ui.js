function formatNumber(n) {
  if (n < 1000) return Math.floor(n).toString();
  if (n < 1e6)  return (n / 1e3).toFixed(2).replace(/\.?0+$/, '') + 'K';
  if (n < 1e9)  return (n / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (n < 1e12) return (n / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'B';
  if (n < 1e15) return (n / 1e12).toFixed(2).replace(/\.?0+$/, '') + 'T';
  return (n / 1e15).toFixed(2).replace(/\.?0+$/, '') + 'Q';
}

function renderResourceBar() {
  const bar = document.getElementById('resource-bar');
  if (!bar) return;

  for (const key in RESOURCE_DEFS) {
    const chip = document.getElementById('res-' + key);
    if (!chip) continue;

    const visible = isResourceVisible(key);
    chip.style.display = visible ? '' : 'none';
    if (visible) {
      const val = state.resources[key];
      chip.querySelector('.res-value').textContent = formatNumber(val);
    }
  }
}

function renderUnitsTab() {
  const list = document.getElementById('unit-list');
  if (!list) return;

  for (const key in state.units) {
    const unit = state.units[key];
    const row = document.getElementById('unit-row-' + key);
    if (!row) continue;

    row.style.display = unit.visible ? '' : 'none';
    if (!unit.visible) continue;

    const cost = getUnitCost(key);
    const affordable = canAfford(key);

    row.querySelector('.unit-count').textContent = formatNumber(unit.count);
    row.querySelector('.unit-cost').textContent = formatCostString(cost);

    const btn = row.querySelector('.unit-buy-btn');
    btn.disabled = !affordable;
  }
}

function formatCostString(cost) {
  return Object.entries(cost)
    .map(([res, amt]) => `${formatNumber(amt)} ${RESOURCE_DEFS[res].label}`)
    .join(', ');
}

function renderMainTab() {
  // Show food production rate per second on the main tab
  const rateEl = document.getElementById('food-rate');
  if (!rateEl) return;

  let rate = 0;
  const u = state.units;

  let larvaRate = 0.5;
  if (state.paragonUpgrades.larva2x.purchased) larvaRate *= 2;
  if (state.delveUpgrades.larva2x.purchased)   larvaRate *= 2;
  rate += larvaRate * u.larva.count;

  let antRate = 1.0;
  if (state.paragonUpgrades.ant2x.purchased) antRate *= 2;
  rate += antRate * u.ant.count;

  rate -= 5 * u.queen.count; // queen food consumption

  rateEl.textContent = (rate >= 0 ? '+' : '') + formatNumber(rate) + ' food/sec';
}

function render() {
  renderResourceBar();
  renderMainTab();
  renderUnitsTab();
}

// Buy button click handler — uses event delegation on the unit list
function initUnitBuyButtons() {
  const list = document.getElementById('unit-list');
  if (!list) return;
  list.addEventListener('click', function (e) {
    const btn = e.target.closest('.unit-buy-btn');
    if (!btn) return;
    const unitKey = btn.dataset.unit;
    if (unitKey) buyUnit(unitKey);
  });
}

// Manual food click on main tab
function initClickForFood() {
  const btn = document.getElementById('click-food-btn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    state.resources.food += 1;
    state.totalFoodEver += 1;
  });
}

if (typeof module !== 'undefined') {
  module.exports = { formatNumber, formatCostString, renderResourceBar, renderUnitsTab, renderMainTab, render };
}
