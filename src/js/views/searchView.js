import { elements } from "./base";

export const getInput = () => {
    return elements.searchInput.value;
}

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResultPages.innerHTML = '';
    elements.searchResultList.innerHTML = '';
}

export const highlightSelected = id => {
    const allResultItems = Array.from(document.querySelectorAll('.results__link'));
    allResultItems.forEach(el => {
        el.classList.remove('results__link--active');
    });

    const newElement = `a[href="#${id}"]`;
    document.querySelector(newElement).classList.add('results__link--active');
}

export const limitRecipeTitle = (title, limit = 18) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, current) => {
            if (acc + current.length <= limit) {
                newTitle.push(current);
            }
            return acc + current.length;
        }, 0)

        const completedTitle = `${newTitle.join(' ')} ...`;
        return completedTitle;
    }

    return title;
}

const renderRecipe = recipe => {
    const markup = 
    `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
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

const createButton = (page, type) => {
    const btn = 
    `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        </button>
    `

    return btn;
}

const renderButtons = (page, numResults, resultsPerPage) => {
    const pages = Math.ceil(numResults / resultsPerPage);

    let button;
    if (page === 1) {
        button = createButton(page, 'next');
    }
    else if (page < pages) {
        // one of the middle pages
        button = 
        `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `
    }
    else if (page === pages && pages > 1) {
        // last page
        button = createButton(page, 'prev');
    }

    elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    //render results of current page
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;

    recipes.slice(start, end).forEach((current) => {

        renderRecipe(current);
    });

    renderButtons(page, recipes.length, resultsPerPage);
}