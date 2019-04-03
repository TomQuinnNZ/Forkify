import Like from "./Like";

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

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        if (storage) {
            // Loop through storage string and re-create Like objects
            storage.forEach(obj => {
                const restoredLike = new Like(obj.id, obj.title, obj.author, obj.img);
                this.add(restoredLike);
            });
        }
    }
}