import uuid from 'uuid';


export default class List {
    constructor() {
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uuid(),
            count,
            unit,
            ingredient
        }

        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const i = this.items.findIndex( el => el.id === id);
        
        // This modifies the original array in-place (mutates)
        this.items.splice(i, 1);
    }

    updateCount(id, newCount) {
        const item = this.items.find( el => el.id === id);

        item.count = newCount;
    }
}