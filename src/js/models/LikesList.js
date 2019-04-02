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

    isLiked(id) {
        return this.findIndex(el => el.id === id) !== -1;
    }
}