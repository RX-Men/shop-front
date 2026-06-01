import { PricePipe } from './price-pipe';

describe('PricePipe', () => {
  const pipe = new PricePipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "2549" to "$25.49"', () => {
    expect(pipe.transform(2549)).toBe('$25.49');
  });

  it('should transform "2500" to "$25.00"', () => {
    expect(pipe.transform(2500)).toBe('$25.00');
  });

  it('should transform "2599" to "$25.99"', () => {
    expect(pipe.transform(2599)).toBe('$25.99');
  });

  it('should transform "99" to "$0.99"', () => {
    expect(pipe.transform(99)).toBe('$0.99');
  });

  it('should transform "1" to "$0.01"', () => {
    expect(pipe.transform(1)).toBe('$0.01');
  });

  it('should return null for "0.1"', () => {
    expect(pipe.transform(0.1)).toBe(null);
  });

  it('should return null for "0"', () => {
    expect(pipe.transform(0)).toBe(null);
  });

  it('should return null for "-1"', () => {
    expect(pipe.transform(-1)).toBe(null);
  });

  it('should return null for "NaN"', () => {
    expect(pipe.transform(NaN)).toBe(null);
  });

  it('should return null for "Infinity"', () => {
    expect(pipe.transform(Infinity)).toBe(null);
  });
});
