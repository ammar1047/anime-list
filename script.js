const watchlistTableBody = document.querySelector('#watchlist tbody');
const inputForm = document.querySelector('.input-form');
const titleInput = document.getElementById('title');
const typeSelect = document.getElementById('type');
const watchedCheckbox = document.getElementById('watched');

let count = 1;

inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const type = typeSelect.value;
    const watched = watchedCheckbox.checked ? 'Sudah' : 'Belum';

    if (title !== '' && type !== '') {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${count}</td>
            <td>${title}</td>
            <td>${type}</td>
            <td>${watched}</td>
        `;
        watchlistTableBody.appendChild(row);
        count++; // Increment count for the next entry
        titleInput.value = '';
        typeSelect.value = '';
        watchedCheckbox.checked = false;
    }
});
