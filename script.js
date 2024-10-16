// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const watchlistTableBody = document.querySelector('#watchlist tbody');
const inputForm = document.querySelector('.input-form');
const titleInput = document.getElementById('title');
const typeSelect = document.getElementById('type');
const watchedCheckbox = document.getElementById('watched');

let count = 1;

// Load existing watchlist from Firebase Realtime Database
db.ref('watchlist').on('value', (data) => {
    const watchlist = data.val();
    watchlistTableBody.innerHTML = '';
    Object.keys(watchlist).forEach((key) => {
        const item = watchlist[key];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.count}</td>
            <td>${item.title}</td>
            <td>${item.type}</td>
            <td>${item.watched}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editWatchlist('${key}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteWatchlist('${key}')">Delete</button>
            </td>
       `;
        watchlistTableBody.appendChild(row);
    });
});

inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const type = typeSelect.value;
    const watched = watchedCheckbox.checked ? 'Sudah' : 'Belum';

    if (title !== '' && type !== '') {
        db.ref('watchlist').push({
            count: count,
            title: title,
            type: type,
            watched: watched
        });
        count++; // Increment count for the next entry
        resetForm();
    }
});

function editWatchlist(key) {
    const title = prompt('Enter new title:', '');
    const type = prompt('Enter new type:', '');
    const watched = prompt('Enter new watched status:', '');

    if (title !== '' && type !== '') {
        db.ref(`watchlist/${key}`).update({
            title: title,
            type: type,
            watched: watched
        });
    }
}

function deleteWatchlist(key) {
    db.ref(`watchlist/${key}`).remove();
}
