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
    // console.log(categories)
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
    // console.log(categoryId.data);
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

    const newsItems = categoryId.data;
    const newsItemsContainer = document.getElementById('news-items');
    newsItemsContainer.textContent = '';
    newsItems.forEach(newsItem => {
        // console.log(newsItem);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('mb-5')
        newsDiv.innerHTML = `
            <div class="card lg:card-side bg-base-100 border shadow-xl">
                <img class="p-5" src=${newsItem.thumbnail_url}" alt="Album">
                <div class="card-body">
                    <h2 class="card-title">${newsItem.title}</h2>
                    <p class="text-stone-500">${(newsItem.details.slice(0, 500))}...</p>
                    <div class="card-actions justify-between items-center">
                        <div class="flex items-center">
                            <img class="w-16 rounded-full mr-5" src=${newsItem.author.img}" alt="Album">
                            <div class="">
                            <p class="font-bold">${newsItem.author.name ? newsItem.author.name : "Anonymous"}</p>
                            <p>${newsItem.author.published_date ? newsItem.author.published_date : "No Date"}</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <i class="fa-solid fa-eye mr-2"></i><p class="font-semibold"> Views: ${newsItem.total_view ? newsItem.total_view : "Hidden"}</p>
                        </div>
                        <div class="flex items-center">
                            <i class="fa-solid fa-star mr-2"></i><p class="font-semibold"> Rating: ${newsItem.rating.number ? newsItem.rating.number : "Hidden"}</p>
                        </div>
                        <label for="news-modal" onclick="loadNewsDetails('${newsItem._id}')" class="btn btn-outline">View More <i class="ml-2 fa-solid fa-circle-chevron-right"></i></label>
                </div>
            </div>
        `;
        newsItemsContainer.appendChild(newsDiv);
    });

}

const loadNewsDetails = async (news_id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
        const res = await fetch(url);
        const data = await res.json();
        modalNews(data.data[0]);
    }
    catch (error) {
        console.error(error);
    }
}

const modalNews = (newsDetails) => {
    console.log(newsDetails);
    const newsDetailsModal = document.getElementById('modal-news-details');
    newsDetailsModal.innerHTML = `
        <img class="mb-5" src=${newsDetails.image_url}" alt="Album">
        <h2 class="text-xl font-semibold">${newsDetails.title}</h2>
        <p class="text-stone-500">${(newsDetails.details)}...</p>
    `;

}

loadNewsCategory();