export class Base {
    public id: number;
    public created: Date;
    public lastUpdated: Date;
    
    constructor({id = Math.floor(Math.random() * 10 ** 8), created = new Date(), lastUpdated = new Date()}) {
        this.id = id;
        this.created = created;
        this.lastUpdated = lastUpdated;
    }

    toObj() {
        let obj = {};
        for (let field of ['id', 'created', 'lastUpdated']) {
            obj[field] = this[field];
        }
        return obj
    }


    // display(): void{
    //     console.log(this.name);
    // }

    // abstract find(string): Person;
}