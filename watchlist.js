const watchlistJson =  localStorage.getItem('watchlist')
const watchlist = JSON.parse(watchlistJson);

//document.addEventListener('DOMContentLoaded', function() {
    function renderMovies(list) {
        const movieHtml = list.map((currentMovie) => {
            //console.log(currentMovie.title)
            return `<div class="movie card-body col-md-4 ">
            <img src="${currentMovie.Poster}" class="poster" alt="" width="100%" height="85%"><br>
            <span class="card-title">${currentMovie.Title}</span><br>
            <span class="card-text">${currentMovie.Year}</span><br>
            <button type="button" class="btn btn-warning"  onclick="saveToWatchList('${currentMovie.imdbID}')">Add</button>
            </div> `    

        })
        return movieHtml.join('');    
    }

    const container = document.querySelector(".movie-container");
    container.innerHTML = renderMovies(watchlist);
    