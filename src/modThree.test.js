import { modThree } from './modThree.ts'

describe('modThree', () => {
    it('should return the final state for a valid input', () => {
        expect(modThree(['0', '1', '1'])).toBe(0);
        expect(modThree(['1', '0', '0'])).toBe(1);
        expect(modThree(['1', '0', '1'])).toBe(2);
    });

    it('should throw an error for an unacceptable input', () => {
        expect(() => modThree(['2'])).toThrow('Unacceptable input 2');
        expect(() => modThree(['1', '0', '-2'])).toThrow('Unacceptable input -2');
    });
});