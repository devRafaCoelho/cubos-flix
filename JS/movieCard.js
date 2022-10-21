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