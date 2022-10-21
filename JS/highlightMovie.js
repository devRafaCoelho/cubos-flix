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