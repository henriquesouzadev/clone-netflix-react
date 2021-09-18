import React from 'react';
import './App.css';
import { getHomeList, getMovieInfo } from './Api';
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

function App() {

  const [movieList, setMovieList] = React.useState([]);
  const [featuredData, setFeaturedData] = React.useState(null);
  const [blackHeader, setBlackHeader] = React.useState(false);

  React.useEffect(() => {
    const loadAll = async () => {
      // pegando a lista total
      let list = await getHomeList();
      setMovieList(list);

      // pegando o featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);

  React.useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 50) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="App">
      <div className="page">
        <Header black={blackHeader} />

        {featuredData && <FeaturedMovie item={featuredData} /> }

        <section className="lists">
          {movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>

        <footer>
          Feito com <span role="img" aria-label="coração">❤️</span> por henriquesouza.dev.br<br/>
          Direitos de imagem para Netflix<br/>
          Dados pegos do site Themoviedb.org
        </footer>
        
        {movieList.length <= 0 && (
          <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
          </div>
        )}
      </div>
    </div>
  );

}
export default App;
