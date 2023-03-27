import {generateFSM, FSM, State} from './FSM'

const config: FSM = {
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

/**
 * I thought we can do variate of things with final state.
 * Here the only conversion as specified in your table.
 * @param {string} state - The output state
 */
function subNumbers(state: State) : number {
    return +state.replace(/\D/g, '')
}

function modThreeFSM(): (input: string[]) => number {
    const fsm = generateFSM(config);

    return (input: string[]): number => subNumbers(fsm(input));
}

export const modThree = modThreeFSM();