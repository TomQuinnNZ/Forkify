// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
/* 
* Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/
const state = {};

/*
* Search controller
*/
const controlSearch = async () => {
    // 1) Get the query from the view
    const query = searchView.getInput();

    if (query) {
        // 2) New search object created and added to state
        state.search = new Search(query);

        // 3) Prepare the UI for results
        searchView.clearResults();
        renderLoader(elements.searchResults);

        try {
            // 4) Search for recipes
            await state.search.getResultsAsync();

            // 5) Render results in the UI
            Promise.resolve('Success').then(() => {
                searchView.clearInput();
                clearLoader();
            })

            searchView.renderResults(state.search.recipes);
        }
        catch (error) {
            alert('Load failed - please wait a few moments and try again.');
            clearLoader();
        }

    }
}

/*
* Recipe controller
*/

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        recipeView.clearResults();
        renderLoader(elements.recipe);

        // Highlight the selected recipe item
        if (state.search) {
            console.log('got here');
            searchView.highlightSelected(id);
        }

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // Call recipe-specific functions
            state.recipe.calculateTime();
            state.recipe.calculateServings();
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }
        catch (error) {
            console.log(error);
            alert('Load failed - please wait a few moments and try again.');
        }

    }
}

// Condense adding multiple events to a single event listener
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// const r = new Recipe(46956);
// r.getRecipe();
// console.log(r);

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultPages.addEventListener('click', event => {
    const btn = event.target.closest('.btn-inline');
    
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);

        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    }
});

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button has been clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingAmounts(state.recipe);
        }
    }
    else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button has been clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingAmounts(state.recipe);
    }
});

// TESTING
window.l = new List();
