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
    }
};

export default apiConnect;