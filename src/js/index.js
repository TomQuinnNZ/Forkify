// Global app controller
import axios from 'axios';

const apiKey = 'aaaaaad72e0589b5a044ae34edeeeec5519c34';

async function getResultsAsync(query) {
    const proxy = 'https://cors.io/';

    try {
        const result = await axios(`${proxy}?http://www.food2fork.com/api/search?key=${apiKey}&q=${query}`);

        const recipes = result.data.recipes;

        console.log(recipes);
    }
    catch(error) {
        alert(error);
    }



}

getResultsAsync('pizza');