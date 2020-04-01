import {Base} from "./base";
import {Player} from "./player";
import {List} from "./list";

class Team extends Base {

    public players: List<Player>;

    constructor ({id = undefined, created = undefined, lastUpdated = undefined, players}) {
        super({id: id, created: created, lastUpdated: lastUpdated});
        this.players = players;
    }

    toString(): string {
        let playerNames = this.players.getFieldArray("name");
        return playerNames.join("/");
    }

    static fromObj(obj, allPlayersList: List<Player>): Team {
        let playerIds = obj.players;
        let players = allPlayersList.getByIds(playerIds);
        return new Team({players: players, id: obj.id, created: obj.created, lastUpdated: obj.lastUpdated})
    }
}

// console.log("D")
// let players = new List<Player>([new Player({name: "Tom", id: 89}),  new Player({name: "Samuel", id: 88})]);
// let d = new Team({players: players.getByIndex([0, 1])});
// let e = Team.fromObj({players: [89, 88]}, players);
// console.log(e.toString());
// let f = Team.fromObj({players: [88, 89]}, players);
// console.log(f.toString());
// // console.log(d.toString());