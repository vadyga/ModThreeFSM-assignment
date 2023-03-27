export type State = string;
type InputSymbol = string;

interface Transition {
    from: State;
    to: State;
    input: InputSymbol;
}

export interface FSM {
    states: State[];
    alphabet: InputSymbol[];
    initialState: State;
    acceptingStates: State[];
    transitions: Transition[];
}

export function generateFSM(config: FSM): (input: InputSymbol[]) => string {
    const { states, alphabet, initialState, acceptingStates, transitions } = config;

    if(states.indexOf(initialState) === -1) {
        throw new Error('Initial state must be an element of states')
    }

    if(!states.every(state => acceptingStates.includes(state))) {
        throw new Error('States must be a subset of AcceptingStates')
    }

    return function run(inputs: InputSymbol[] = []): string {
        let currentState = initialState;
        for (const input of inputs) {
            if (!alphabet.includes(input)){
                throw new Error(`Unacceptable input ${input}`)
            }
            const transition = transitions.find((t) => t.from === currentState && t.input === input);
            if (!transition) {
                throw new Error('Unknown transition')
            }
            currentState = transition.to;
        }
        return currentState;
    };
}