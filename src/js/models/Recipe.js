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
            const ingredientArray = ingredient.split(' ');
            const unitIndex = ingredientArray.findIndex(el2 => unitsShort.includes(el2));

            let ingredientObject;
            if (unitIndex > -1) {

                // There is a unit
                // ex. 4 1/2 cups, countArray becomes ['4', '1/2']
                const countArray = ingredientArray.slice(0, unitIndex);
                let count;

                if (countArray.length === 1) {
                    // ex. eval(1-1/2) becomes eval(1+1/2), which becomes 1.5
                    count = eval(countArray[0].replace('-', '+'));
                }
                else {
                    // ex. eval('4+1/2') becomes 4.5
                    count = eval(ingredientArray.slice(0, unitIndex).join('+'))
                }

                ingredientObject = {
                    count,
                    unit: ingredientArray[unitIndex],
                    ingredient: ingredientArray.slice(unitIndex+1).join(' ')
                }
            }
            else if (parseInt(ingredientArray[0], 10)) {

                // There is no unit, but the first element is a number
                ingredientObject = {
                    count: parseInt(ingredientArray[0], 10),
                    unit: '',
                    ingredient: ingredientArray.slice(1).join(' ')
                }
            }
            else if (unitIndex === -1) {

                // There is no unit, and the first element is not a number
                ingredientObject = {
                    count: 1,
                    unit: '',
                    // ES6 shorthand, creates property and assigns value to it (ingredient: ingredient)
                    ingredient
                }
            }

            return ingredientObject;
        });

        this.ingredients = newIngredients;
    }

    updateServings (type) {
        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        // Ingredients
        this.ingredients.forEach(ingredient => {
            ingredient.count = ingredient.count * (newServings / this.servings);
        });

        this.servings = newServings;
    }
}