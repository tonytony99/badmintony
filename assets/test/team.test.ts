import { Player } from "../src/player";
import { List } from "../src/list";
import { Team, testTeams } from "../src/team";

let testPlayers = new List<Player>([new Player({ name: 'Tom' }), new Player({ name: 'Sam' })]);

let testTeam = new Team({ players: testPlayers });

test('should default to no matches', () => {
    expect(testTeam.played).toEqual(0);
    expect(testTeam.won).toEqual(0);
});


test('fromObj(toObj) should equal original', () => {
    expect(Team.fromObj(testTeam.toObj(), testPlayers)).toMatchObject(testTeam);
    testTeam.won++;
    testTeam.played += 5;
    expect(Team.fromObj(testTeam.toObj(), testPlayers)).toMatchObject(testTeam);
});