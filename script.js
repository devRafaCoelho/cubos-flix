const body = document.querySelector("body");
const headerButton = document.querySelector(".btn-theme");
const input = document.querySelector(".input");
const movies = document.querySelector(".movies");
const prev = document.querySelector(".btn-prev");
const next = document.querySelector(".btn-next");
const highlightVideoLink = document.querySelector(".highlight__video-link");
const highlightVideo = document.querySelector(".highlight__video");
const highlightTitle = document.querySelector(".highlight__title");
const highlightRating = document.querySelector(".highlight__rating");
const highlightGenres = document.querySelector(".highlight__genres");
const highlightLaunch = document.querySelector(".highlight__launch");
const highlightDescription = document.querySelector(".highlight__description");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
const modalTitle = document.querySelector(".modal__title");
const modalImg = document.querySelector(".modal__img");
const modalDescription = document.querySelector(".modal__description");
const modalAverage = document.querySelector(".modal__average");
const modalGenres = document.querySelector(".modal__genres");
let allMovies = [];
let sectionMovies = [];
let sectionIndex = 0;

// Grid Movies
async function listMovies() {
    try {
        const data = await (await fetch("https://tmdb-proxy.cubos-academy.workers.dev/3/trending/movie/day?language=pt-BR&include_adult=false")).json();

        createDataArray(data);
        arrangeSections();
    } catch (error) {
        console.log(error.message);
    }
}
listMovies();

function createDataArray(link) {
    allMovies = [];
    sectionMovies = [];
    sectionIndex = 0;
    movies.innerHTML = "";

    link.results.forEach(element => {
        allMovies.push({
            id: element.id,
            title: element.title,
            average: element.vote_average,
            popularity: element.popularity,
            image: element.poster_path,
            icon: "./assets/estrela.svg"
        });
    });

    allMovies.sort((a, b) => { return b.popularity - a.popularity });
}

function arrangeSections() {
    let section = [];
    let movieIndex = 0;

    while (movieIndex < allMovies.length) {
        while (section.length < 5) {
            section.push(allMovies[movieIndex++])
        }
        sectionMovies.push(section);
        section = [];
    }

    createMovieCard();
}

function createMovieCard() {
    sectionMovies[sectionIndex].forEach(element => {
        const movieTitle = document.createElement("span");
        movieTitle.classList.add("movie__title");
        movieTitle.textContent = element.title;

        const image = document.createElement("img");
        image.src = "./assets/estrela.svg";
        image.alt = "Estrela";

        const movieRating = document.createElement("span");
        movieRating.classList.add("movie__rating");
        movieRating.textContent = element.average;

        const movieInfoContainer = document.createElement("div");
        movieInfoContainer.classList.add("movie__info__container");

        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie__info");

        const movie = document.createElement("div");
        movie.classList.add("movie");
        movie.id = element.id;
        movie.style.backgroundImage = `url('${element.image}')`;
        movie.addEventListener("click", event => {
            event.preventDefault();
            modal.classList.remove("hidden");
            createModal(event.target);
            body.style.overflowY = 'hidden';
        });

        modalClose.addEventListener("click", () => {
            modal.classList.add("hidden");
            body.style.overflowY = 'scroll';
        });

        movieInfoContainer.append(image, movieRating);
        movieInfo.append(movieTitle, movieInfoContainer);
        movie.append(movieInfo);
        movies.append(movie);
    });
}

next.addEventListener('click', () => {
    sectionIndex++;

    if (sectionIndex > sectionMovies.length - 1) {
        sectionIndex = 0;
    }

    movies.innerHTML = "";
    createMovieCard();
});

prev.addEventListener('click', () => {
    sectionIndex--;

    if (sectionIndex < 0) {
        sectionIndex = sectionMovies.length - 1;
    }

    movies.innerHTML = "";
    createMovieCard();
});

// Find Movie
input.addEventListener("keyup", findMovie);

async function findMovie() {
    try {
        if (input.value === '') return listMovies();

        const data = await (await fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false**&query=${input.value}**`)).json();

        createDataArray(data);
        arrangeSections()
    } catch (error) {
        console.log(error.message);
    }
}

// Highlight
(async function () {
    try {
        const body = await (await fetch("https://tmdb-proxy.cubos-academy.workers.dev/3/trending/movie/day?language=pt-BR&include_adult=false")).json();

        const dataMovie = await (await fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${body.results[0].id}?language=pt-BR`)).json();

        const dataTrailer = await (await fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${body.results[0].id}/videos?language=pt-BR`)).json();

        highlightVideo.style.backgroundImage = `url(${body.results[0].backdrop_path})`;
        highlightTitle.textContent = body.results[0].title;
        highlightRating.textContent = body.results[0].vote_average.toFixed(1);
        highlightDescription.textContent = body.results[0].overview;
        highlightGenres.textContent = dataMovie.genres.map(genre => genre.name).join(", ");
        highlightLaunch.textContent = formatDate(body.results[0].release_date);

        const officialTrailerIndex = dataTrailer.results.length > 1 ? dataTrailer.results.length - 1 : 0;
        highlightVideoLink.href = `https://www.youtube.com/watch?v=${dataTrailer.results[officialTrailerIndex].key}`;
    } catch (error) {
        console.log(error.message);
    }
})();

function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
}

// Modal
async function createModal(movie) {
    try {
        const data = await (await fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movie.id}?language=pt-BR`)).json();

        modalTitle.textContent = data.title;
        modalImg.src = data.backdrop_path;
        modalDescription.textContent = data.overview;
        modalAverage.textContent = data.vote_average.toFixed(1);

        modalGenres.innerHTML = '';
        data.genres.forEach(element => {
            const genre = document.createElement("span");
            genre.classList.add("modal__genre");
            genre.textContent = element.name;

            modalGenres.append(genre);
        });
    } catch (error) {
        console.log(error.message);
    }
}

// Change Theme
let initialTheme = localStorage.getItem('theme') ?? 'light';
verifyTheme();

function verifyTheme() {
    if (initialTheme === 'light') {
        lightMode();
    } else if (initialTheme === 'dark') {
        darkMode();
    }
}

headerButton.addEventListener('click', event => {
    event.preventDefault();
    if (initialTheme === 'light') {
        darkMode();
        initialTheme = 'dark';
        localStorage.setItem('theme', 'dark');
    } else if (initialTheme === 'dark') {
        lightMode();
        initialTheme = 'light';
        localStorage.setItem('theme', 'light');
    }
});

function lightMode() {
    headerButton.src = './assets/light-mode.svg';
    prev.src = './assets/seta-esquerda-preta.svg';
    next.src = './assets/seta-direita-preta.svg';
    body.style.setProperty('--background-color', '#fff');
    body.style.setProperty('--input-border-color', '#979797');
    body.style.setProperty('--color', '#000');
    body.style.setProperty('--shadow-color', '0px 4px 8px rgba(0, 0, 0, 0.15)');
    body.style.setProperty('--highlight-background', '#fff');
    body.style.setProperty('--highlight-color', 'rgba(0, 0, 0, 0.7)');
    body.style.setProperty('--highlight-description', '#000');
}

function darkMode() {
    headerButton.src = './assets/dark-mode.svg';
    prev.src = './assets/seta-esquerda-branca.svg';
    next.src = './assets/seta-direita-branca.svg';
    body.style.setProperty('--background-color', '#242424');
    body.style.setProperty('--input-border-color', '#fff');
    body.style.setProperty('--color', '#fff');
    body.style.setProperty('--shadow-color', '0px 4px 8px rgba(255, 255, 255, 0.15)');
    body.style.setProperty('--highlight-background', '#454545');
    body.style.setProperty('--highlight-color', 'rgba(255, 255, 255, 0.7)');
    body.style.setProperty('--highlight-description', 'rgba(255, 255, 255, 0.8)');
}