import {Link} from "react-router-dom";
import "./Profile.scss";
import {AppRoute} from "../../constants";
import Layout from "../Layout/Layout";
import { useState } from "react";
import ValidationForm from "../../hooks/ValidationForm";
import { useNavigate } from "react-router-dom";


function Profile({onOpenBurgerPopup}) {
  const {handleChange, errors, formValue } = ValidationForm();
  const [isInputEdit, setIsInputEdit] = useState(true);
  const navigate = useNavigate();

  const navigateToRoot = () => {
    navigate("/");
  };
  
  function handleEditClick(evt) {
    evt.preventDefault();
    setIsInputEdit(!isInputEdit);
  }

  const saveButton = isInputEdit ? "profile__save-buttons" : "profile__save-buttons_active";
  const editButton = isInputEdit ? "profile__form-buttons_active" : "profile__form-buttons";
  const buttonDisables = (errors.email || errors.name );
  const buttonClassName = `form__button profile__save-button ${buttonDisables ? "form__button_disabled" : "button-hover"}`;
  
  return (
    <Layout className="header" title="Main" isLoggedIn page={false} onOpenBurgerPopup={onOpenBurgerPopup}>
      <main className="profile">
      <section>
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="form" noValidate>
          <div className="profile-form__container">
            <div className="profile-form__container-input">
              <label className="profile-form__title">Имя</label>
              <input readOnly={isInputEdit}
                id="name"
                className="profile-form__input"
                name="name"
                type="text"
                value={formValue.name || 'name'}
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                placeholder="введите ваше имя"
              />
            </div>
            <span className="form__text-error form__text-error-profile">{errors.name}</span>
          </div>
          <div className="profile-form__container">
            <div className="profile-form__container-input">
              <label className="profile-form__title">E-mail</label>
              <input readOnly={isInputEdit}
                id="email"
                className="profile-form__input"
                name="email"
                type="email"
                value={formValue.email || 'email@mail.ru'}
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                placeholder="введите ваш email"
              />
            </div>
            <span className="form__text-error form__text-error-profile">{errors.email}</span>
          </div>
          <div className={editButton}>
            <button onClick={handleEditClick}
              className="profile__form-button text-hover"
              type="submit"
              aria-label="Редактировать информацию о себе"
            >
              Редактировать
            </button>
          <div className="profile__link text-hover">
            <button className="profile__button" type="button" aria-label="" onClick={navigateToRoot} > Выйти из аккаунта </button>
          </div>
        </div>
        <div className={saveButton}>
          <span className="profile__span">При обновлении профиля произошла ошибка.</span>
          <button className={buttonClassName} type="button" disabled={buttonDisables}>Сохранить</button>
        </div>
        </form>
        </section>
      </main>
    </Layout>
  );
}

export default Profile;
