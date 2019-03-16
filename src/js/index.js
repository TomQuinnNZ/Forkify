// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';
/* 
* Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/
const state = {};

const controlSearch = async () => {
    // 1) Get the query from the view
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        // 2) New search object created and added to state
        state.search = new Search(query);

        // 3) Prepare the UI for results
        searchView.clearResults();
        
        // 4) Search for recipes
        await state.search.getResultsAsync();

        Promise.resolve('Success').then(() =>{
            searchView.clearInput();
        })

        // 5) Render results in the UI
        searchView.renderResults(state.search.recipes);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
