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
]);

let testSession = new Session({players: testPlayers, teams: testTeams, matches: testMatches});

test('getMatchesWithPlayer', () => {
    expect(new List<Match>(testSession.getMatchesWithPlayer(<Player>testPlayers.getByIndex(0)))).toEqual(testMatches.getByIndex([0, 1]));
});

test('getMatchesWithTeam', () => {
    expect(new List<Match>(testSession.getMatchesWithTeam(<Team>testTeams.getByIndex(2)))).toEqual(testMatches.getByIndex([1, 2]));
});

test('fromObj(toObj) should equal original', () => {
    expect(Session.fromObj(testSession.toObj())).toMatchObject(testSession);
});