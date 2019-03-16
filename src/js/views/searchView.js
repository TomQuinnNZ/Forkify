import { elements } from "./base";

export const getInput = () => {
    return elements.searchInput.value;
}

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
}

const limitRecipeTitle = (title, recipe, limit = 18) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, current) => {
            if (acc + current.length <= limit) {
                newTitle.push(current);
            }
            return acc + current.length;
        }, 0)

        return `${newTitle.join(' ')} ...`;
    }

    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = recipes => {
    recipes.forEach((current) => {
        renderRecipe(current);
    });
}