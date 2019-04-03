export default class LikesList extends Array {
    constructor() { 
        super();
    }

    add(like) {
        this.push(like);
        
        this.persistData();
    }

    delete(id) {
        const i = this.findIndex(el => el.id === id);
        this.splice(i, 1);

        this.persistData();
    }

    isLiked(id) {
        return this.findIndex(el => el.id === id) !== -1;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this));
    }
}