import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.scss";
import {useEffect, useState, useContext} from "react";
import MoviesEmpty from "../MoviesEmpty/MoviesEmpty";
import { ScreenWidth, Count } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCardList({props, pageSavedMovie}) {
  const {
    activeShowAllMovies,
    moviesError,
    errorSaveMovies,
    isFiltered,
    handleShowAllMovies,
    handleSaveMovie,
    movies
  } = props;

  const { savedMovies }= useContext(CurrentUserContext);

  const buttonAllMovies = pageSavedMovie
    ? "movies-card-list__button-all_disabled"
    : `movies-card-list__button movies-card-list__button-all ${
        !activeShowAllMovies && "movies-card-list__button-all_disabled"
      }`;
  const buttonMore = `movies-card-list__button ${!pageSavedMovie && "movies-card-list__button movies-card-list__button_active button-hover"}`;
  
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResizeWindow = () => setWindowWidth(window.innerWidth);
  const [cardsCountToShow, setCardsCountToShow] = useState(0);

  
  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);
  
  useEffect(() => {
    if (windowWidth <= ScreenWidth.MOBILE) {
      setCardsCountToShow(Count.MOBILE);
    } else if (windowWidth <= ScreenWidth.TABLET) {
      setCardsCountToShow(Count.TABLET);
    } else {
      setCardsCountToShow(Count.DESKTOP);
    }
  }, [windowWidth, movies.length]);


  const handleShowMore = () => {
    setCardsCountToShow((current) => {
      return current + (windowWidth <= ScreenWidth.TABLET ? 2 : 3);
    })
  }
  

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
                    {movies.slice(0,cardsCountToShow ).map((film, index) => {
                      return index < cardsCountToShow &&
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
                  {movies.length > cardsCountToShow && (
                    <button className={buttonMore} aria-label="больше фильмов" type="button" onClick={handleShowMore}>
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
