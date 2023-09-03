import registerSuccess from "../../images/register-success.svg";
import registerError from "../../images/register-error.svg";
import "./InfoTooltip.scss";

function InfoTooltip({onClose, isOpen, registerResponse}) {
  return (
    <section className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-icon"
          aria-label="закрыть"
          type="button"
          onClick={onClose}
        />
        <img
          src={registerResponse.status ? registerSuccess : registerError}
          className="popup__image"
          alt="регистрация прошла успешно"
        ></img>
        <h2 className="popup__title">{registerResponse.text}</h2>
      </div>
    </section>
  );
}
export default InfoTooltip;
