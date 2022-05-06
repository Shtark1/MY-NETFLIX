const APY_KEY = "db82fb44-6b1f-4a52-8457-d4378d1f26e8"
const APY_URL_POP = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"

getMovies(APY_URL_POP)

async function getMovies(url){
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": APY_KEY
        },
    })
    const respData = await resp.json()
    showMovies(respData)
    // console.log(respData)s
}

// Условие для рейтинга

function getClassByRate(vote) {
    if (vote > 7){
        return "green"
    }
    else if (vote > 5){
        return "orange"
    }
    else {
        return "red"
    }
}



// Создание карточек фильмов

function showMovies(data) {
    const moviesEl = document.querySelector(".movies")
    
    // щчищение предыдущих фильмов
    document.querySelector(".movies").innerHTML = ""


    data.films.forEach((movie) => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
        <a href="https://www.kinopoisk.ru/film/${movie.filmId}">
        <div class="movies_cover-inner">
        <img class="movies_img" src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
        <div class="movies_dark"></div>
        </a>
        </div>
        <div class="movies_info">
            <div class="movies_title">${movie.nameRu}</div>
            <div class="movies_category">${movie.genres.map(
                (genre) => ` ${genre.genre}`
                )}</div>
                ${movie.rating <= 10   &&(`
            <div class="movies_reiting movies_color-${getClassByRate(movie.rating)}">${movie.rating}</div>
            `)}
        `

        moviesEl.appendChild(movieEl)
    })
}



// Поиск фильмов

const APY_KEY_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="

const form = document.querySelector("form")
const search = document.querySelector(".search")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const apiSerch = `${APY_KEY_SEARCH}${search.value}`
    if (search.value){
        getMovies(apiSerch)
    }
})