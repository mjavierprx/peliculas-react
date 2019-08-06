const baseUrlApi = 'https://api.themoviedb.org/3';
const apiKey = '22e540d93b35f018eaca6bb68784d866';
const apiConnect = {
    searchMovies: async function(query, page = 1) {
        try {
            let response = await fetch(`${baseUrlApi}/search/movie?api_key=${apiKey}&query=${query}&page=${page}&language=es-ES`);
            let data = await response.json();
            return {data: data.results, total_pages: data.total_pages};
        }
        catch (error) {
            console.log('Ha habido un problema:', error.message);
        }
    },
    getCategory: async function(cat, page = 1) {
        const validCategories = ['top_rated', 'upcoming', 'popular'];
        if (!validCategories.includes(cat)) {



            console.log("kkkkkk");


            cat = 'top_rated';
            this.context.router.history.push('/someRoute');


        }
        try {
            let response = await fetch(`${baseUrlApi}/movie/${cat}?api_key=${apiKey}&page=${page}&language=es-ES`);
            let data = await response.json();
            return {data: data.results, total_pages: data.total_pages};
        }
        catch (error) {
            console.log('Ha habido un problema:', error.message);
        }
    },
    getDetailMovie: async function(id) {
        try {
            let response = await fetch(`${baseUrlApi}/movie/${id}?api_key=${apiKey}&append_to_response=credits,videos&language=es-ES`);
            let data = await response.json();
            return data;
        }
        catch (error) {
            console.log('Ha habido un problema:', error.message);
        }
    },
    getGenresList: async function() {
        try {
            let response = await fetch(`${baseUrlApi}/genre/movie/list?api_key=${apiKey}&language=es-ES`);
            let data = await response.json();
            return data.genres;
        }
        catch (error) {
            console.log('Ha habido un problema:', error.message);
        }
    },
    getGenreMovies: async function(id, page = 1) {
        try {
            let response = await fetch(`${baseUrlApi}/discover/movie?api_key=${apiKey}&with_genres=${id}&page=${page}&language=es-ES`);
            let data = await response.json();
            return {data: data.results, total_pages: data.total_pages};
        }
        catch (error) {
            console.log('Ha habido un problema:', error.message);
        }
    },
    getSimilarMovies: async function(id, page = 1) {
        try {
            let response = await fetch(`${baseUrlApi}/movie/${id}/similar?api_key=${apiKey}&page=${page}&language=es-ES`);
            let data = await response.json();
            return {data: data.results, total_pages: data.total_pages};
        }
        catch (error) {
            console.log('Ha habido un problema:', error.message);
        }
    }
};

export default apiConnect;