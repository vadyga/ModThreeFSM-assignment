import { generateFSM } from './FSM';

describe('generateFSM', () => {
    const fsmConfig = {
        states: ['S0', 'S1', 'S2'],
        alphabet: ['0', '1'],
        initialState: 'S0',
        acceptingStates: ['S0', 'S1', 'S2'],
        transitions: [
            { from: 'S0', to: 'S0', input: '0' },
            { from: 'S0', to: 'S1', input: '1' },
            { from: 'S1', to: 'S2', input: '0' },
            { from: 'S1', to: 'S0', input: '1' },
            { from: 'S2', to: 'S1', input: '0' },
            { from: 'S2', to: 'S2', input: '1' },
        ],
    };

    it('should return a function that accepts an array of input symbols and returns the final state', () => {
        const fsm = generateFSM(fsmConfig);
        expect(fsm).toBeInstanceOf(Function);

        expect(fsm(['0', '1', '0', '1'])).toBe('S2');
        expect(fsm(['1', '1', '0', '0'])).toBe('S0');
        expect(fsm(['1', '0'])).toBe('S2');
    });

    it('should throw an error if the initial state is not an element of states', () => {
        const invalidConfig = { ...fsmConfig, initialState: 'invalid' };
        expect(() => generateFSM(invalidConfig)).toThrowError('Initial state must be an element of states');
    });

    it('should throw an error if any state in states is not in acceptingStates', () => {
        const invalidConfig = { ...fsmConfig, acceptingStates: ['S0', 'invalid'] };
        expect(() => generateFSM(invalidConfig)).toThrowError('States must be a subset of AcceptingStates');
    });

    it('should throw an error if an input symbol is not in the alphabet', () => {
        const fsm = generateFSM(fsmConfig);
        expect(() => fsm(['0', '1', '2'])).toThrowError('Unacceptable input 2');
    });

    it('should throw an error if there is no transition for the given input symbol in the current state', () => {
        const fsm = generateFSM(fsmConfig);
        const invalidConfig = { ...fsmConfig, transitions: [{ from: 'S0', to: 'S0', input: '0' }] };
        expect(() => generateFSM(invalidConfig)(['1'])).toThrowError('Unknown transition');
    });

    it('should not throw an error for an undefined or empty input array', () => {
        const fsm = generateFSM(fsmConfig);
        expect(() => fsm([])).not.toThrow();
        expect(() => fsm()).not.toThrow();
    });
});