import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResultsAsync() {

        const proxy = 'https://cors.io/';
        const apiKey = 'd72e0589b5a044ae34edeeeec5519c34';

        try {
            const result = await axios(`${proxy}?http://www.food2fork.com/api/search?key=${apiKey}&q=${this.query}`);

            this.recipes = result.data.recipes;

            console.log(this.recipes);
        }
        catch(error) {
            alert(error);
        }
    }
}