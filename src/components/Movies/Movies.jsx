import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.scss";
import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader"
import { useState } from "react";

function Movies({onOpenBurgerPopup, isLoading}) {
  const [isSaved, setIsSaved] = useState(false)

  function handleSaveClick() {
    setIsSaved(!isSaved);
    console.log('click')
  }

  const cardSaveButtonClassName = `movies-card__save ${
    isSaved ? 'movies-card__save_active' : ''
  }`;

  return (
    <Layout className="header" title="Main" isLoggedIn page onOpenBurgerPopup={onOpenBurgerPopup}>
      <main className="movies">
        <SearchForm />
        {isLoading ? <Preloader /> : 
          <MoviesCardList className={cardSaveButtonClassName} alt="кнопка: избранное" saveClick={handleSaveClick}/>}
        </main>
    </Layout>
  );
}

export default Movies;