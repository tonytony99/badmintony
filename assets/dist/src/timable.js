"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class Timable extends base_1.Base {
    constructor({ id = undefined, created = undefined, lastUpdated = undefined, began = null, ended = null, duration = null }) {
        super({ id: id, created: created, lastUpdated: lastUpdated });
        this.began = began ? new Date(began) : began;
        this.ended = ended ? new Date(ended) : ended;
        this.updateDuration();
    }
    toObj() {
        let obj = super.toObj();
        this.updateDuration();
        obj['duration'] = this.duration;
        for (let dateField of ['began', 'ended']) {
            obj[dateField] = this[dateField] ? this[dateField].toISOString() : null;
        }
        return obj;
    }
    begin() {
        this.began = new Date();
        this.updateDuration();
    }
    end() {
        this.ended = new Date();
        this.updateDuration();
    }
    getDuration() {
        if (this.ended !== null) {
            return (+this.ended - +this.began);
        }
        if (this.began !== null) {
            return (+new Date() - +this.began);
        }
        return null;
    }
    updateDuration() {
        this.duration = this.getDuration();
    }
}
exports.Timable = Timable;
