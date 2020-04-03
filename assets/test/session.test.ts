import { Player } from "../src/player";
import { List } from "../src/list";
import { Team } from "../src/team";
import { Match } from "../src/match";
import { Session} from "../src/session";

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
    new Team({ players: testPlayers.getByIndex([2, 4]) }),
    new Team({ players: testPlayers.getByIndex([0, 3]) }),
    new Team({ players: testPlayers.getByIndex([1, 3]) }),
]);

let testMatches = new List<Match>([
    new Match({ teams: testTeams.getByIndex([0, 1]) }),
    new Match({ teams: testTeams.getByIndex([2, 3]) }),
    new Match({ teams: testTeams.getByIndex([2, 4]) }),
    new Match({ teams: testTeams.getByIndex([0, 2]) }),
]);

let testSession = new Session({players: testPlayers, teams: testTeams, matches: <List<Match>>testMatches.getByIndex([0, 1, 2])});

test('getMatchesWithPlayer', () => {
    expect(new List<Match>(testSession.getMatchesWithPlayer(<Player>testPlayers.getByIndex(0)))).toEqual(testMatches.getByIndex([0, 1]));
});

test('getMatchesWithTeam', () => {
    expect(new List<Match>(testSession.getMatchesWithTeam(<Team>testTeams.getByIndex(2)))).toEqual(testMatches.getByIndex([1, 2]));
});

test('deleteMatch should remove only that match', () => {
    expect(testSession.matches).toEqual(testMatches.getByIndex([0, 1, 2]));
    testSession.deleteMatch((<Match>testMatches.getByIndex(2)).id);
    expect(testSession.matches).toEqual(testMatches.getByIndex([0, 1]));
    testSession.addMatch(<Match>testMatches.getByIndex(2));
    expect(testSession.matches).toEqual(testMatches.getByIndex([0, 1, 2]));
});

test('addMatch should add that match', () => {
    expect(testSession.matches).toEqual(testMatches.getByIndex([0, 1, 2]));
    testSession.addMatch(<Match>testMatches.getByIndex(3));
    expect(testSession.matches).toEqual(testMatches.getByIndex([0, 1, 2, 3]));
    testSession.deleteMatch((<Match>testMatches.getByIndex(3)).id);
    expect(testSession.matches).toEqual(testMatches.getByIndex([0, 1, 2]));
});

test('fromObj(toObj) should equal original', () => {
    expect(Session.fromObj(testSession.toObj())).toMatchObject(testSession);
});

test('fromJSON(toJSON) should equal original', () => {
    expect(Session.fromJSON(testSession.toJSON())).toMatchObject(testSession);
});