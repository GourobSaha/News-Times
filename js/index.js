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
        categoryDiv.innerHTML = `
            <button class="my-3 btn btn-ghost w-full">${category.category_name}</button>
        `;
        categoryContainer.appendChild(categoryDiv);
    });

}

loadNewsCategory();