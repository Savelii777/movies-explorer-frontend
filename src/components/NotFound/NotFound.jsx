import { Link } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
  const goBack = () => {
    window.history.go(-4);
  };

  return (
    <main className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__decription">Страница не найдена</p>
      <button
        className="not-found__button button-hover"
        type="button"
        aria-label="вернуться назад"
        onClick={goBack}
      >
        Назад
      </button>
    </main>
  );
}

export default NotFound;
