"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("./player");
const list_1 = require("./list");
const team_1 = require("./team");
const match_1 = require("./match");
const timable_1 = require("./timable");
class Session extends timable_1.Timable {
    // public proposedPlayer: Player;
    // public proposedMatch: Match;
    constructor({ id = undefined, created = undefined, lastUpdated = undefined, players = new list_1.List([]), teams = new list_1.List([]), matches = new list_1.List([]), began = null, ended = null, duration = null }) {
        super({ id: id, created: created, lastUpdated: lastUpdated, began: began, ended: ended, duration: duration });
        this.players = players;
        this.teams = teams;
        this.matches = matches;
    }
    static fromObj(obj) {
        let players = new list_1.List([]);
        for (let player of obj['players']) {
            players.add(player_1.Player.fromObj(player));
        }
        let teams = new list_1.List([]);
        for (let team of obj['teams']) {
            teams.add(team_1.Team.fromObj(team, players));
        }
        let matches = new list_1.List([]);
        for (let match of obj['matches']) {
            matches.add(match_1.Match.fromObj(match, players, teams));
        }
        obj['players'] = players;
        obj['teams'] = teams;
        obj['matches'] = matches;
        return new Session(obj);
    }
    static fromJSON(str) {
        return Session.fromObj(JSON.parse(str));
    }
    toObj() {
        let obj = super.toObj();
        obj['players'] = this.players.toObj();
        obj['teams'] = this.teams.toObj();
        obj['matches'] = this.matches.toObj();
        return obj;
    }
    toJSON() {
        return JSON.stringify(this.toObj(), null, 4);
    }
    getMatch(matchId) {
        return this.matches.getById(matchId);
    }
    addMatch(newMatch) {
        this.matches.add(newMatch);
        this.teams.addIfUnique(newMatch.teams.getByIndex(0));
        this.teams.addIfUnique(newMatch.teams.getByIndex(1));
    }
    deleteMatch(matchId) {
        this.matches.removeById(matchId);
    }
    getMatchesWithPlayer(player) {
        let playerMatches = [];
        for (let matchIndex = 0; matchIndex < this.matches.length(); matchIndex++) {
            let match = this.matches.getByIndex(matchIndex);
            if (match.containsPlayer(player)) {
                playerMatches.push(match);
            }
        }
        return playerMatches;
    }
    getMatchesWithTeam(team) {
        let teamMatches = [];
        for (let matchIndex = 0; matchIndex < this.matches.length(); matchIndex++) {
            let match = this.matches.getByIndex(matchIndex);
            if (match.containsTeam(team)) {
                teamMatches.push(match);
            }
        }
        return teamMatches;
    }
    setMatches(newMatches) {
        this.matches.empty();
        for (let newMatch of newMatches) {
            this.addMatch(newMatch);
        }
    }
}
exports.Session = Session;
let testSession = new Session({ players: new list_1.List(player_1.testPlayers), teams: new list_1.List(team_1.testTeams), matches: new list_1.List(match_1.testMatches) });
testSession.begin();
// console.log(testSession.matches.getByIndex(0).teams.getByIndex(0).players);
console.log(testSession);
// console.log(testSession.toObj());
// console.log(Session.fromObj(testSession.toObj()).matches.getByIndex(0).teams.getByIndex(0).players);
// console.log(testSession.toJSON());
console.log(Session.fromJSON(testSession.toJSON()));
