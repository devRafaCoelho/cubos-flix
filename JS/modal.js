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