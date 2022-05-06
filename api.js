const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=adf1eddf1e88696a14f21f88d3520e85";
const API_URL = BASE_URL + "/discover/movie?" + queryDate() + "&" + API_KEY;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";


function queryDate(){
    const date = new Date();
    var today_day = String(date.getDay() + 1).padStart(2,0);
    var today_month = String(date.getMonth() + 1).padStart(2,0);
    var today_year = date.getFullYear();
    var today_date = today_year + "-" + today_month + "-" + today_day;

    var date_month_ago = today_year + "-" + String(date.getMonth()).padStart(2,0) + "-" +today_day;

    var url_date_query = "primary_release_date.gte=" + date_month_ago +"&primary_release_date.lte=" + today_date;
    return url_date_query;
}

function getMovies(url){
    fetch(url).then(response => response.json()).then(data => {
        if(data.results.length !== 0){
            showMovies(data.results);
        }
    })
}

function showMovies(data){
    const main = document.getElementById('main');
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movie1 = document.createElement('div');
        movie1.classList.add('movie');
        movie1.innerHTML = 
        `
            <div class="card" style="width: 20rem;">
                    <img class="card-img-top" src='${poster_path? IMAGE_URL + poster_path: "http://via.placeholder.com/1080x1580"}' alt="Card image cap">
                    <div class="card-body">
                    <h4 class="card-title">${title}</h4>
                        <div class="overview">
                            ${overview}
                        </div>
                    </div>
            </div>
        `;

        main.appendChild(movie1);
    })
}

getMovies(API_URL);
