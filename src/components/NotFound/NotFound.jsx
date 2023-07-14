import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
  const navigate = useNavigate();

  const navigateToRoot = () => {
    navigate("/");
  };

  return (
    <main className="not-found">
      <section>
        <h1 className="not-found__title">404</h1>
        <p className="not-found__decription">Страница не найдена</p>
        <button
          className="not-found__button button-hover"
          type="button"
          aria-label="вернуться назад"
          onClick={navigateToRoot}
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;