import { Player } from "../src/player";
import { List } from "../src/list";
import { Game } from "../src/game";

let testPlayers = new List<Player>(
    [
        new Player({ name: 'Tom' }),
        new Player({ name: 'Sam' }),
        new Player({ name: 'Sam' }),
        new Player({ name: 'Loz' }),
        new Player({ name: 'Ron' })
    ]
);

let testGame = new Game(
    {
        court: [
            testPlayers.getByIndex([0, 1]),
            testPlayers.getByIndex([2, 3]),
        ]
    }
)

test('should default to no points or winner', () => {
    expect(testGame.score).toEqual([0, 0]);
    expect(testGame.winner).toEqual(null);
});

test('should populate court correctly', () => {
    expect(testGame.court[0]).toEqual(testPlayers.getByIndex([0, 1]));
    expect(testGame.court[1]).toEqual(testPlayers.getByIndex([2, 3]));
});

test('swapSides should swap players on correct side', () => {
    for (let teamIndex = 0; teamIndex < 2; teamIndex++) {
        expect(testGame.court[teamIndex]).toEqual(testPlayers.getByIndex([2 * teamIndex, 2 * teamIndex + 1]));
        testGame.swapSides(teamIndex);
        expect(testGame.court[teamIndex].getByIndex(0)).toEqual(testPlayers.getByIndex(2 * teamIndex + 1));
        expect(testGame.court[teamIndex].getByIndex(1)).toEqual(testPlayers.getByIndex(2 * teamIndex));
        expect(testGame.court[1 - teamIndex]).toEqual(testPlayers.getByIndex([2 * (1 - teamIndex), 2 * (1 - teamIndex) + 1]));
        testGame.swapSides(teamIndex);
        expect(testGame.court[teamIndex]).toEqual(testPlayers.getByIndex([2 * teamIndex, 2 * teamIndex + 1]));
        expect(testGame.court[1 - teamIndex]).toEqual(testPlayers.getByIndex([2 * (1 - teamIndex), 2 * (1 - teamIndex) + 1]));
    }
});

test('add point should swap sides if serving', () => {
    let pointIndex = 0;
    for (let pointIndex = 0; pointIndex < 4; pointIndex++) {
        for (let teamIndex = 0; teamIndex < 2; teamIndex++) {
            testGame.setService(teamIndex, 1 - pointIndex % 2);
            expect(testGame.court[teamIndex].getByIndex(0)).toEqual(testPlayers.getByIndex(2 * teamIndex + pointIndex % 2));
            expect(testGame.court[teamIndex].getByIndex(1)).toEqual(testPlayers.getByIndex(2 * teamIndex + 1 - pointIndex % 2));
            expect(testGame.servingTeam).toEqual(teamIndex);
            expect(testGame.servingSide).toEqual(1 - pointIndex % 2);

            testGame.addPoint(teamIndex);

            expect(testGame.court[teamIndex].getByIndex(0)).toEqual(testPlayers.getByIndex(2 * teamIndex + 1 - pointIndex % 2));
            expect(testGame.court[teamIndex].getByIndex(1)).toEqual(testPlayers.getByIndex(2 * teamIndex + pointIndex % 2));
            expect(testGame.servingTeam).toEqual(teamIndex);
            expect(testGame.servingSide).toEqual(pointIndex % 2);
            expect(testGame.servingSide).toEqual(pointIndex % 2)
        }
    }
});

test('add point should not swap sides if not serving', () => {
    let pointIndex = 0;
    for (let teamIndex = 0; teamIndex < 2; teamIndex++) {
        testGame.setService(1 - teamIndex, 1 - pointIndex % 2);
        expect(testGame.court[teamIndex].getByIndex(0)).toEqual(testPlayers.getByIndex(2 * teamIndex + pointIndex % 2));
        expect(testGame.court[teamIndex].getByIndex(1)).toEqual(testPlayers.getByIndex(2 * teamIndex + 1 - pointIndex % 2));
        expect(testGame.servingTeam).toEqual(1 - teamIndex);
        expect(testGame.servingSide).toEqual(1 - pointIndex % 2);

        testGame.addPoint(teamIndex);

        expect(testGame.court[teamIndex].getByIndex(0)).toEqual(testPlayers.getByIndex(2 * teamIndex + pointIndex % 2));
        expect(testGame.court[teamIndex].getByIndex(1)).toEqual(testPlayers.getByIndex(2 * teamIndex + 1 - pointIndex % 2));
        expect(testGame.servingTeam).toEqual(teamIndex);
        expect(testGame.servingSide).toEqual(pointIndex % 2);
    }
});

test('add point should increase score', () => {
    testGame.resetScore();
    testGame.addPoint(0);
    expect(testGame.score).toEqual([1, 0]);
    testGame.addPoint(0);
    expect(testGame.score).toEqual([2, 0]);
    testGame.addPoint(1);
    expect(testGame.score).toEqual([2, 1]);
    testGame.addPoint(1);
    expect(testGame.score).toEqual([2, 2]);
});

test('add point should not increase score past limit', () => {
    for (let teamIndex of [0, 1]) {
        testGame.resetScore();
        for (let pointIndex = 1; pointIndex < 50; pointIndex++) {
            testGame.addPoint(teamIndex);
            expect(testGame.score[teamIndex]).toEqual(Math.min(pointIndex, testGame.firstTo));
            expect(testGame.score[1 - teamIndex]).toEqual(0);
        }
    }
});

test('reaching score limit should set winner', () => {
    for (let teamIndex of [0, 1]) {
        testGame.resetScore();
        for (let pointIndex = 1; pointIndex < 50; pointIndex++) {
            testGame.addPoint(teamIndex);
            expect(testGame.winner).toEqual(testGame.score[teamIndex] >= testGame.firstTo ? teamIndex : null);
        }
    }
});

test('winning requires 2 clear points or upper limit', () => {
    // 2 clear points
    for (let teamIndex of [0, 1]) {
        testGame.resetScore();
        for (let pointIndex = 1; pointIndex < testGame.firstTo; pointIndex++) {
            testGame.addPoint(teamIndex);
            testGame.addPoint(1 - teamIndex);
        }
        testGame.addPoint(teamIndex);
        expect(testGame.winner).toEqual(null);
        testGame.addPoint(teamIndex);
        expect(testGame.winner).toEqual(teamIndex)
    }
    // upper limit
    for (let teamIndex of [0, 1]) {
        testGame.resetScore();
        for (let pointIndex = 1; pointIndex < testGame.upperLimit; pointIndex++) {
            testGame.addPoint(teamIndex);
            testGame.addPoint(1 - teamIndex);
        }
        expect(testGame.winner).toEqual(null);
        testGame.addPoint(teamIndex);
        expect(testGame.winner).toEqual(teamIndex)
    }
});

test('fromObj(toObj) should equal original', () => {
    expect(Game.fromObj(testGame.toObj(), testPlayers)).toMatchObject(testGame);
});