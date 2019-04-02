/*
* TODO
*
* Class LikesList()
* constructor();
* add(Like like);
* delete(id);
* length();
*/

export default class LikesList extends Array {
    constructor() { 
        super();
    }

    add(like) {
        this.push(like);
    }

    delete(id) {
        const i = this.findIndex(el => el.id === id);
        this.splice(i, 1);
    }

    length() {
        return this.length;
    }
}