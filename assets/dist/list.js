"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor(list) {
        this.list = typeof list === "undefined" ? [] : list;
    }
    // Get a list of every value of this field
    getFieldArray(field) {
        let fieldArray = [];
        for (let item of this.list) {
            fieldArray.push(item[field]);
        }
        return fieldArray;
    }
    // Get indices of the first maxCount objects in the list to equal value
    getIndicesFromValue(value, maxCount) {
        let index = 0;
        let indices = [];
        for (let item of this.list) {
            if (maxCount && indices.length >= maxCount) {
                break;
            }
            if (item === value) {
                indices.push(index);
            }
            index++;
        }
        return indices;
    }
    // Get indices of the first maxCount objects in the list to have object[field] in values 
    // [] if none present
    getIndicesFromFieldValues(field, values, maxCount) {
        let index = 0;
        let indices = [];
        for (let item of this.list) {
            if (maxCount && indices.length >= maxCount) {
                break;
            }
            if (values.includes(item[field])) {
                indices.push(index);
            }
            index++;
        }
        return indices;
    }
    // Get indices of the first maxCount objects in the list to have object[field] === value 
    // [] if none present
    getIndicesFromFieldValue(field, value, maxCount) {
        return this.getIndicesFromFieldValues(field, [value], maxCount);
    }
    // Get index of the first object in the list to have object[field] === value 
    // -1 if none present
    getIndexFromFieldValue(field, value) {
        let indices = this.getIndicesFromFieldValue(field, value, 1);
        return indices ? indices[0] : -1;
    }
    // Get index of the first object in the list to have object['id'] === id 
    // -1 if none present
    getIndexFromId(id) {
        return this.getIndexFromFieldValue("id", id);
    }
    // Get the first maxCount objects in the list to have index in indices
    // if none present
    //     null if indices is number/[] or maxCount = 1
    //     [ null, null, ... ] otherwise
    getByIndex(indices, maxCount) {
        let items = [];
        let indicesList = typeof indices === "number" ? [indices] : indices;
        if (Array.isArray(indices) && indices.length === 0) {
            return null;
        }
        for (let index of indicesList) {
            if (maxCount && items.length >= maxCount) {
                break;
            }
            if (index >= 0 && index < this.list.length)
                items.push(this.list[index]);
            else if (index < 0 && (-index) <= this.list.length) {
                items.push(this.list[this.list.length + index]);
            }
            else {
                items.push(null);
            }
        }
        return typeof indices === "number" || maxCount === 1 ? items[0] : new List(items);
    }
    // Get the first maxCount objects in the list to have object[field] in value
    // if none present 
    //     undefined if maxCount = 1
    //     [] otherwise
    getByFieldValues(field, values, maxCount) {
        let index = this.getIndicesFromFieldValues(field, values, maxCount);
        let items = this.getByIndex(index, maxCount);
        return items;
    }
    // Get the first maxCount objects in the list to have object[field] === value
    // if none present 
    //     undefined if maxCount = 1
    //     [] otherwise
    getByFieldValue(field, value, maxCount) {
        return this.getByFieldValues(field, [value], maxCount);
    }
    // Get the first object in the list to have object['id'] === id
    // undefined if none present
    getById(id) {
        return this.getByFieldValue("id", id, 1);
    }
    // Get the first objects in the list to have object['id'] === id
    // [] if none present
    getByIds(ids) {
        let items = [];
        for (let id of ids) {
            items.push(this.getById(id));
        }
        return new List(items);
    }
    removeByIndex(indices) {
        let indicesList = typeof indices === "number" ? [indices] : indices;
        indicesList.sort(function (a, b) { return a - b; });
        for (let i = 0; i < indicesList.length; i++) {
            let index = indicesList[i];
            if (index >= 0 && index < this.list.length) {
                this.list.splice(index, 1);
                indicesList = indicesList.map((val) => val - 1);
            }
        }
    }
    removeByValue(value, maxCount) {
        let index = this.getIndicesFromValue(value, maxCount);
        this.removeByIndex(index);
    }
    removeByFieldValue(field, value, maxCount) {
        let index = this.getIndicesFromFieldValue(field, value, maxCount);
        this.removeByIndex(index);
    }
    removeById(id) {
        this.removeByFieldValue("id", id, 1);
    }
    occurrences(value) {
        return this.getIndicesFromValue(value).length;
    }
    contains(value) {
        return this.occurrences(value) > 0;
    }
    length() {
        return this.list.length;
    }
    sortBy(fields, descending) {
        if (typeof fields === "string") {
            fields = [fields];
        }
        this.list.sort((a, b) => {
            for (let field of fields) {
                if (a[field] > b[field]) {
                    return descending ? -1 : 1;
                }
                if (a[field] < b[field]) {
                    return descending ? 1 : -1;
                }
            }
            return 0;
        });
    }
    add(items) {
        let itemList = [];
        if (Array.isArray(items)) {
            itemList = items;
        }
        else if (items instanceof List) {
            itemList = items.list.slice();
        }
        else {
            itemList = [items];
        }
        for (let item of itemList) {
            this.list.push(item);
        }
    }
    addIfUnique(item) {
        if (!this.contains(item)) {
            this.add(item);
        }
    }
    shallowCopy() {
        let newList = [];
        for (let item of this.list) {
            newList.push(item);
        }
        return new List(newList);
    }
    empty() {
        this.list.splice(0, this.list.length);
    }
    replaceAtIndex(index, item) {
        this.list[index] = item;
    }
    toObj() {
        let objs = [];
        for (let item of this.list) {
            objs.push(item.toObj());
        }
        return objs;
    }
}
exports.List = List;
// let b = new List<any>([{ id: 5, name: "Bob", age: 20 }, { id: 7, name: "Sam", age: 19 }, { id: 3, name: "Lucy", age: 20 }]);
// // // b.add({id: 2, name: "Luke", age: 18});
// // b.add([{ id: 9, name: "John", age: 19 }]);
// // b.add(b);
// console.log(b);
// // console.log(b.getByIndex([0, -2, -1]));
// let c = b.shallowCopy();
// console.log(c);
// c.replaceAtIndex(0, {id: 100, name: 'Reece', age: 25});
// console.log(c);
// console.log(b);
// // console.log(b.getIndicesFromFieldValue("id", 7))
// // console.log(b.getIndicesFromFieldValue("name", "Lucy"));
// // console.log(b.getIndicesFromFieldValue("age", 20, 2));
// // console.log(b.getIndexFromFieldValue("age", 20));
// // console.log(b.getIndexFromId(3));
// console.log(b.getByIndex(0));
// // console.log(b.getByIndex([0, 2]));
// // console.log(b.getByIndex([0, 2], 1));
// // console.log(b.getByIndex([9], 1));
// // console.log(b.getByFieldValue("age", 200, 1));
// // console.log(b.getByFieldValue("age", 20, 1));
// // console.log(b.getById(99));
// // console.log(b.getById(5));
// // console.log(typeof [1,2,3]);
// // b.removeByFieldValue("name", "Bob");
// // b.removeByFieldValue("age", 20);
// // b.removeById(5);
// // b.sortBy(["name", "age", "id"])
// console.log(b);
// let c = b.getByFieldValue("id", 9, 1);
// // console.log(c);
// // console.log(b.removeByValue(c));
// // console.log(b.occurrences(c));
// // console.log(c[0] === c[1]);
// console.log(b.getFieldArray("n"));
