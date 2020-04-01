import {Base} from "./base";
import {Player} from "./player";
import {List} from "./list";

class Team extends Base {

    public players: List<Player>;
    public played: number;
    public won: number;

    constructor ({id = undefined, created = undefined, lastUpdated = undefined, played = 0, won = 0, players}) {
        super({id: id, created: created, lastUpdated: lastUpdated});
        this.players = players;
        this.played = played;
        this.won = won;
    }

    static fromObj(obj, allPlayersList: List<Player>): Team {
        let playerIds = obj.players;
        let players = allPlayersList.getByIds(playerIds);
        return new Team({players: players, id: obj.id, created: obj.created, lastUpdated: obj.lastUpdated})
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
// let players = new List<Player>([new Player({name: "Tom", id: 89}),  new Player({name: "Samuel", id: 88})]);
// let d = new Team({players: players.getByIndex([0, 1])});
// // let e = Team.fromObj({players: [89, 88]}, players);
// console.log(d);
// console.log(d.toObj());
// console.log(Team.fromObj(d.toObj(), players));
// let f = Team.fromObj({players: [88, 89]}, players);
// console.log(f.toString());
// // console.log(d.toString());