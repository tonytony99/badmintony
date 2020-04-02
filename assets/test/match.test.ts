import { Player } from "../src/player";
import { List } from "../src/list";
import { Team } from "../src/team";
import { Match } from "../src/match";



let testPlayers = new List<Player>(
    [
        new Player({ name: 'Tom' }),
        new Player({ name: 'Sam' }),
        new Player({ name: 'Sam' }),
        new Player({ name: 'Loz' }),
        new Player({ name: 'Ron' })
    ]
);
let testTeams = new List<Team>([
    new Team({ players: testPlayers.getByIndex([0, 1]) }),
    new Team({ players: testPlayers.getByIndex([2, 3]) }),
    new Team({ players: testPlayers.getByIndex([1, 3]) }),
    new Team({ players: testPlayers.getByIndex([0, 2]) }),
]);

let testMatch = new Match({ teams: testTeams.getByIndex([0, 1]) });

test('should default to no points or winner', () => {
    expect(testMatch.score).toEqual([0, 0]);
    expect(testMatch.winner).toEqual(null);
});

test('containsPlayer() returns true iff contains player', () => {
    for (let playerIndex of [0, 1, 2, 3]) {
        expect(testMatch.containsPlayer(<Player>testPlayers.getByIndex(playerIndex))).toBe(true);
    }
    expect(testMatch.containsPlayer(<Player>testPlayers.getByIndex(4))).toBe(false);
    // cannot simply match name
    expect(testMatch.containsPlayer(new Player({ name: 'Tom' }))).toBe(false);
});

test('containsTeam() returns true iff contains team', () => {
    for (let teamIndex of [0, 1]) {
        expect(testMatch.containsTeam(<Team>testTeams.getByIndex(teamIndex))).toBe(true);
    }
    expect(testMatch.containsTeam(<Team>testTeams.getByIndex(2))).toBe(false);
});

test('winning game should update math score and create a new game', () => {
    for (let teamIndex of [0, 1]) {
        for (let pointIndex = 0; pointIndex < 20; pointIndex++) {
            testMatch.addPoint(teamIndex);
        }
        expect(testMatch.games.length()).toEqual(1);
        testMatch.addPoint(teamIndex);
        expect(testMatch.score).toEqual([1 - teamIndex, teamIndex]);
        expect(testMatch.games.length()).toEqual(2);
        testMatch.resetScore();
        expect(testMatch.games.length()).toEqual(1);
    }
});

test('winning more than half of bestOf games should win the match', () => {
    for (let teamIndex of [0, 1]) {
        for (let pointIndex = 0; pointIndex < 41; pointIndex++) {
            testMatch.addPoint(teamIndex);
            expect(testMatch.winner).toEqual(null);
        }
        testMatch.addPoint(teamIndex);
        expect(testMatch.winner).toEqual(teamIndex);
        testMatch.resetScore();
    }
});

test('winning more than half of bestOf games should win the match', () => {
    for (let teamIndex of [0, 1]) {
        for (let pointIndex = 0; pointIndex < 40; pointIndex++) {
            testMatch.addPoint(teamIndex);
            expect(testMatch.winner).toEqual(null);
        }
    }
    testMatch.addPoint(1);
    expect(testMatch.game.score[1]).toEqual(20);
    expect(testMatch.winner).toEqual(null);
    expect(testMatch.score).toEqual([1, 1]);
    testMatch.addPoint(1);
    expect(testMatch.game.score[1]).toEqual(21);
    expect(testMatch.score).toEqual([1, 2]);
    expect(testMatch.winner).toEqual(1);
    // adding point now has no effect
    testMatch.addPoint(1);    
    expect(testMatch.game.score[1]).toEqual(21);
});


test('fromObj(toObj) should equal original', () => {
    expect(Match.fromObj(testMatch.toObj(), testPlayers, testTeams)).toMatchObject(testMatch);
});