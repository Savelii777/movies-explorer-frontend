import React from 'react';
import "./Promo.scss";
import promoImg from "../../images/landing-logo.svg";

function Promo() {
  const navigateToAboutProj = () => {
    const aboutProjElement = document.getElementById('about-proj');
    if (aboutProjElement) {
      aboutProjElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="promo">
      <img
        className="promo__image"
        src={promoImg}
        alt="изображение глобуса, вместо стран надпись - web"
      />
      <div className="promo__text-container">
      <h1 className="promo__title">Учебный проект студента факультета <span>Веб-разработки.</span></h1>
        <p className="promo__paragraph">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a
          href="https://practicum.yandex.ru/"
          target="_blank"
          rel="noreferrer"
          className="promo__link text-hover"
        >
          <button
            className="promo__button"
            type="button"
            aria-label="Кнопка: узнать больше"
          >
            Узнать больше
          </button>
        </a>
      </div>
    </section>
  );
}

export default Promo;
