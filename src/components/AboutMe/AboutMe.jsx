import React from "react";
import "./AboutMe.scss";
import MainDescription from "../MainDescription/MainDescription";
import me from "../../images/me.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <MainDescription title="Студент" />
      <div className="about-me__container">
        <img className="about-me__image" src={me} alt="фотография студента" />
        <div className="about-me__info">
          <h3 className="about-me__title">Савелий</h3>
          <p className="about-me__description">Фронтенд-разработчик, 19 лет</p>
          <p className="about-me__text">
            Я живу в Санкт-Петербурге. Студент ИТМО. С 2022 по 2023 работал в
            компании по разработке коммерческих проектов. Создал платформу по
            обучению студентов береговой охраны для МО РФ.
          </p>
          <a
            className="about-me__git text-hover"
            href="https://github.com/Savelii777/"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
