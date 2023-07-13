import "./AboutProject.scss";
import MainDescription from "../MainDescription/MainDescription";
function AboutProject() {

  return (
    <section id="about-proj" className="about-project">
      <MainDescription title={'О проекте'} />
      <ul className="about-project__container">
      <li className="about-project__container-element">
        <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </li>
      <li className="about-project__container-element">
        <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </li>
      </ul>
      <div className="about-project__time">
        <div className="about-project__time-back">
          <p className="about-project__time-title about-project__time-title_back">1&nbsp;неделя</p>
          <p className="about-project__time-description">Back-end</p>
        </div>
        <div className="about-project__time-front">
          <p className="about-project__time-title about-project__time-title_front">4&nbsp;недели</p>
          <p className="about-project__time-description">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;