"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
// import { Player, testPlayers } from "./player";
const Player = require("./player");
const list_1 = require("./list");
class Team extends base_1.Base {
    constructor({ id = undefined, created = undefined, lastUpdated = undefined, played = 0, won = 0, players }) {
        super({ id: id, created: created, lastUpdated: lastUpdated });
        this.players = players;
        this.played = played;
        this.won = won;
    }
    static fromObj(obj, allPlayersList) {
        let playerIds = obj.players;
        let players = allPlayersList.getByIds(playerIds);
        obj['players'] = players;
        return new Team(obj);
    }
    toObj() {
        let obj = super.toObj();
        obj["players"] = this.players.getFieldArray("id");
        for (let field of ['played', 'won']) {
            obj[field] = this[field];
        }
        return obj;
    }
    toString() {
        let playerNames = this.players.getFieldArray("name");
        return playerNames.join("/");
    }
}
exports.Team = Team;
// // console.log("D")
let testPlayer1 = new Player({ name: 'A 1' });
let testPlayer2 = new Player({ name: 'B 2' });
let testPlayer3 = new Player({ name: 'C 3' });
let testPlayer4 = new Player({ name: 'D 4' });
let testPlayer5 = new Player({ name: 'E 5' });
let testPlayers = [testPlayer1, testPlayer2, testPlayer3, testPlayer4, testPlayer5];
let testPlayersList = new list_1.List(testPlayers);
exports.testTeams = [
    new Team({ players: testPlayersList.getByIndex([0, 1]) }),
    new Team({ players: testPlayersList.getByIndex([2, 3]) })
];
// // let e = Team.fromObj({players: [89, 88]}, players);
// console.log(d);
// console.log(d.toObj());
// console.log(Team.fromObj(d.toObj(), players));
// let f = Team.fromObj({players: [88, 89]}, players);
// console.log(f.toString());
// // console.log(d.toString());
