// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
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

        // 4) Search for recipes
        await state.search.getResultsAsync();

        // 5) Render results in the UI
        Promise.resolve('Success').then(() =>{
            searchView.clearInput();
            clearLoader();
        })

        searchView.renderResults(state.search.recipes);
    }
}

/*
* Recipe controller
*/
const r = new Recipe(46956);
r.getRecipe();

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
        console.log(goToPage);
    }
});
