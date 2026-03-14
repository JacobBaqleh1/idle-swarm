const { getUnitCost, canAfford, buyUnit } = require('../units.js');

beforeEach(() => {
  // Reset larva state before each test
  global.state.units.larva.count = 0;
  global.state.resources.food = 0;
  global.state.units.larva.purchased = 0;
});

describe('getUnitCost', () => {
  test('returns base cost when count is 0', () => {
    expect(getUnitCost('larva')).toEqual({ food: 10 });
  });

  test('scales cost by 1.15 per unit owned (ceiled)', () => {
    global.state.units.larva.purchased = 1;
    // ceil(10 * 1.15^1) = ceil(11.5) = 12
    expect(getUnitCost('larva')).toEqual({ food: 12 });
  });

  test('scales cost correctly at count 5', () => {
    global.state.units.larva.purchased = 5;
    const expected = Math.ceil(10 * Math.pow(1.15, 5));
    expect(getUnitCost('larva')).toEqual({ food: expected });
  });

  test('returns multi-resource cost for scientist', () => {
    global.state.units.scientist.count = 0;
    global.state.resources.rock = 0;
    const cost = getUnitCost('scientist');
    expect(cost.food).toBe(200);
    expect(cost.rock).toBe(100);
  });
});

describe('canAfford', () => {
  test('returns false when food < cost', () => {
    global.state.resources.food = 9;
    expect(canAfford('larva')).toBe(false);
  });

  test('returns true when food === cost', () => {
    global.state.resources.food = 10;
    expect(canAfford('larva')).toBe(true);
  });

  test('returns true when food > cost', () => {
    global.state.resources.food = 1000;
    expect(canAfford('larva')).toBe(true);
  });
});

describe('buyUnit', () => {
  test('returns false and leaves state unchanged when cannot afford', () => {
    global.state.resources.food = 5;
    const result = buyUnit('larva');
    expect(result).toBe(false);
    expect(global.state.units.larva.count).toBe(0);
    expect(global.state.resources.food).toBe(5);
  });

  test('deducts cost and increments count when affordable', () => {
    global.state.resources.food = 10;
    const result = buyUnit('larva');
    expect(result).toBe(true);
    expect(global.state.units.larva.count).toBe(1);
    expect(global.state.resources.food).toBe(0);
  });

  test('next purchase costs more after buying one', () => {
    global.state.resources.food = 10;
    buyUnit('larva'); // count is now 1
    const nextCost = getUnitCost('larva');
    expect(nextCost.food).toBeGreaterThan(10);
  });
});
