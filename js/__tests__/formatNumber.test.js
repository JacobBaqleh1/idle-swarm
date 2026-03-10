const { formatNumber } = require('../ui.js');

describe('formatNumber', () => {
  test('returns integer string for values below 1000', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(1)).toBe('1');
    expect(formatNumber(999)).toBe('999');
  });

  test('formats thousands with K suffix', () => {
    expect(formatNumber(1000)).toBe('1K');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(1234)).toBe('1.23K');
    expect(formatNumber(999999)).toBe('1000K'); // 999.999 rounds up via toFixed(2)
  });

  test('formats millions with M suffix', () => {
    expect(formatNumber(1_000_000)).toBe('1M');
    expect(formatNumber(2_500_000)).toBe('2.5M');
  });

  test('formats billions with B suffix', () => {
    expect(formatNumber(1_000_000_000)).toBe('1B');
    expect(formatNumber(1_500_000_000)).toBe('1.5B');
  });

  test('formats trillions with T suffix', () => {
    expect(formatNumber(1e12)).toBe('1T');
    expect(formatNumber(2.5e12)).toBe('2.5T');
  });

  test('formats quadrillions with Q suffix', () => {
    expect(formatNumber(1e15)).toBe('1Q');
  });

  test('floors sub-1000 values (no decimals)', () => {
    expect(formatNumber(9.9)).toBe('9');
    expect(formatNumber(999.99)).toBe('999');
  });
});
