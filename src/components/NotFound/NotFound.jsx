import { Link } from "react-router-dom";
import "./NotFound.scss";
import { AppRoute } from "../../constants";

function NotFound() {

  return (
    <main className="not-found">
    <section>
      <h1 className="not-found__title">404</h1>
      <p className="not-found__decription">Страница не найдена</p>
      <Link to={AppRoute.Main}>
        <button className="not-found__button button-hover" type="button" aria-label="вернуться назад">Назад</button>
      </Link>
    </section>
    </main>
  );
}

export default NotFound;