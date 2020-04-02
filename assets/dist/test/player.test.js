"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("../src/player");
let testPlayer = new player_1.Player({ name: 'Tom' });
test('should default to no matches', () => {
    expect(testPlayer.played).toEqual(0);
    expect(testPlayer.won).toEqual(0);
});
test('should set name', () => {
    let previousLastUpdated = +testPlayer.lastUpdated;
    expect(testPlayer.name).toEqual('Tom');
    testPlayer.setName('Matt');
    expect(testPlayer.name).toEqual('Matt');
    testPlayer.setName('Tom');
    expect(testPlayer.name).toEqual('Tom');
    expect(+testPlayer.lastUpdated).toBeGreaterThan(previousLastUpdated);
});
test('should not set an invalid name', () => {
    expect(testPlayer.name).toEqual('Tom');
    testPlayer.setName(''); // Too short
    expect(testPlayer.name).toEqual('Tom');
    testPlayer.setName('aaaaaaaaaaaaaaaa'); // Too long
    expect(testPlayer.name).toEqual('Tom');
});
test('fromObj(toObj) should equal original', () => {
    testPlayer.won++;
    testPlayer.played += 5;
    expect(player_1.Player.fromObj(testPlayer.toObj())).toMatchObject(testPlayer);
});
