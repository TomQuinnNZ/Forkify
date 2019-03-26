import axios from 'axios';
import { apiKey, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResultsAsync() {

        try {
            const result = await axios(`${proxy}?http://www.food2fork.com/api/search?key=${apiKey}&q=${this.query}`);

            this.recipes = result.data.recipes;
        }
        catch(error) {
            alert("There's been a problem connecting to the server.");
        }
    }
}