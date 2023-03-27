"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modThree = void 0;
var FSM_1 = require("./FSM");
var config = {
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
function subNumbers(state) {
    return +state.replace(/\D/g, '');
}
function modThreeFSM() {
    var fsm = (0, FSM_1.generateFSM)(config);
    return function (input) { return subNumbers(fsm(input)); };
}
exports.modThree = modThreeFSM();
console.log('test');
