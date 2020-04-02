"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("./list");
const team_1 = require("./team");
const game_1 = require("./game");
const timable_1 = require("./timable");
class Match extends timable_1.Timable {
    constructor({ id = undefined, created = undefined, lastUpdated = undefined, score = [0, 0], winner = null, firstTo = 21, upperLimit = 30, bestOf = 3, teams, games = new list_1.List([]), began = null, ended = null, duration = null }) {
        super({ id: id, created: created, lastUpdated: lastUpdated, began: began, ended: ended, duration: duration });
        this.score = score;
        this.winner = winner;
        this.firstTo = firstTo;
        this.upperLimit = upperLimit;
        this.bestOf = bestOf;
        this.teams = teams;
        this.games = games;
        if (this.games.length() === 0) {
            let newGame = new game_1.Game({
                court: [
                    new list_1.List([
                        teams.getByIndex(0).players.getByIndex(1),
                        teams.getByIndex(0).players.getByIndex(0),
                    ]),
                    new list_1.List([
                        teams.getByIndex(1).players.getByIndex(0),
                        teams.getByIndex(1).players.getByIndex(1),
                    ]),
                ]
            });
            this.games = new list_1.List([newGame]);
        }
        this.game = this.games.getByIndex(-1);
    }
    static fromObj(obj, allPlayersList, allTeamsList) {
        let games = new list_1.List([]);
        for (let game of obj['games']) {
            games.add(game_1.Game.fromObj(game, allPlayersList));
        }
        let teams = new list_1.List([]);
        for (let teamId of obj['teams']) {
            teams.add(allTeamsList.getById(teamId));
        }
        obj['games'] = games;
        obj['teams'] = teams;
        return new Match(obj);
    }
    toObj() {
        let obj = super.toObj();
        obj['games'] = [];
        for (let gameIndex = 0; gameIndex < this.games.length(); gameIndex++) {
            obj['games'].push(this.games.getByIndex(gameIndex).toObj());
        }
        obj['teams'] = this.teams.getFieldArray("id");
        for (let field of ['score', 'winner', 'firstTo', 'upperLimit', 'bestOf', 'began', 'ended', 'duration']) {
            obj[field] = this[field];
        }
        return JSON.parse(JSON.stringify(obj));
    }
    getWinner() {
        for (let team of [0, 1]) {
            if (this.score[team] >= this.bestOf / 2) {
                return team;
            }
        }
        return null;
    }
    updateWinner() {
        this.winner = this.getWinner();
    }
    swapSides(team) {
        this.game.swapSides(team);
    }
    addPoint(team) {
        if (this.winner !== null) {
            return;
        }
        this.game.addPoint(team);
        if (this.game.winner !== null) {
            this.score[team]++;
            this.updateWinner();
            if (this.winner !== null) {
                return;
            }
            this.game = this.game.copy();
            this.game.resetScore();
            this.game.servingTeam = team;
            this.game.servingSide = 0;
            this.games.add(this.game);
        }
    }
    containsPlayer(player) {
        for (let teamIndex of [0, 1]) {
            if (this.teams.getByIndex(teamIndex).players.contains(player)) {
                return true;
            }
        }
        return false;
    }
    containsTeam(team) {
        return this.teams.contains(team);
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
        return str;
    }
}
exports.Match = Match;
let testTeamsList = new list_1.List([team_1.testTeams[0], team_1.testTeams[1]]);
let testMatch = new Match({ teams: testTeamsList });
testMatch.begin();
for (let i = 0; i < 100000; i++) {
    let b = Math.pow(23, 0.12);
}
// testMatch.updateDuration();
// console.log(testMatch);
// console.log("------------------------------");
// console.log(Match.fromObj(testMatch.toObj(), new List<Player>(testPlayers)));
exports.testMatches = [testMatch];
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
