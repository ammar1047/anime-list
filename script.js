const watchlistTableBody = document.querySelector('#watchlist tbody');
const inputForm = document.querySelector('.input-form');
const titleInput = document.getElementById('title');
const typeSelect = document.getElementById('type');
const watchedCheckbox = document.getElementById('watched');

let count = 1;

// Load existing watchlist from Local Storage
document.addEventListener('DOMContentLoaded', loadWatchlist);

inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const type = typeSelect.value;
    const watched = watchedCheckbox.checked ? 'Sudah' : 'Belum';

    if (title !== '' && type !== '') {
        addToWatchlist(count, title, type, watched);
        saveToLocalStorage(count, title, type, watched);
        count++; // Increment count for the next entry
        resetForm();
    }
});

function addToWatchlist(count, title, type, watched) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${count}</td>
        <td>${title}</td>
        <td>${type}</td>
        <td>${watched}</td>
    `;
    watchlistTableBody.appendChild(row);
}

function resetForm() {
    titleInput.value = '';
    typeSelect.value = '';
    watchedCheckbox.checked = false;
}

function saveToLocalStorage(count, title, type, watched) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.push({ count, title, type, watched });
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

function loadWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.forEach(item => {
        addToWatchlist(item.count, item.title , item.type, item.watched);
    });
}
