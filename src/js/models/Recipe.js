import axios from 'axios';
import { apiKey, proxy } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(`${proxy}?http://www.food2fork.com/api/get?key=${apiKey}&rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.publisher = result.data.recipe.publisher;
            this.img = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        }
        catch (error) {
            console.log(error);
            alert('There was an error retrieving the details for this recipe.');
        }
    }

    calculateTime() {
        // Assuming we need 15 mins for every 3 ingredients
        const numIngredients = this.ingredients.length;
        const periods = Math.ceil(numIngredients / 3);
        this.time = periods * 15;
    }

    calculateServings() {
        this.servings = 4;
    }

    parseIngredients() {

        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'pound'];
        const  unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'lb', 'lb'];

        const newIngredients = this.ingredients.map(el => {
            // 1) translate to Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            // 2) remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\)/g, '');
            // 3) parse ingredients into count, unit and ingredient

            return ingredient;
        });

        this.ingredients = newIngredients;
    }
}