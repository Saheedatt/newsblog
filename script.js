const API_KEY = "099148be22804e849a0c6fe022b7cf5e";
const newsEndpoint = "https://newsapi.org/v2/top-headlines";
const allNewsList = document.getElementById('all-news-list');

let currentPage = 1;

async function fetchNewsBySearch(query) {
    const url = `${newsEndpoint}?q=${query}&apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news by search:', error);
        return [];
    }
}
function searchNews() {
    const searchQuery = document.getElementById('search').value;
    if (searchQuery.trim() === '') {
        alert('Please enter a search query.');
        return;
    }
    fetchNewsBySearch(searchQuery)
    .then(articles => {
        allNewsList.innerHTML = ''; 
        articles.forEach((article, index) => {
            const newsBox = document.createElement('div');
            newsBox.classList.add('news-box');
            newsBox.innerHTML = `<a href="#" onclick="showSelectedNewsDetails(${index})">
                                    <h3>${article.title}</h3>
                                    <p>${article.description}</p>
                                </a>`;
            allNewsList.appendChild(newsBox);
        });
    });
}
async function fetchTopHeadlines() {
    const url = `${newsEndpoint}?country=us&apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching top headlines:', error);
        return [];
    }
}

// Function to display top headlines in the "All News" section
function displayTopHeadlines() {
    fetchTopHeadlines()
        .then(articles => {
            allNewsList.innerHTML = ''; 
            articles.forEach((article, index) => {
                const newsBox = document.createElement('div');
                newsBox.classList.add('news-box');
                newsBox.innerHTML = `<a href="#" onclick="showSelectedNewsDetails(${index})">
                                        <h3>${article.title}</h3>
                                        <p>${article.description}</p>
                                    </a>`;
                allNewsList.appendChild(newsBox);
            });
        });
}
function showSelectedNewsDetails(index, category) {
    fetchTopHeadlines()
        .then(articles => {
            const selectedNewsContent = document.getElementById('selected-news-content');
            const article = articles[index];
            selectedNewsContent.innerHTML = `
                <h3>${article.title}</h3>
                <img src="${article.urlToImage}" alt="${article.title}" style="max-width: 100%; max-height: 100%;">
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
        });

    document.getElementById('all-news').style.display = 'none';
    document.getElementById('selected-news').style.display = 'block';
}
displayTopHeadlines();

function loadContent() {
    const searchQuery = document.getElementById('search').value;
    if (searchQuery.trim() === '') {
        displayTopHeadlines();
    } else {
        searchNews();
    }
}
function handleEnterKey(event) {
    console.log('Key pressed:', event.key);
    if (event.key === 'Enter') {
        event.preventDefault();
        loadContent();
    }
}

async function fetchMoreNews() {
    const pageSize = 20;  // Specifies the number of articles I want per page
    const url = `${newsEndpoint}?country=us&apiKey=${API_KEY}&pageSize=${pageSize}&page=${currentPage}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching more news:', error);
        return [];
    }
}

function displayMoreNews() {
    fetchMoreNews()
        .then(articles => {
            articles.forEach((article, index) => {
                const newsBox = document.createElement('div');
                newsBox.classList.add('news-box');
                newsBox.innerHTML = `<a href="#" onclick="showSelectedNewsDetails(${index})">
                                        <h3>${article.title}</h3>
                                        <p>${article.description}</p>
                                    </a>`;
                allNewsList.appendChild(newsBox);
            });
        });
}
function loadMoreNews() {
    currentPage++;
    displayMoreNews();
}
document.getElementById('searchBtn').addEventListener('click', loadContent);
document.getElementById('search').addEventListener('keydown', handleEnterKey)
function displayNewsByCategory(category) {
    // Clears the previous news
    const allNewsList = document.getElementById('all-news-list');
    allNewsList.innerHTML = '';

    fetchNewsByCategory(category)
        .then(articles => {
            articles.forEach((article, index) => {
                const newsBox = document.createElement('div');
                newsBox.classList.add('news-box');
                newsBox.innerHTML = `<a href="#" onclick="showSelectedNewsDetails(${index}, '${category}')">
                                        <h3>${article.title}</h3>
                                        <p>${article.description}</p>
                                    </a>`;
                allNewsList.appendChild(newsBox);
            });
        });
}

async function fetchNewsByCategory(category) {
    let url = `${newsEndpoint}?apiKey=${API_KEY}`;
    
    // Adjusts the API endpoint based on the category
    if (category !== 'home') {
        url += `&category=${category}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
        return [];
    }
}

// const toggleButton = document.getElementById('sidebar-toggle');

function toggleSidebar() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('visible');

    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (navLinks.classList.contains('visible')) {
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

function closeSidebar() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.classList.remove('visible');

    var menuIcon = document.getElementById('menu-icon');
    var closeIcon = document.getElementById('close-icon');

    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
}
