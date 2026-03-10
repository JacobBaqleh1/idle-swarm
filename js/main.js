window.addEventListener('DOMContentLoaded', function () {
  loadGame();
  initTabs();
  initUnitBuyButtons();
  initClickForFood();
  render();
  setInterval(gameTick, 100);
});
