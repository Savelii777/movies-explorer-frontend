import "./MoviesEmpty.scss";

function MoviesEmpty({text, className, onClick}) {
  return (
    <>
      <h3 className="movies-empty">{text}</h3>
    </>
  );
}

export default MoviesEmpty;
