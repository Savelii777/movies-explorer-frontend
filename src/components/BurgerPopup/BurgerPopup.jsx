import { useState, useEffect } from "react";
import NavTab from "../NavTab/NavTab";
import "./BurgerPopup.scss";
import esc from "../../images/esc.svg";
function BurgerPopup({ isOpen, onClose }) {
  const stylePopup = isOpen
    ? "burger-popup burger-popup_active"
    : "burger-popup";
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpen]);
  return (
    <section className={stylePopup}>
      <div className="burger-popup__container">
        <button type="button" className="burger-popup__button" onClick={onClose}>
          <img src={esc} alt="кнопка закрытия меню" />
        </button>
        <NavTab isOpen={isOpen} onClose={onClose} />
      </div>
    </section>
  );
}
export default BurgerPopup;
