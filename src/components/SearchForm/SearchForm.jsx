  import React, { useEffect, useContext, useState} from "react";
  import "./SearchForm.scss";


  function SearchForm({props, pageSavedMovie}) {
    const {
      setActiveShowAllMovies,
      errorSpan,
      setErrorSpan,
      checkbox, 
      setCheckbox,
      isFiltered,
      formValue, 
      setFormValue,
      handleFilteredMovies, 
      handleCheckboxFiltered,
    } = props;

  const [formSavedMoviesValue, setFormSavedMoviesValue] = useState("");


  const switcherClassName = `search-form__checkbox-switcher ${
      checkbox && "search-form__checkbox-switcher_active"
    }`;
    const buttonCheckboxClassName = `search-form__checkbox-button ${
      checkbox && "search-form__checkbox-button_active"
    }`;

    useEffect(() => {
      if (localStorage.getItem("formValue") && !pageSavedMovie) {
        const value = JSON.parse(localStorage.getItem("formValue"))
        setFormValue(value);
      }else{
        setFormValue(formSavedMoviesValue); 
      }
    }, []);

    useEffect(() => {
      if(pageSavedMovie){
        handleFilteredMovies(formSavedMoviesValue, checkbox, false)
      }
    }, [pageSavedMovie]);


    useEffect(() => {
      if(localStorage.getItem("checkbox") &&! pageSavedMovie) {
        const checkbox = JSON.parse(localStorage.getItem("checkbox"));
        setCheckbox(checkbox)
      }
      if(pageSavedMovie){
        setCheckbox(false)
        handleCheckboxFiltered(false)
      }
    }, []);

    function handleChange(e) {
      if(pageSavedMovie){
        setFormSavedMoviesValue(e.target.value);
        setErrorSpan("");
      }
        setFormValue(e.target.value);
        setErrorSpan("");
    }

    function handleCheckboxChange() { // нажали на чекбокс
      if(isFiltered && !pageSavedMovie) {
        setCheckbox(!checkbox);
        handleCheckboxFiltered(!checkbox)
        localStorage.setItem('checkbox', JSON.stringify(!checkbox));
      } else if(pageSavedMovie){
        setCheckbox(!checkbox);
        handleCheckboxFiltered(!checkbox)
      }
    }

    function handelSortSubmit(e) {
      e.preventDefault();
      !pageSavedMovie && setActiveShowAllMovies(true);
      if (!e.target.closest("form").checkValidity()) {
        setErrorSpan("Поле не должно быть пустым");
        return;
      }
      handleFilteredMovies(formValue, checkbox, false)
    }


    return (
      <section className="search-form">
        <form onSubmit={handelSortSubmit} noValidate>
          <div className="search-form__input-container">
          <div className="search-form__icon"></div>
            <input className="search-form__input" placeholder="Фильм" type="text" name="movie" value={formValue || "" } onChange={handleChange} required></input>
            <button className={"search-form__button button-hover"} type="submit" aria-label="Кнопка найти"  disabled={errorSpan}>Найти</button>
          </div>
            <span className="form__text-error">{errorSpan}</span>
        </form>
        <label className="search-form__checkbox" onChange={handleCheckboxChange} >
          <input
            className={switcherClassName}
            type="checkbox"
            checked={checkbox}
          />
          <div className={buttonCheckboxClassName}/>
          <p className="search-form__checkbox-name">Короткометражки</p>
        </label>
      </section>
    );
  }

  export default SearchForm;