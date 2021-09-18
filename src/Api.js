const API_KEY = '90e2a1da20d47c8b4f70dc886b515938';
const API_BASE = 'https://api.themoviedb.org/3';
const languageAndKey = `language=pt-BR&api_key=${API_KEY}`;

const basicFetch = async (endpoint) => {
   const req = await fetch(`${API_BASE}${endpoint}`);
   const json = await req.json();
   return json;
}

export const getHomeList = async () => {
   return [
      {
         slug: 'originals',
         title: 'Originais da Netflix',
         items: await basicFetch(`/discover/tv?with_network=213&${languageAndKey}`),
      },
      {
         slug: 'trending',
         title: 'Recomendados para você',
         items: await basicFetch(`/trending/all/week?${languageAndKey}`),
      },
      {
         slug: 'toprated',
         title: 'Em alta',
         items: await basicFetch(`/movie/top_rated?${languageAndKey}`),
      },
      {
         slug: 'action',
         title: 'Ação',
         items: await basicFetch(`/discover/movie?with_genres=28&${languageAndKey}`),
      },
      {
         slug: 'comedy',
         title: 'Comédia',
         items: await basicFetch(`/discover/movie?with_genres=35&${languageAndKey}`),
      },
      {
         slug: 'horror',
         title: 'Terror',
         items: await basicFetch(`/discover/movie?with_genres=27&${languageAndKey}`),
      },
      {
         slug: 'romance',
         title: 'Romance',
         items: await basicFetch(`/discover/movie?with_genres=10749&${languageAndKey}`),
      },
      {
         slug: 'documentary',
         title: 'Documentários',
         items: await basicFetch(`/discover/movie?with_genres=99&${languageAndKey}`),
      },
   ];
};

export const getMovieInfo = async (movieId, type) => {
   let info = {};

   if (movieId) {
      switch (type) {
         case 'movie':
            info = await basicFetch(`/movie/${movieId}?${languageAndKey}`);
         break;

         case 'tv':
            info = await basicFetch(`/tv/${movieId}?${languageAndKey}`);
         break;

         default: 
            info = null;
         break;
      }
   }

   return info;
}