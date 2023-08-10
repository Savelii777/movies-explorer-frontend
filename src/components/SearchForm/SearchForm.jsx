
import "./SearchForm.scss";

function SearchForm() {

  const isActive = true;

  const switcherClassName = `search-form__checkbox-switcher ${isActive && 'search-form__checkbox-switcher_active'}`
  const buttonClassName = `search-form__checkbox-button ${isActive && 'search-form__checkbox-button_active'}`


  return (
    <section className="search-form">
      <form>
        <div className="search-form__input-container">
        <div className="search-form__icon"></div>
          <input className="search-form__input" placeholder="Фильм" type="text" required></input>
          <button className="search-form__button button-hover" type="submit" aria-label="Кнопка найти">Найти</button>
        </div>
      </form>
      <div className="search-form__checkbox">
        <div className={switcherClassName}>
          <button className={buttonClassName} type="button" aria-label="поиск по короткометражкам"></button>
        </div>
        <p className="search-form__checkbox-name">Короткометражки</p>
    </div>
    </section>
  );
}

export default SearchForm;