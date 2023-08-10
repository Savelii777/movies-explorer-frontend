import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import { AppRoute } from "../../constants";
import BurgerPopup from "../BurgerPopup/BurgerPopup";
import "./App.scss";
function App() {
  const [isOpenBurgerPopup, setIsOpenBurgerPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    function handleEscape(evt) {
      if (evt.key === "Escape") {
        closeBurgerPopup();
      }
    }
    function handleClosePopups(evt) {
      if (evt.target.classList.contains("burger-popup_active")) {
        closeBurgerPopup();
      }
    }

    document.addEventListener("mousedown", handleClosePopups);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClosePopups);
    };
  }, []);
  function handleOpenBurgerPopup() {
    setIsOpenBurgerPopup(true);
  }
  function closeBurgerPopup() {
    setIsOpenBurgerPopup(false);
  }
  function handleLoginClick() {
    navigate(AppRoute.Movies, { replace: true });
  }
  return (
    <div className="page">
      <BurgerPopup isOpen={isOpenBurgerPopup} onClose={closeBurgerPopup} />
      <Routes>
        <Route path={AppRoute.Register} element={<Register />} />
        <Route
          path={AppRoute.Login}
          element={<Login login={handleLoginClick} />}
        />
        <Route
          path={AppRoute.Main}
          element={<Main isLoggedIn={isLoggedIn} />}
        />
        <Route
          path={AppRoute.Movies}
          element={
            <Movies
              onOpenBurgerPopup={handleOpenBurgerPopup}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path={AppRoute.SavedMovies}
          element={
            <SavedMovies
              onOpenBurgerPopup={handleOpenBurgerPopup}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path={AppRoute.Profile}
          element={<Profile onOpenBurgerPopup={handleOpenBurgerPopup} />}
        />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
