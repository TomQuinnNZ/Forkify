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
        const index = this.items.findIndex( el => {
            el.id === id;
        });
        
        // This modifies the original array in-place (mutates)
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        const item = this.items.find( el => {
            console.log(`Element ID: ${el.id}`);
            el.id === id;
        });

        item.count = newCount;
    }
}