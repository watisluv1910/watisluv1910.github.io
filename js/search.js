var list = document.querySelectorAll('.search-result'),
    searchInput = document.getElementById('search-input'),
    paginationArrowLeft = document.querySelector('.pagination-arrow-left'),
    paginationArrowRight = document.querySelector('.pagination-arrow-right'),
    paginationLinks = document.querySelectorAll('.pagination-link'),
    resultsCounter = document.querySelector('.search-results__counter');

let resultArticles = 0;

// Update results counter
function updateResultsCounter(currentPage, totalArticles) {
    var countStart = document.getElementById('search-results-count-start'),
        countEnd = document.getElementById('search-results-count-end'),
        countTotal = document.getElementById('search-results-count-total'),
        searchQuery = document.getElementById('search__query');

    countStart.innerText = currentPage * 10 - 9;

    if (currentPage * 10 > totalArticles) {
        countEnd.innerText = totalArticles;
    } else {
        countEnd.innerText = currentPage * 10;
    }

    countTotal.innerText = totalArticles;
    searchQuery.innerText = searchInput.value;

    if (!searchQuery.innerText) {
        searchQuery.innerText = 'all';
    }

    if (totalArticles === 0) {
        resultsCounter.classList.add('hidden');
    } else {
        resultsCounter.classList.remove('hidden');
    }
}
    
// Search
searchInput.addEventListener('input', (event) => {
    let filter = event.target.value.toUpperCase();
    resultArticles = 0;

    // Clear list
    clearList();

    // Filter list
    list.forEach(item => {
        let title = item.querySelector('.__title').innerText.toUpperCase();
        if (title.indexOf(filter) > -1) {
            item.classList.remove('hidden');
            resultArticles++;
        } else {
            item.classList.add('hidden');
        }
    });

    // Update pagination
    updatePagination(); 
});


function updatePagination() {
    let pages = Math.ceil(resultArticles / 10);

    paginationArrowLeft.classList.add('disabled', 'undisplayed');
    paginationArrowRight.classList.add('disabled', 'undisplayed');

    if (pages > 0) {
        paginationArrowLeft.classList.remove('undisplayed');
        paginationArrowRight.classList.remove('undisplayed');

        if (pages > 1) {
            paginationArrowLeft.classList.remove('disabled');
            paginationArrowRight.classList.remove('disabled');
        }
    } 

    paginationLinks.forEach((link, index) => {
        if (index < pages) {
            link.classList.remove('hidden');
        } else {
            link.classList.add('hidden');
        }
    });

    // Set active page
    paginationLinks.forEach(link => {
        if (link.classList.contains('active')) {
            link.classList.remove('active');
        }
    });

    paginationLinks[0].classList.add('active');

    // Update results counter
    updateResultsCounter(1, resultArticles);

    // Update displayed articles
    updateDisplayedArticles();
}

// Update displayed articles on pagination click
paginationLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        let activePage = document.querySelector('.pagination-link.active');
        activePage.classList.remove('active');
        link.classList.add('active');

        if (index === 0) {
            paginationArrowLeft.classList.add('disabled');
        } else {
            paginationArrowLeft.classList.remove('disabled');
        }

        if (index === [...paginationLinks].filter(element => !element.classList.contains('hidden')).length - 1) {
            paginationArrowRight.classList.add('disabled');
        } else {
            paginationArrowRight.classList.remove('disabled');
        }

        // Update results counter
        updateResultsCounter(index + 1, resultArticles);

        // Update displayed articles
        updateDisplayedArticles();
    });
});

function updateDisplayedArticles() {
    let activePage = document.querySelector('.pagination-link.active');
    let activePageNumber = parseInt(activePage.innerText);
    let articlesDisplayedEnd = activePageNumber * 10;
    let articlesDisplayedStart = articlesDisplayedEnd - 10;

    // Filter list of non-hidden articles
    let filteredList = [];
    list.forEach(item => {
        if (!item.classList.contains('hidden')) {
            filteredList.push(item);
        }
    });

    filteredList.forEach((item, index) => {
        if (index >= articlesDisplayedStart && index < articlesDisplayedEnd) {
            item.classList.remove('undisplayed');
        } else {
            item.classList.add('undisplayed');
        }
    });
}


paginationArrowLeft.addEventListener('click', () => {
    let activePage = document.querySelector('.pagination-link.active');

    if (activePage.previousElementSibling.classList.contains('hidden')) {
        return;
    } else if (activePage.previousElementSibling) {
        activePage.classList.remove('active');
        activePage.previousElementSibling.classList.add('active');

        activePage = document.querySelector('.pagination-link.active');

        // Update results counter
        updateResultsCounter([...paginationLinks].indexOf(activePage) + 1, resultArticles);

        // Update displayed articles
        updateDisplayedArticles();
    }
});

paginationArrowRight.addEventListener('click', () => {
    let activePage = document.querySelector('.pagination-link.active');

    if (activePage.nextElementSibling.classList.contains('hidden')) {
        return;
    } else if (activePage.nextElementSibling) {
        activePage.classList.remove('active');
        activePage.nextElementSibling.classList.add('active');

        activePage = document.querySelector('.pagination-link.active');

        // Update results counter
        updateResultsCounter([...paginationLinks].indexOf(activePage) + 1, resultArticles);

        // Update displayed articles
        updateDisplayedArticles();
    }
});

// Clear list
function clearList() {

    // Clear list
    list.forEach(item => {
        item.classList.add('hidden');
    });
}

// Init filter
initFilter();

function initFilter() {

    if (window.location.search.indexOf('search') > -1) {
        let filter = window.location.search.split('=')[1];
        searchInput.value = filter;
    }

    searchInput.dispatchEvent(new Event('input'));
}
