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