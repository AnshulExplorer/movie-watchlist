document.getElementById('movieForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const movie = {
      title: document.getElementById('title').value,
      director: document.getElementById('director').value,
      year: Number(document.getElementById('year').value)
    };
    await fetch('/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    });
    document.getElementById('movieForm').reset();
    loadMovies();
    const movieList = document.getElementById('movieList');
    movieList.style.display = 'block';
    document.getElementById('historyButton').textContent = 'Hide History';
  });
  
  document.getElementById('historyButton').addEventListener('click', () => {
    const movieList = document.getElementById('movieList');
    const historyButton = document.getElementById('historyButton');
    if (movieList.style.display === 'none' || movieList.style.display === '') {
      movieList.style.display = 'block';
      historyButton.textContent = 'Hide History';
      loadMovies();
    } else {
      movieList.style.display = 'none';
      historyButton.textContent = 'Show History';
    }
  });
  
  async function loadMovies() {
    const res = await fetch('/movies');
    const movies = await res.json();
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';
    movies.forEach(movie => {
      const li = document.createElement('li');
      li.textContent = `${movie.title} (${movie.year}) - ${movie.director}`;
      movieList.appendChild(li);
    });
  }