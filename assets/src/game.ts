import { Base } from "./base";
// import { Player, testPlayers } from "./player";
// import Player = require("./player");
import { Player } from "./player";

import { List } from "./list";
import { Team } from "./team";

export class Game extends Base {

    public score: number[];
    public winner: number;
    public firstTo: number;
    public upperLimit: number;
    public servingTeam: number;
    public servingSide: number;
    public court: List<Player>[];

    constructor({ id = undefined, created = undefined, lastUpdated = undefined,
        score = [0, 0], winner = null, servingTeam = 0, servingSide = 1,
        firstTo = 21, upperLimit = 30, court }) {
        super({ id: id, created: created, lastUpdated: lastUpdated });
        this.score = score;
        this.winner = winner;
        this.firstTo = firstTo;
        this.upperLimit = upperLimit;
        this.servingTeam = servingTeam;
        this.servingSide = servingSide;
        this.court = court;
    }

    static fromObj(obj, allPlayersList: List<Player>): Game {
        let court = [allPlayersList.getByIds(obj.court[0]), allPlayersList.getByIds(obj.court[1])];
        obj['court'] = court;
        return new Game(obj)
    }

    toObj() {
        let obj = super.toObj();
        obj["court"] = [this.court[0].getFieldArray("id"), this.court[1].getFieldArray("id")];
        for (let field of ['score', 'winner', 'firstTo', 'upperLimit', 'servingTeam', 'servingSide']) {
            obj[field] = this[field];
        }
        return JSON.parse(JSON.stringify(obj))
    }

    copy(): Game {
        return new Game({
            score: JSON.parse(JSON.stringify(this.score)),
            winner: this.winner,
            firstTo: this.firstTo,
            upperLimit: this.upperLimit,

            servingTeam: this.servingTeam,
            servingSide: this.servingSide,

            court: [
                this.court[0].shallowCopy(),
                this.court[1].shallowCopy()
            ]
        })
    }



    getOppositeTeam(team: number): number {
        return 1 - team
    }

    getWinner(): number {
        for (let team of [0, 1]) {
            let oppositeTeam = this.getOppositeTeam(team);
            if (this.score[team] >= this.firstTo) {
                if (this.score[team] >= (this.score[oppositeTeam] + 2)) {
                    return team
                }
                if (this.score[team] >= this.upperLimit) {
                    return team
                }
            }
        }
        return null
    }

    updateWinner(): void {
        this.winner = this.getWinner();
    }

    swapSides(team: number): void {
        let previousLeft = <Player>this.court[team].getByIndex(0);
        this.court[team].replaceAtIndex(0, <Player>this.court[team].getByIndex(1));
        this.court[team].replaceAtIndex(1, previousLeft);
    }

    addPoint(team: number): void {
        let oppositeTeam = this.getOppositeTeam(team);
        if (this.winner !== null) {
            return
        }
        this.score[team] ++;
        this.updateWinner();
        if (this.winner !== null) {
            return
        }
        if (this.servingTeam == team) {
            this.swapSides(team);
        } else {
            this.servingTeam = team;
        }
        this.servingSide = 1 - this.score[team] % 2;
        if (this.court[oppositeTeam].getByIndex(this.servingSide) === null) {
            this.swapSides(oppositeTeam);
        }        
    }

    resetScore() {
        this.score.splice(0, 2);
        this.score.push(0, 0);
        this.winner = null;
    }

    setService(serviceTeam: number, serviceSide: number) {
        this.servingTeam = serviceTeam;
        this.servingSide = serviceSide;
    }

    toString(): string {
        let str = "";
        for (let teamIndex of [0, 1]) {
            str += this.servingTeam === teamIndex && this.servingSide === 1 - teamIndex ? "*" : "";
            let team = this.court[teamIndex].getFieldArray("name");
            if (! teamIndex)
                team.reverse();
            str += " " + team.join("\t| ");
            str += this.servingTeam === teamIndex && this.servingSide === teamIndex ? " *" : "";
            str += "\t| " + this.score[teamIndex];
            str += teamIndex === 0 ? "\n" : "";
        }
        return str
    }
}


// let players = new List<Player>(testPlayers);
// export const testGame = new Game(
//     {
//         court: [
//             players.getByIndex([0, 1]),
//             players.getByIndex([2, 3]),
//         ]
//     }
// )


// console.log(game.toString());
// // console.log(game.court[0].getByIndex(0));
// console.log("--------------");
// // console.log(game.court[1]);
// for (let i = 0; i < 50; i ++) {
//     game.addPoint(Math.round(Math.random()));
//     console.log(game.toString());
//     console.log("--------------");
// }
// // game.addPoint(0);

// console.log(game.court);
// console.log(game.toString());
// console.log(game.court[0]);
// console.log(game.toObj());
// console.log(Game.fromObj(game.toObj(), players).court[0]);