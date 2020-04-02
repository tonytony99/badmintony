export class Base {
    public id: number;
    public created: Date;
    public lastUpdated: Date;

    constructor({ id = Math.floor(Math.random() * 10 ** 8), created = new Date(), lastUpdated = new Date() }) {
        this.id = id;

        if (typeof created === "string" || typeof created === "number")
            this.created = new Date(created);
        else
            this.created = created;
        if (typeof lastUpdated === "string" || typeof lastUpdated === "number")
            this.lastUpdated = new Date(lastUpdated);
        else
            this.lastUpdated = lastUpdated;
    }

    toObj() {
        let obj = { id: this.id };
        for (let dateField of ['created', 'lastUpdated']) {
            obj[dateField] = this[dateField].toISOString();
        }
        return obj
    }
}