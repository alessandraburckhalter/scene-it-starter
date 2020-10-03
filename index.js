function saveToWatchList(imdbID) {
    const movie = movieData.find((currentMovie) => {
        return currentMovie.imdbID == imdbID;
});

const watchlistJSON =  localStorage.getItem('watchlist')
const watchlist = JSON.parse(watchlistJSON);

if (watchlist == null) {
    watchlist = [];
}

watchlist.push(movie);
watchlistJSON = JSON.stringify(watchlist);
localStorage.setItem('watchlist', watchlistJSON);
}

document.addEventListener('DOMContentLoaded', function() {
    function renderMovies(movieArray) {
        const movieHtmlArray = movieArray.map((currentMovie) => {
            //console.log(currentMovie.title)
            return `<div class="movie card-body col-md-4 ">
            <img src="${currentMovie.Poster}" class="poster" alt="" width="100%" height="85%"><br>
            <span class="card-title">${currentMovie.Title}</span><br>
            <span class="card-text">${currentMovie.Year}</span><br>
            <button type="button" class="btn btn-warning"  onclick="saveToWatchList('${currentMovie.imdbID}')">Add</button>
            </div> `    

        })
        return movieHtmlArray.join('');    
    }

    // Make the movies appear when search button is clicked
    const searchForm = document.querySelector("#search-form");
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const container = document.querySelector('.movie-container');
        container.innerHTML = renderMovies(movieData);

        const searchString = document.getElementsByClassName('form-control')[0].value;

        console.log(searchString);
        
        const urlEncodedSearchString = encodeURIComponent(searchString);
        axios.get("http://www.omdbapi.com/?apikey=59354c85&s=" + urlEncodedSearchString)
        .then(response => {
        container.innerHTML = renderMovies(response.data.Search);
        movieData = response.data.Search;
        console.log(urlEncodedSearchString);

        });
    })
    
})

