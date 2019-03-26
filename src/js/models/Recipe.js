import axios from 'axios';
import { apiKey, proxy } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(`${proxy}?http://www.food2fork.com/api/get?key=${apiKey}&rId=${this.id}`);
            console.log(result);
        }
        catch (error) {
            console.log(error);
        }
    }
}