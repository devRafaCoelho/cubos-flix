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

    if (allMovies.length < 6) {
        next.style.display = 'none';
        prev.style.display = 'none';
    } else {
        next.style.display = 'flex';
        prev.style.display = 'flex';
    }
}

function arrangeSections() {
    let section = [];
    let movieIndex = 0;

    while (movieIndex < allMovies.length) {
        while (section.length < 5) {
            section.push(allMovies[movieIndex++]);
        }

        sectionMovies.push(section);
        section = [];
    }
    createMovieCard();
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