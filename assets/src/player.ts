import { Base } from "./base";

export class Player extends Base {
    public name: string;
    public played: number;
    public won: number;
    constructor({ id = undefined, created = undefined, lastUpdated = undefined, name, played = 0, won = 0 }) {
        super({ id: id, created: created, lastUpdated: lastUpdated });
        this.name = name;
        this.played = played;
        this.won = won;
    }

    static fromObj(obj) {
        return new Player(obj)
    }

    toObj() {
        let obj = super.toObj();
        for (let field of ['name', 'played', 'won']) {
            obj[field] = this[field];
        }
        return obj
    }

    toString() {
        return this.name
    }

    isValidName(name: string) {
        return (name && typeof name === "string" && name.length >= 1 && name.length < 16)
    }

    setName(newName: string) {
        if (this.isValidName) {
            this.name = newName;
            this.lastUpdated = new Date();
        }
    }
}


let testPlayer1 = new Player({name: 'A 1'});
let testPlayer2 = new Player({name: 'B 2'});
let testPlayer3 = new Player({name: 'C 3'});
let testPlayer4 = new Player({name: 'D 4'});
let testPlayer5 = new Player({name: 'E 5'});
export const testPlayers = [testPlayer1, testPlayer2, testPlayer3, testPlayer4, testPlayer5];

// console.log(a);
// let b = a.toObj();
// console.log(b);
// let c = Player.fromObj(b);
// console.log(c);
// // console.log("\n\nplayer\n", b);
// // console.log("\n\nplayer.toObj()\n", a.toObj());
// // console.log("\n\nplayer.toJSON()\n", a.toJSON());