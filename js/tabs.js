let activeTab = 'main';

function switchTab(tabId) {
  // Hide all tab panes
  const panes = document.querySelectorAll('.tab-pane');
  panes.forEach(p => p.classList.remove('active'));

  // Deactivate all tab buttons
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  // Show selected pane
  const pane = document.getElementById('tab-' + tabId);
  if (pane) pane.classList.add('active');

  // Activate selected button
  const btn = document.getElementById('tab-btn-' + tabId);
  if (btn) btn.classList.add('active');

  activeTab = tabId;
}

function updateTabVisibility() {
  // Jobs tab
  const jobsBtn = document.getElementById('tab-btn-jobs');
  if (jobsBtn) {
    const show = state.units.miner.visible || state.units.scientist.visible;
    jobsBtn.style.display = show ? '' : 'none';
  }

  // Delve tab
  const delveBtn = document.getElementById('tab-btn-delve');
  if (delveBtn) {
    delveBtn.style.display = state.flags.delveTabVisible ? '' : 'none';
  }

  // Ascend tab
  const ascendBtn = document.getElementById('tab-btn-ascend');
  if (ascendBtn) {
    ascendBtn.style.display = state.flags.ascendTabVisible ? '' : 'none';
  }
}

function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      const tabId = this.dataset.tab;
      if (tabId) switchTab(tabId);
    });
  });

  // Hide future-phase tabs on startup
  updateTabVisibility();

  // Show the default tab
  switchTab('main');
}

if (typeof module !== 'undefined') module.exports = { switchTab, updateTabVisibility, initTabs };
