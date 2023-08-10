import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.scss";
import data from "../../utils/data";
import { useEffect, useState } from "react";
import MoviesEmpty from "../MoviesEmpty/MoviesEmpty";

function MoviesCardList(props) {
  const [countCard, setCountCard] = useState(12)

  useEffect(() => {
    let timer;
    const handleChangeWidthScreenTimer = () => {
      timer = setTimeout(handleChangeWidthScreen, 300);
    };
    window.addEventListener("resize", handleChangeWidthScreenTimer);
    return () => {
      window.removeEventListener("resize", handleChangeWidthScreenTimer);
      clearTimeout(timer);
    };
  });  

  const handleChangeWidthScreen = () => {    
    if (window.innerWidth < 377) {
      setCountCard(5)
    } else if (window.innerWidth < 898) {
      setCountCard(8)
    } else {
      setCountCard(12)
    }
  }

  return (
    <section className="movies-card-list">
      {data.length !== 0 ?
      <>
      <ul className="movies-card-list__list">
        {data.map((film, index) => {
          if (index < countCard) {
            return (
              <MoviesCard key={film.id} film={film} props={props}/>
            )
          } else {
            return ("");
          }        
        })}
      </ul>
      <button
        className="movies-card-list__button"
        aria-label="Кнопка: больше фильмов"
        type="button"
      >Ещё</button>
      </>
      : <MoviesEmpty/>}
    </section>
  );
}

export default MoviesCardList;
