import { Base } from "./base";
// import { Player, testPlayers } from "./player";
// import Player = require("./player");
import { Player } from "./player";
import { List } from "./list";
import { Team, testTeams } from "./team";
import { Game } from "./game";
import { Timable } from "./timable";



export class Match extends Timable {

    public score: number[];
    public winner: number;
    public firstTo: number;
    public upperLimit: number;
    public bestOf: number;

    public teams: List<Team>;
    public games: List<Game>;
    public game: Game;

    constructor({ id = undefined, created = undefined, lastUpdated = undefined,
        score = [0, 0], winner = null,
        firstTo = 21, upperLimit = 30, bestOf = 3,
        teams, games = new List<Game>([]),
        began = null, ended = null, duration = null
    }) {
        super({ id: id, created: created, lastUpdated: lastUpdated, began: began, ended: ended, duration: duration });
        this.score = score;
        this.winner = winner;
        this.firstTo = firstTo;
        this.upperLimit = upperLimit;
        this.bestOf = bestOf;

        this.teams = teams;

        this.games = games;
        if (this.games.length() === 0) {
            let newGame = new Game({
                court: [
                    new List<Player>([
                        <Player>(<Team>teams.getByIndex(0)).players.getByIndex(1),
                        <Player>(<Team>teams.getByIndex(0)).players.getByIndex(0),
                    ]),
                    new List<Player>([
                        <Player>(<Team>teams.getByIndex(1)).players.getByIndex(0),
                        <Player>(<Team>teams.getByIndex(1)).players.getByIndex(1),
                    ]),
                ]
            });
            this.games = new List<Game>([newGame]);
        }
        this.game = <Game>this.games.getByIndex(-1);

    }

    static fromObj(obj, allPlayersList: List<Player>, allTeamsList: List<Team>): Match {
        let games = new List<Game>([]);
        for (let game of obj['games']) {
            games.add(Game.fromObj(game, allPlayersList));
        }
        let teams = new List<Team>([]);
        for (let teamId of obj['teams']) {
            teams.add(allTeamsList.getById(teamId));
        }
        obj['games'] = games;
        obj['teams'] = teams;
        return new Match(obj)
    }


    toObj() {
        let obj = super.toObj();
        obj['games'] = [];
        for (let gameIndex = 0; gameIndex < this.games.length(); gameIndex++) {
            obj['games'].push((<Game>this.games.getByIndex(gameIndex)).toObj());
        }

        obj['teams'] = this.teams.getFieldArray("id");
        for (let field of ['score', 'winner', 'firstTo', 'upperLimit', 'bestOf', 'began', 'ended', 'duration']) {
            obj[field] = this[field];
        }
        return JSON.parse(JSON.stringify(obj))
    }

    getWinner(): number {
        for (let team of [0, 1]) {
            if (this.score[team] >= this.bestOf / 2) {
                return team
            }
        }
        return null
    }

    updateWinner(): void {
        this.winner = this.getWinner();
    }

    swapSides(team: number): void {
        this.game.swapSides(team);
    }

    addPoint(team: number): void {
        if (this.winner !== null) {
            return
        }
        this.game.addPoint(team);
        if (this.game.winner !== null) {
            this.score[team]++;
            this.updateWinner();
            if (this.winner !== null) {
                return
            }
            this.game = this.game.copy();
            this.game.resetScore();
            this.game.servingTeam = team;
            this.game.servingSide = 0;
            this.games.add(this.game);
        }
    }

    resetScore() {
        let firstGame = <Game>this.games.getByIndex(0);
        this.score = [0, 0];
        this.winner = null;
        this.games.empty();
        firstGame.resetScore();
        this.games.add(firstGame);
        this.game = firstGame;
    }

    containsPlayer(player: Player) {
        for (let teamIndex of [0, 1]) {
            if ((<Team>this.teams.getByIndex(teamIndex)).players.contains(player)) {
                return true
            }
        }
        return false
    }

    containsTeam(team: Team) {
        return this.teams.contains(team)
    }

    toString() {
        let str = "Match\n";
        str += " winner:" + this.winner + "\n";
        str += " " + this.teams.getByIndex(0).toString() + " | " + this.score[0] + "\n";
        str += " " + this.teams.getByIndex(1).toString() + " | " + this.score[1];
        for (let gameIndex = 0; gameIndex < this.games.length(); gameIndex++) {
            str += "\nGame " + gameIndex + "\n";
            str += this.games.getByIndex(gameIndex).toString();
        }
        return str
    }

}


let testTeamsList = new List<Team>([testTeams[0], testTeams[1]]);
let testMatch = new Match({ teams: testTeamsList });
testMatch.begin();
for (let i = 0; i < 100000; i ++) {
    let b = 23 ** 0.12;
}
// testMatch.updateDuration();
// console.log(testMatch);
// console.log("------------------------------");
// console.log(Match.fromObj(testMatch.toObj(), new List<Player>(testPlayers)));

// export const testMatches = [testMatch];

// // console.log(testMatch.toObj());
// console.log(testMatch.toString());
// testMatch.addPoint(0);
// console.log("----------------------");
// console.log(testMatch.toString());
// console.log(testMatch.toObj());
// console.log("--------------");
// for (let i = 0; i < 80; i++) {
//     testMatch.addPoint(Math.round(Math.random()));
//     console.log(testMatch.toString());
//     console.log("--------------");
// }
// testMatch.swapSides(1);
// console.log(testMatch.toString());
// console.log("--------------");