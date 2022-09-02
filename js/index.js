// console.log('Hello');
const loadNewsCategory = async (data) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryName(data.data.news_category)
    }
    catch (error) {
        console.error(error);
    }
}

const displayCategoryName = (categories) => {
    console.log(categories)
    const categoryContainer = document.getElementById('category-container');

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('text-center')
        // console.log(category.category_id);
        categoryDiv.innerHTML = `
            <button id = "category-btn" onclick="loadNews('${category.category_id}')" class="my-3 btn btn-ghost w-full">${category.category_name}</button>
        `;
        categoryContainer.appendChild(categoryDiv);
    });

}

const loadNews = async (category_id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data);
    }
    catch (error) {
        console.error(error);
    }
}

const displayNews = (categoryId) => {
    // console.log((categoryId.data).length);
    const newsLength = (categoryId.data).length;
    const itemNumber = document.getElementById('number-of-items');
    itemNumber.textContent = '';
    const itemsDiv = document.createElement('div');
    itemsDiv.classList.add('text-center')
    if (newsLength <= 0) {
        itemsDiv.innerHTML = `
        <h1 class = "text-lg font-semibold">No item/s found</h1>
    `;
    }
    else {
        itemsDiv.innerHTML = `
        <h1 class = "text-lg font-semibold">${newsLength} Item/s found</h1>
    `;
    }
    itemNumber.appendChild(itemsDiv);
}

loadNewsCategory();