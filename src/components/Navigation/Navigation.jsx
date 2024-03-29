import "./Navigation.scss"
import NavTab from "../NavTab/NavTab";
import burger from "../../images/burger-button.svg"

function Navigation({onOpenBurgerPopup}) {
  return (
    <>
    <NavTab />
    <button className="header__burger" type="button" onClick={onOpenBurgerPopup}>
      <img className="header__img" src={burger} alt="бургер"/>
    </button>
    </>
  );
}

export default Navigation;