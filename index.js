let movieData;
// function that takes in the movie we want to add to our localStorage
function addMovieToLocalStorage(movie, imdbID){

  let watchListJSON = localStorage.getItem('watchList');
  let watchList = JSON.parse(watchListJSON);
  
  // checks if watchList exists, if it doesn't, we initiate the empty array.
  if (!watchList){watchList = [];}
  const isMovieInListAlready = watchList.find((watchListMovie)=> {
    // checks if there is one first, then if they are the same.
    return watchListMovie.imdbID && watchListMovie.imdbID == imdbID;
  })
  if (!isMovieInListAlready){
    watchList.push(movie);
  }

  watchListJSON = JSON.stringify(watchList);

  localStorage.setItem('watchList', watchListJSON)

}



// function to add a movie to our local storage if the user clicks the add button
function saveToWatchList(imdbID){
  const movie = movieData.find((currentMovie) =>{
    return currentMovie.imdbID == imdbID;
  });

  addMovieToLocalStorage(movie, imdbID);

  console.log(localStorage.getItem('watchList'));
}

function deleteFromWatchList(){
  localStorage.removeItem('watchList')
}

    function renderMovies(movieArray) {
        const movieHtmlArray = movieArray.map((currentMovie) => {
            //console.log(currentMovie.title)
            return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card align-items-left only-card style="height: 100vh;">
            <img src="${currentMovie.Poster}" class="card-img-top " alt="" width="100%" height="400">
            <span class="card-title mt-2">${currentMovie.Title}</span>
            <span class="card-text mb-2">${currentMovie.Year}</span>
            <button type="button" class="btn btn-warning" id="addButton" onclick="saveToWatchList('${currentMovie.imdbID}')">Add movie</button>
            </div> 
            </div>`    

        })
        return movieHtmlArray.join('');    
    }

    

    document.addEventListener('DOMContentLoaded', function(){
        document.addEventListener('click', (e)=>{
            if(e.target.id !== 'navLink'){
              e.preventDefault();
              let searchString = $('.search-bar').val();
              let urlEncodedSearchString = encodeURIComponent(searchString);
              if(e.target.id === 'search'){
                  const movieContainer = document.querySelector('.movie-container');
                  axios.get("http://www.omdbapi.com/?apikey=59354c85&s=" + urlEncodedSearchString)
                    .then((response)=>{
                      console.log(response.data.Search);
                      movieContainer.innerHTML = renderMovies(response.data.Search);
                      movieData = response.data.Search;
                    })
              }else if(e.target.id === 'addButton'){
                e.target.style.backgroundColor  = '#ac4b1c';
                e.target.textContent = "Added to your watchlist";
              }
            }
        
        })

        
        
    })
