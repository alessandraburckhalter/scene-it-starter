const pullFromLocal = ()=> {
    let watchListJSON = localStorage.getItem('watchList');
    let watchList = JSON.parse(watchListJSON);
    
    // checks if watchList exists, if it doesn't, we initiate the empty array.
    if (!watchList){watchList = [];}
    return watchList;
}

// function that takes in the movie we want to add to our localStorage
function removeMovieFromLocalStorage(watchList, movie){
    let deleteIndex;

    for (let index = 0; index < watchList.length; index++){
        if(watchList[index].Title === movie.Title){
            deleteIndex = index;
        }
    }
    watchList.splice(deleteIndex, 1);
    let watchListJSON = JSON.stringify(watchList);
    localStorage.setItem('watchList', watchListJSON)
    return watchList;
  }

function deleteFromWatchList(imdbID){
    // does the opposite from add to watchlist
    let localList = pullFromLocal();
    console.log(localList);
    const movie = localList.find((currentMovie) =>{
        return currentMovie.imdbID == imdbID;
    });

    localList = removeMovieFromLocalStorage(localList, movie);

    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = renderMovies(localList);    
}


function renderMovies(movieArray){
    const movieHtmlArray = movieArray.map((currentMovie) => {
        
        return `
        <div class="movie col-12 col-sm-6 col-md-6 col-lg-4 mb-3">
        <div class="card align-items-left only-card" style="height: auto">
        <img src="${currentMovie.Poster}" class="card-img-top " alt="" width="100%" height="400">
        <span class="card-title mt-2">${currentMovie.Title}</span>
        <span class="card-text mb-2">${currentMovie.Year}</span>
            <button class="btn btn-primary addButton" id="removeButton" onClick="deleteFromWatchList('${currentMovie.imdbID}')">Remove movie</button>
          </div>
        </div>
     
                `           
    });
    return movieHtmlArray.join('');                   
}

document.addEventListener('DOMContentLoaded', function(){
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = renderMovies(pullFromLocal());
})