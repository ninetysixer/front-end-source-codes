const apiKey = 'YOUR-API-KEY'; // Enter your API key here

function getRandomMovie() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const movie = data.results[randomIndex];
      displayMovieDetails(movie);
    })
    .catch(error => {
      console.error('Error fetching random movie:', error);
    });
}

function displayMovieDetails(movie) {
  const titleElement = document.getElementById('movie-title');
  const posterElement = document.getElementById('movie-poster');
  const overviewElement = document.getElementById('movie-overview');
  const genresElement = document.getElementById('movie-genres');
  const scoreElement = document.getElementById('movie-score');

  titleElement.textContent = movie.title;
  posterElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  overviewElement.textContent = movie.overview;
  genresElement.textContent = `Genres: ${getGenresString(movie.genre_ids)}`;

  // Calculate score out of 10
  const Score = calculateScore(movie.vote_average);
  scoreElement.textContent = `Score: ${Score}/10`;
}

function getGenresString(genreIds) {
  // Map genre IDs to their respective names (you may need to fetch genre data from TMDb API)
  const genreNames = {
    28: 'Action',
    35: 'Comedy',
    18: 'Drama',
    // Add more genre mappings as needed
  };

  const genres = genreIds.map(id => genreNames[id] || '').filter(Boolean);
  return genres.join(', ');
}

function calculateScore(voteAverage) {
  // Calculate score out of 10
  const imdbScore = (voteAverage).toFixed(1);
  return imdbScore;
}

document.addEventListener('DOMContentLoaded', getRandomMovie);
document.getElementById('get-movie-btn').addEventListener('click', getRandomMovie);
