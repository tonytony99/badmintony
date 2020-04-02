import { Base } from "./base";
import { Player, testPlayers } from "./player";
import { List } from "./list";
import { Team, testTeams } from "./team";
import { Match, testMatches } from "./match";
import { Timable } from "./timable";

export class Session extends Timable {
    public players: List<Player>;
    public teams: List<Team>;
    public matches: List<Match>;

    // public proposedPlayer: Player;
    // public proposedMatch: Match;


    constructor({ id = undefined, created = undefined, lastUpdated = undefined,
        players = new List<Player>([]), teams = new List<Team>([]), matches = new List<Match>([]),
        began = null, ended = null, duration = null
    }) {
        super({ id: id, created: created, lastUpdated: lastUpdated, began: began, ended: ended, duration: duration });
        this.players = players;
        this.teams = teams;
        this.matches = matches;
    }

    static fromObj(obj): Session {
        let players = new List<Player>([]);
        for (let player of obj['players']) {
            players.add(Player.fromObj(player));
        }
        let teams = new List<Team>([]);
        for (let team of obj['teams']) {
            teams.add(Team.fromObj(team, players));
        }
        let matches = new List<Match>([]);
        for (let match of obj['matches']) {
            matches.add(Match.fromObj(match, players, teams));
        }
        obj['players'] = players;
        obj['teams'] = teams;
        obj['matches'] = matches;

        return new Session(obj)
    }

    static fromJSON(str) {
        return Session.fromObj(JSON.parse(str))
    }


    toObj() {
        let obj = super.toObj();
        obj['players'] = this.players.toObj();
        obj['teams'] = this.teams.toObj();
        obj['matches'] = this.matches.toObj();
        return obj
    }

    toJSON() {
        return JSON.stringify(this.toObj(), null, 4)
    }

    getMatch(matchId: number): Match | null {
        return this.matches.getById(matchId);
    }

    addMatch(newMatch: Match) {
        this.matches.add(newMatch);
        this.teams.addIfUnique(<Team>newMatch.teams.getByIndex(0));
        this.teams.addIfUnique(<Team>newMatch.teams.getByIndex(1));
    }

    deleteMatch(matchId: number) {
        this.matches.removeById(matchId);
    }

    getMatchesWithPlayer(player: Player): Match[] {
        let playerMatches = [];
        for (let matchIndex = 0; matchIndex < this.matches.length(); matchIndex++) {
            let match = <Match>this.matches.getByIndex(matchIndex);
            if (match.containsPlayer(player)) {
                playerMatches.push(match);
            }
        }
        return playerMatches
    }

    getMatchesWithTeam(team: Team): Match[] {
        let teamMatches = [];
        for (let matchIndex = 0; matchIndex < this.matches.length(); matchIndex++) {
            let match = <Match>this.matches.getByIndex(matchIndex);
            if (match.containsTeam(team)) {
                teamMatches.push(match);
            }
        }
        return teamMatches
    }

    setMatches(newMatches: Match[]) {
        this.matches.empty();
        for (let newMatch of newMatches) {
            this.addMatch(newMatch);
        }
    }

}

let testSession = new Session({players: new List<Player>(testPlayers), teams: new List<Team>(testTeams), matches: new List<Match>(testMatches)});
testSession.begin();
// console.log(testSession.matches.getByIndex(0).teams.getByIndex(0).players);
console.log(testSession);
// console.log(testSession.toObj());
// console.log(Session.fromObj(testSession.toObj()).matches.getByIndex(0).teams.getByIndex(0).players);
// console.log(testSession.toJSON());
console.log(Session.fromJSON(testSession.toJSON()));



