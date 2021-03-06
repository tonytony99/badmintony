import { Base } from "./base";
// import { Player, testPlayers } from "./player";
// import Player = require("./player");
import { Player } from "./player";
import { List } from "./list";

export class Team extends Base {

    public players: List<Player>;
    public played: number;
    public won: number;

    constructor({ id = undefined, created = undefined, lastUpdated = undefined, played = 0, won = 0, players }) {
        super({ id: id, created: created, lastUpdated: lastUpdated });
        this.players = players;
        this.played = played;
        this.won = won;
    }

    static fromObj(obj, allPlayersList: List<Player>): Team {
        let playerIds = obj.players;
        let players = allPlayersList.getByIds(playerIds);
        obj['players'] = players;
        return new Team(obj)
    }

    toObj() {
        let obj = super.toObj();
        obj["players"] = this.players.getFieldArray("id");
        for (let field of ['played', 'won']) {
            obj[field] = this[field];
        }
        return obj
    }

    toString(): string {
        let playerNames = this.players.getFieldArray("name");
        return playerNames.join("/");
    }

}

// // console.log("D")


let testPlayer1 = new Player({name: 'A 1'});
let testPlayer2 = new Player({name: 'B 2'});
let testPlayer3 = new Player({name: 'C 3'});
let testPlayer4 = new Player({name: 'D 4'});
let testPlayer5 = new Player({name: 'E 5'});
let testPlayers = [testPlayer1, testPlayer2, testPlayer3, testPlayer4, testPlayer5];
let testPlayersList = new List<Player>(testPlayers);
export const testTeams = [
    new Team({ players: testPlayersList.getByIndex([0, 1]) }),
    new Team({ players: testPlayersList.getByIndex([2, 3]) })
]
// // let e = Team.fromObj({players: [89, 88]}, players);
// console.log(d);
// console.log(d.toObj());
// console.log(Team.fromObj(d.toObj(), players));
// let f = Team.fromObj({players: [88, 89]}, players);
// console.log(f.toString());
// // console.log(d.toString());