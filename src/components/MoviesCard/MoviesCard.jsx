import "./MoviesCard.scss";

function MoviesCard({ film, props }) {
  const { nameRu, trailerLink, duration, image } = film;
  const {className, alt, saveClick } = props;

  const hours = Math.trunc(duration / 60);
  const minutes = Math.trunc(duration - hours * 60);

  return (
    <li className="movies-card">
        <div className="movies-card__container">
          <div>
          <div className="movies-card__info">
            <h2 className="movies-card__title">{nameRu}</h2>
            <p className="movies-card__time">{minutes} минут</p>
          </div>
          <a className="movies-card__trailer-link" href={trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__image" alt={nameRu} src={image}/>
      </a>
          <button type="button" className={className} alt={alt} onClick={saveClick}/>
          </div>
      </div>  
    </li>
  );
}

export default MoviesCard;