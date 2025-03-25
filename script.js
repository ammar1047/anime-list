document.addEventListener('DOMContentLoaded', () => {
    // Initialize star rating system
    initializeStarRating();
    
    // Load saved anime and update counts
    loadAnimeList();
    updateCounts();

    // Form submission handler
    document.getElementById('animeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const anime = {
            id: Date.now(),
            title: document.getElementById('animeTitle').value,
            status: document.getElementById('animeStatus').value,
            rating: document.getElementById('animeRating').value,
            notes: document.getElementById('animeNotes').value,
            dateAdded: new Date().toISOString()
        };

        saveAnime(anime);
        document.getElementById('animeForm').reset();
        resetStarRating();
        loadAnimeList();
        updateCounts();
    });
});

function initializeStarRating() {
    const stars = document.querySelectorAll('.stars i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            document.getElementById('animeRating').value = rating;
            updateStars(rating);
        });

        star.addEventListener('mouseover', () => {
            const rating = star.getAttribute('data-rating');
            updateStars(rating);
        });
    });

    document.querySelector('.stars').addEventListener('mouseleave', () => {
        const currentRating = document.getElementById('animeRating').value;
        updateStars(currentRating);
    });
}

function updateStars(rating) {
    const stars = document.querySelectorAll('.stars i');
    stars.forEach(star => {
        const starRating = star.getAttribute('data-rating');
        star.classList.toggle('active', starRating <= rating);
    });
}

function resetStarRating() {
    document.getElementById('animeRating').value = 0;
    updateStars(0);
}

function saveAnime(anime) {
    let animeList = JSON.parse(localStorage.getItem('animeList')) || [];
    animeList.push(anime);
    localStorage.setItem('animeList', JSON.stringify(animeList));
}

function loadAnimeList() {
    const animeList = JSON.parse(localStorage.getItem('animeList')) || [];
    
    // Clear existing lists
    document.getElementById('planningList').innerHTML = '';
    document.getElementById('watchingList').innerHTML = '';
    document.getElementById('completedList').innerHTML = '';

    // Sort anime by date added (newest first)
    animeList.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    // Sort anime into appropriate lists
    animeList.forEach(anime => {
        const animeCard = createAnimeCard(anime);
        document.getElementById(`${anime.status}List`).appendChild(animeCard);
    });
}

function createAnimeCard(anime) {
    const div = document.createElement('div');
    div.className = 'anime-card';
    
    const stars = '★'.repeat(anime.rating) + '☆'.repeat(5 - anime.rating);
    
    div.innerHTML = `
        <h3>${anime.title}</h3>
        <div class="rating">
            <span>${stars}</span>
            <span>(${anime.rating}/10)</span>
        </div>
        ${anime.notes ? `<p class="notes">${anime.notes}</p>` : ''}
        <button class="delete-btn" onclick="deleteAnime(${anime.id})">
            <i class="fas fa-trash"></i> Delete
        </button>
    `;
    return div;
}

function deleteAnime(id) {
    if (confirm('Are you sure you want to delete this anime?')) {
        let animeList = JSON.parse(localStorage.getItem('animeList')) || [];
        animeList = animeList.filter(anime => anime.id !== id);
        localStorage.setItem('animeList', JSON.stringify(animeList));
        loadAnimeList();
        updateCounts();
    }
}

function updateCounts() {
    const animeList = JSON.parse(localStorage.getItem('animeList')) || [];
    document.getElementById('planningCount').textContent = animeList.filter(anime => anime.status === 'planning').length;
    document.getElementById('watchingCount').textContent = animeList.filter(anime => anime.status === 'watching').length;
    document.getElementById('completedCount').textContent = animeList.filter(anime => anime.status === 'completed').length;
}