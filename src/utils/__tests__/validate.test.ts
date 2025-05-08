import { add } from '@/utils/validation';

// basic validation for testing unit test work fine:
describe('add ():', () => {
  it('it should return 2, when given -3 and 5', () => {
    const [summand, addend] = [-3, 5];
    const sum = add(summand, addend);
    expect(sum).toBe(2);
  });

  it('it should not return 8, when given -3 and 5', () => {
    const [summand, addend] = [-3, 5];
    const sum = add(summand, addend);
    expect(sum).not.toBe(8);
  });

  it('it should return 0, when given 0 and 0', () => {
    const [summand, addend] = [0, 0];
    const sum = add(summand, addend);
    expect(sum).toBe(0);
  });
});
