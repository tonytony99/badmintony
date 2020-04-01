import {Base} from "./base";

export class Player extends Base {
    public name: string;
    public played: number;
    public won: number;
    constructor ({id = undefined, created = undefined, lastUpdated = undefined, name, played = 0, won = 0}) {
        super({id: id, created: created, lastUpdated: lastUpdated});
        this.name = name;
        this.played = played;
        this.won = won;
    }

    toString() {
        return this.name
    }

    toObj() {
        let obj = super.toObj();
        for (let field of ['name', 'played', 'won']) {
            obj[field] = this[field];
        }
        return obj
    }

    toJSON() {
        let obj = this.toObj();
        return JSON.stringify(obj);
    }
}


// let a = new Player({name: 'tony'});
// console.log("\n\nplayer\n", a);
// console.log("\n\nplayer.toObj()\n", a.toObj());
// console.log("\n\nplayer.toJSON()\n", a.toJSON());