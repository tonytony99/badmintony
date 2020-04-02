"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class Player extends base_1.Base {
    constructor({ id = undefined, created = undefined, lastUpdated = undefined, name, played = 0, won = 0 }) {
        super({ id: id, created: created, lastUpdated: lastUpdated });
        this.name = name;
        this.played = played;
        this.won = won;
    }
    static fromObj(obj) {
        return new Player(obj);
    }
    toObj() {
        let obj = super.toObj();
        for (let field of ['name', 'played', 'won']) {
            obj[field] = this[field];
        }
        return obj;
    }
    toString() {
        return this.name;
    }
    isValidName(name) {
        return (name && typeof name === "string" && name.length >= 1 && name.length <= 15);
    }
    setName(newName) {
        if (this.isValidName(newName)) {
            this.name = newName;
            this.lastUpdated = new Date();
        }
    }
}
exports.Player = Player;
// console.log(a);
// let b = a.toObj();
// console.log(b);
// let c = Player.fromObj(b);
// console.log(c);
// // console.log("\n\nplayer\n", b);
// // console.log("\n\nplayer.toObj()\n", a.toObj());
// // console.log("\n\nplayer.toJSON()\n", a.toJSON());
