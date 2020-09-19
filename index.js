
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
    })
    
})

function saveToWatchList(imdbID) {
    const movie = movieData.find((currentMovie) => {
        return currentMovie.imdbID == imdbID;
});

let watchlistJSON = localStorage.getItem('watchlist');
let watchlist = JSON.parse(watchlistJSON);
    if (watchlist === null) {
        watchlist = []
}

watchlist.push(movie);
watchlistJSON = JSON.stringify(watchlist);
localStorage.setItem('watchlist', watchlistJSON);

};


