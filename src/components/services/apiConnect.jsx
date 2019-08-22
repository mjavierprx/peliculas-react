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
            return null;
        }
    },
    getCategoryMovies: async function(cat, page = 1) {
        const validCategories = ['top_rated', 'upcoming', 'popular'];
        if (!validCategories.includes(cat)) {
            window.location.href = "/peliculas/mas_valoradas"; 
        }
        try {
            let response = await fetch(`${baseUrlApi}/movie/${cat}?api_key=${apiKey}&page=${page}&language=es-ES`);
            let data = await response.json();
            return {data: data.results, total_pages: data.total_pages};
        }
        catch (error) {
            console.log('Ha habido un problema:', error.message);
            return null;
        }
    },
    getDetailMovie: async function(id) {
        try {
            let response = await fetch(`${baseUrlApi}/movie/${id}?api_key=${apiKey}&append_to_response=credits,videos&language=es-ES`);
            let data = await response.json();
            return data.status_code ? null : data;
        }
        catch (error) {
            console.log('Ha habido un problema:', error.message);
            return null;
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
            return null;
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
            return null;
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
            return null;
        }
    },
    getDetailPerson: async function(id) {
        try {
            let response = await fetch(`${baseUrlApi}/person/${id}?api_key=${apiKey}&language=es-ES`);
            let data = await response.json();
            return data.errors ? null : data;
        }
        catch (error) {
            console.log('Ha habido un problema:', error.message);
            return null;
        }
    },
    getDirectorMovies: async function(id, page = 1) {
        try {
            let response = await fetch(`${baseUrlApi}/discover/movie?api_key=${apiKey}&with_crew=${id}&page=${page}&language=es-ES`);
            let data = await response.json();
            return {data: data.results, total_pages: data.total_pages};
        }
        catch (error) {
            console.log('Ha habido un problema:', error.message);
            return null;
        }
    },
    getActMovies: async function(id, page = 1) {
        try {
            let response = await fetch(`${baseUrlApi}/discover/movie?api_key=${apiKey}&with_cast=${id}&page=${page}&language=es-ES`);
            let data = await response.json();
            return {data: data.results, total_pages: data.total_pages};
        }
        catch (error) {
            console.log('Ha habido un problema:', error.message);
            return null;
        }
    }
};

export default apiConnect;