"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFSM = void 0;
function generateFSM(config) {
    var states = config.states, alphabet = config.alphabet, initialState = config.initialState, acceptingStates = config.acceptingStates, transitions = config.transitions;
    if (states.indexOf(initialState) === -1) {
        throw new Error('Initial state must be an element of states');
    }
    if (!states.every(function (state) { return acceptingStates.includes(state); })) {
        throw new Error('States must be a subset of AcceptingStates');
    }
    return function run(inputs) {
        if (inputs === void 0) { inputs = []; }
        var currentState = initialState;
        var _loop_1 = function (input) {
            if (!alphabet.includes(input)) {
                throw new Error("Unacceptable input ".concat(input));
            }
            var transition = transitions.find(function (t) { return t.from === currentState && t.input === input; });
            if (!transition) {
                throw new Error('Unknown transition');
            }
            currentState = transition.to;
        };
        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var input = inputs_1[_i];
            _loop_1(input);
        }
        return currentState;
    };
}
exports.generateFSM = generateFSM;
