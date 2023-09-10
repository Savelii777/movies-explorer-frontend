import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import Main from "../Main/Main";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import SavedMovies from "../SavedMovies/SavedMovies";
import "./App.scss";
import NotFound from "../NotFound/NotFound";
import {AppRoute, errorText} from "../../utils/constants";
import Movies from "../Movies/Movies";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import BurgerPopup from "../BurgerPopup/BurgerPopup";
import {useEffect, useState} from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Register from "../Register/Register";
import Preloader from "../Preloader/Preloader";
import {register, login} from "../../utils/Auth";
import {api} from "../../utils/MainApi";
import {apiMovies} from "../../utils/MoviesApi";
import { SHORT_FILM_DURATION } from '../../utils/constants';


function App() {
  
  const [saveCheckbox, setSaveCheckbox] = useState(false)
  const [savedMovies, setSavedMovies] = useState([]);
  const [formValueSave, setFormValueSave] = useState("");
  const [searchSavedMoviesPageError, setSearchSavedMoviesPageError] = useState("") 
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const [value, setValue] = useState("")
  const [saveCheckboxPage, setSaveCheckboxPage]= useState(false)
  const [registerResponse, isregisterResponse] = useState({status: false, text: "",});
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
  const [isOpenBurgerPopup, setisOpenBurgerPopup] = useState(false);
  const [updateUserError, setUpdateUserError] = useState("");
  const [moviesError, setMoviesError] = useState(""); 
  const [currentUser, setCurrentUser] = useState({});
  const [pageLoading, setPageloading] = useState(true);
  const [loggedIn, isLoggedIn] = useState(false);
  const [searchFormSpanError, setSearchFormSpanError] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [activeShowAllMovies, setActiveShowAllMovies] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredAllMovies, setFilteredAllMovies] = useState([]); 
  const [formValue, setFormValue] = useState("")
  const [requestsCounter, setRequestsCounter] = useState(0);


  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (loggedIn) {
      setPageloading(true);
      api.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPageloading(false);
        });
    } else {
      setPageloading(false);
    }
  }, [loggedIn]);
  
//////////////////////////////////////////////////

useEffect(() => {
  if (token) {
    setPageloading(true);
    api
      .getUserInfo()
      .then((res) => {
        if (res) {
          isLoggedIn(true);
          navigate(false);
        }
      })
      .catch(() => {
        isLoggedIn(false);
      })
      .finally(() => setPageloading(false));
  }
}, [token]);

useEffect(() => { 
  setIsLoading(true);
  if (loggedIn && isFiltered) {
    apiMovies
      .getMovies()
      .then((movies) => {
        setMovies(movies);
        navigate({replace: false});
        console.log("Фильмы подкгрузились")
      })
      .catch((err) => {
        setMoviesError(errorText)
      })
      .finally(setTimeout(() => setIsLoading(false), 1000));
    }
}, [loggedIn, isFiltered]);



useEffect(() => { 
  if (loggedIn) {
    setIsLoading(true);
    api
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(err);
        setMoviesError(errorText)
      })
      .finally(setTimeout(() => setIsLoading(false), 1000));
    }
}, [loggedIn]);


///////////////////////////////////////////////////////////

useEffect(() => {
  const handleEscape = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  const handleClosePopups = (evt) => {
    if (evt.target.classList.contains("burger-popup_active")) {
      closeAllPopups();
    }
  };

  const handleMouseDown = (evt) => {
    handleClosePopups(evt);
  };

  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("keydown", handleEscape);

  return () => {
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("keydown", handleEscape);
  };
}, [closeAllPopups]);



async function handleRegisterClick(password, email, name) {
  try {
    const res = await register(password, email, name);
    if (res) {
      isregisterResponse({
        status: true,
        text: "Ура! Вы успешно зарегистрировались!",
      });
      await handleLoginClick(password, email);
    }
  } catch (error) {
    if (error === "Ошибка 409") {
      setOpenInfoTooltip(true);
      isregisterResponse({
        status: false,
        text: "Упс, пользователь с такой почтой уже есть",
      });
    } else {
      isregisterResponse({
        status: false,
        text: "Упс, Что-то пошло не так! Попробуйте ещё раз.",
      });
    }
  } finally {
    setOpenInfoTooltip(true);
  }
}

async function handleLoginClick(password, email) {
  try {
    const data = await login(password, email);
    localStorage.setItem("jwt", data.token);
    navigate("/movies");
  } catch (error) {
    if (error === "Ошибка 401") {
      setOpenInfoTooltip(true);
      isregisterResponse({
        status: false,
        text: "Не правильная почта или пароль",
      });
    } else if (!error) {
      isregisterResponse({
        status: false,
        text: error,
      });
    }
  }
}

function handleUpdateUserClick(value) {
  setIsLoading(true);
  api.saveNewUserInfo(value)
    .then((user) => {
      setCurrentUser(user);
      setUpdateUserError("Данные изменены успешно");
      closeAllPopups();
      setRequestsCounter(requestsCounter+1);
      if (requestsCounter%2===1) {
        setOpenInfoTooltip(true);
        isregisterResponse({
          status: true,
          text: "Ура! Вы успешно изменили данные!",
        });
      }
    })
    .catch((err) => {
      if (err === "Ошибка: 409") {
        setUpdateUserError("Пользователь с такой почтой уже есть");
        setRequestsCounter(requestsCounter+1);
        if (requestsCounter%2===1) {
          setOpenInfoTooltip(true);
          isregisterResponse({
            status: false,
            text: "Упс, пользователь с такой почтой уже есть",
          });
        }
      } else {
        setUpdateUserError(err);
        setRequestsCounter(requestsCounter+1);
        if (requestsCounter%2===1) {
          setOpenInfoTooltip(true);
          isregisterResponse({
            status: false,
            text: "Упс, Что-то пошло не так! Попробуйте ещё раз.",
          });
        }
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
}




  function signOut() {
    navigate(AppRoute.Login);
    isLoggedIn(false);
    setCurrentUser("");
    setCheckbox(false);
    localStorage.clear();
    setFilteredAllMovies({});
    setIsFiltered(false);
    setFormValue("")
    setValue("")
    setFormValueSave("")
    setSaveCheckboxPage(false)
    setSaveCheckbox(false)
  }

  function handleOpenBurgerPopup() {
    setisOpenBurgerPopup(true);
  }

  function closeAllPopups() {
    setOpenInfoTooltip(false);
    setisOpenBurgerPopup(false);
  }

  function handleSaveMovie(movie) {
    api
      .saveMovies(movie)
      .then((movie) => {
        setSavedMovies(savedMovies.concat(movie));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovies(movie) {
    const { _id } = movie;
    api
      .deleteMovies(_id)
      .then(() => {
        setSavedMovies((i) => i.filter((m) => m._id !== _id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFilteredMovies(formValue, checkbox) {
    if (!localStorage.getItem('allMovies')) {
      setIsLoading(true);
      if (loggedIn && isFiltered) {
      apiMovies
      .getMovies()
      .then((movies) => {
      setMovies(movies);
      navigate({ replace: false });
      console.log("Фильмы подгрузились");
      })
      .catch((err) => {
      setMoviesError(errorText);
      })
      .finally(setTimeout(() => setIsLoading(false), 1000));
      }
    }
    const filteredMovies = movies.filter((item) =>
    item.nameRU.toLowerCase().includes(formValue.toLowerCase())
    );
    let sortFilteredMovies = filteredMovies;
    if (checkbox) {
    sortFilteredMovies = filteredMovies.filter((movie) => movie.duration <= SHORT_FILM_DURATION);

    }
    setActiveShowAllMovies(true);
    setIsFiltered(true);
    setFilteredAllMovies(sortFilteredMovies);
    localStorage.setItem('formValue', JSON.stringify(formValue));
    localStorage.setItem('filteredMovies', JSON.stringify(sortFilteredMovies));
    }
    

 
  function handleShowAllMovies() {
    setFilteredAllMovies(movies)
    localStorage.removeItem("filteredMovies")
    localStorage.removeItem("formValue")
    localStorage.removeItem("checkbox")
    localStorage.setItem('allMovies', JSON.stringify(movies));
    window.scrollTo(0, 0);
    setIsFiltered(true);
    setFormValue("")
    setSearchFormSpanError("")
    setActiveShowAllMovies(false);
    setCheckbox(false);
  }

////////////////////////////////////////

function handleCheckboxFiltered(checkbox) {
  setIsFiltered(true);
  let filterMovies;

  const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const formValue = JSON.parse(localStorage.getItem('formValue'));

  if (filteredMovies) {
    let sortFilteredMovies = filteredMovies.filter((movie) => movie.duration <= SHORT_FILM_DURATION);



    if (checkbox) {
      filterMovies = sortFilteredMovies;
    } else if (formValue) {
      setActiveShowAllMovies(true);
      filterMovies = movies.filter((item) =>
        item.nameRU.toLowerCase().includes(formValue.toLowerCase())
      );
    } else if (!checkbox && !allMovies) {
      setActiveShowAllMovies(true);
      filterMovies = filteredMovies;
    } else if (!checkbox && allMovies) {
      filterMovies = movies;
    }
  } else if (allMovies) {
    let sortFilteredMovies = allMovies.filter((movie) => movie.duration <= SHORT_FILM_DURATION);


    if (checkbox) {
      filterMovies = sortFilteredMovies;
    } else if (!checkbox) {
      filterMovies = allMovies;
    }
  } else {
    setMoviesError("Начните поиск");
    return;
  }

  setFilteredAllMovies(filterMovies);
  localStorage.setItem('filteredMovies', JSON.stringify(filterMovies));
}

///////////////////////////////////////////

useEffect(() => {
  const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
  const allMovies = JSON.parse(localStorage.getItem('allMovies'));

  if (filteredMovies) {
    setIsFiltered(true);
    setFilteredAllMovies(filteredMovies);
  } else if (allMovies) {
    setIsFiltered(true);
    setFilteredAllMovies(allMovies);
  } else {
    setFilteredAllMovies({});
  }
}, []);

  //сохраненные фильмы
  function handleFilterSaveMovies(inputSearch) {
    setValue(inputSearch);
  }

  function handleCheckboxFilteredSaveMovies(checkbox) {
    setSaveCheckboxPage(checkbox)
  }

  useEffect(() => {
    let filteredMovies = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(value.toLowerCase())
    );
  
    if (saveCheckboxPage) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= SHORT_FILM_DURATION);

    }
  
    setFilteredMovies(filteredMovies);
  }, [savedMovies, value, saveCheckboxPage]);

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser, savedMovies, setSavedMovies}}>
      <div className="page">
        {pageLoading ? (
          <Preloader />
        ) : (
          <>
            <Routes>
              <Route path={AppRoute.Register} element={loggedIn ? <Navigate to="/"/> :<Register register={handleRegisterClick} />} />
              <Route path={AppRoute.Login} element={loggedIn ? <Navigate to="/"/> : <Login login={handleLoginClick} />} />
              <Route path={AppRoute.Main}
                element={<Main isLoggedIn={loggedIn} onOpenBurgerPopup={handleOpenBurgerPopup} />}
              />
              <Route path={AppRoute.Movies}
                element={
                  <ProtectedRouteElement
                    component={Movies}
                    moviesError={moviesError}
                    isLoggedIn={loggedIn}
                    isLoading={isLoading}
                    onOpenBurgerPopup={handleOpenBurgerPopup}
                    handleSaveMovie={handleSaveMovie}
                    handleFilteredMovies={handleFilteredMovies}
                    isFiltered={isFiltered}
                    activeShowAllMovies={activeShowAllMovies}
                    setActiveShowAllMovies={setActiveShowAllMovies}
                    handleShowAllMovies={handleShowAllMovies}
                    handleDeleteMovies={handleDeleteMovies}
                    movies={filteredAllMovies}
                    errorSpan={searchFormSpanError}
                    setErrorSpan={setSearchFormSpanError}
                    handleCheckboxFiltered={handleCheckboxFiltered}
                    checkbox={checkbox}
                    setCheckbox={setCheckbox}
                    formValue={formValue} 
                    setFormValue={setFormValue}
                  />
                }
              />
              <Route path={AppRoute.SavedMovies}
                element={
                  <ProtectedRouteElement
                    component={SavedMovies}
                    handleDeleteMovies={handleDeleteMovies}
                    isLoggedIn={loggedIn}
                    onOpenBurgerPopup={handleOpenBurgerPopup}
                    isLoading={isLoading}
                    errorSpan={searchSavedMoviesPageError}
                    setErrorSpan={setSearchSavedMoviesPageError}
                    handleSaveMovie={handleSaveMovie}
                    formValue={formValueSave}
                    setFormValue={setFormValueSave}
                    checkbox={saveCheckbox}
                    setCheckbox={setSaveCheckbox}
                    movies={filteredMovies}
                    handleFilteredMovies={handleFilterSaveMovies} 
                    handleCheckboxFiltered={handleCheckboxFilteredSaveMovies}
                  />
                }
              />
              <Route
                path={AppRoute.Profile}
                element={
                  <ProtectedRouteElement
                    component={Profile}
                    isLoggedIn={loggedIn}
                    onOpenBurgerPopup={handleOpenBurgerPopup}
                    onUpdateUser={handleUpdateUserClick}
                    updateUserError={updateUserError}
                    signOut={signOut}
                  />
                }
              />
              <Route path={AppRoute.NotFound} element={<NotFound />} />
            </Routes>
            <InfoTooltip
              isOpen={isOpenInfoTooltip}
              onClose={closeAllPopups}
              registerResponse={registerResponse}
            />
            <BurgerPopup isOpen={isOpenBurgerPopup} onClose={closeAllPopups} />
          </>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;