import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.scss";
import {useEffect, useState} from "react";
import MoviesEmpty from "../MoviesEmpty/MoviesEmpty";

function MoviesCardList({props, pageSavedMovie}) {
  const {
    activeShowAllMovies,
    moviesError,
    errorSaveMovies,
    savedMovies,
    isFiltered,
    handleShowAllMovies,
    handleSaveMovie,
    movies
  } = props;

  const [countCard, setCountCard] = useState(12);
  const buttonAllMovies = pageSavedMovie
    ? "movies-card-list__button-all_disabled"
    : `movies-card-list__button movies-card-list__button-all ${
        !activeShowAllMovies && "movies-card-list__button-all_disabled"
      }`;
  const buttonMore = `movies-card-list__button ${!pageSavedMovie && "movies-card-list__button movies-card-list__button_active button-hover"}`;

  useEffect(() => {
    const handleChangeWidthScreen = () => {
      if (window.innerWidth < 377) {
        setCountCard(5);
      } else if (window.innerWidth < 898) {
        setCountCard(8);
      } else {
        setCountCard(12);
      }
    };
  
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(handleChangeWidthScreen, 300);
    };
  
    let timer;
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);
  
  const handleMoreFilmsShow = () => {
    if (movies.length !== 0) {
      if (window.innerWidth > 897) {
        setCountCard((prevCount) => prevCount + 3);
      } else {
        setCountCard((prevCount) => prevCount + 2);
      }
    }
  };

  return (
    <section className="movies-card-list">
      {!pageSavedMovie ?
        <>
          {!moviesError ? 
            <>
              {!movies.length && !isFiltered ?             
                <MoviesEmpty
                  text={"Начните поиск"}
                  className={!pageSavedMovie && "movies-card-list__button movies-card-list__button-all"}
                  onClick={handleShowAllMovies}
                />
              : <>
                {movies.length !== 0 && isFiltered ? (
                  <>
                  <ul className="movies-card-list__list">
                    {movies.slice(0, countCard).map((film, index) => {
                      return index < countCard &&
                        <MoviesCard
                        //проверяем каждый фильм и сравниваем с сохраненными фильмами 
                          isSaved={savedMovies.find((savedMovie) => savedMovie.movieId === film.id)}
                          handleSaveMovie={handleSaveMovie}
                          savedMovies={savedMovies}
                          key={film.id}
                          film={film}
                          props={props}
                          pageSavedMovie={pageSavedMovie}
                        />
                    })}
                  </ul>
                  {movies.length > countCard && (
                    <button className={buttonMore} aria-label="больше фильмов" type="button" onClick={handleMoreFilmsShow}>
                      Ещё
                    </button>
                  )}
                  <button className={buttonAllMovies} aria-label="все фильмы" type="button" onClick={handleShowAllMovies}>
                    Все фильмы
                  </button>
                </>
                ) : (
                  <MoviesEmpty text={"Ничего не найдено"} className={buttonAllMovies} onClick={handleShowAllMovies} />
                )}
              </> 
            }
            </>
          : <MoviesEmpty text={moviesError} className={buttonAllMovies} onClick={handleShowAllMovies} />}
        </>
      : <>
        {!errorSaveMovies ?
        <>
          {movies.length !== 0 ?
            <ul className="movies-card-list__list">
              {movies.map((film) => {
                return(<MoviesCard key={film.movieId} film={film} props={props} pageSavedMovie={pageSavedMovie}/>)
              })}
            </ul>
          : 
            <MoviesEmpty text={"Фильмы не найдены"} className={buttonAllMovies} />
          }
        </>
         : <MoviesEmpty text={errorSaveMovies} className={buttonAllMovies}/> }
        </>
      }
    </section>
  );
}

export default MoviesCardList;
