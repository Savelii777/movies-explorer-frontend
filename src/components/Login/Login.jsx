import { AppRoute } from "../../constants";
import LoginAndRegister from "../LoginAndRegister/LoginAndRegister";
import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";
import ValidationForm from "../../hooks/ValidationForm";
import "../../components/LoginAndRegisterForm/LoginAndRegisterForm.scss";
import "../Register/Register.scss";

function Login({ login }) {
  const { handleChange, errors, formValue } = ValidationForm();

  function handleSubmit() {
    login();
    formValue.password = "";
    formValue.email = "";
  }

  const buttonDisabled = !(errors.email === "" && errors.password === "");
  const buttonClassName = `form__button-login form__button ${buttonDisabled ? "form__button_disabled" : "button-hover"}`;

  return (
    <main>
      <LoginAndRegister
        title={"Рады видеть!"}
        link={AppRoute.Register}
        paragraph={"Ещё не зарегистрированы?"}
        span={"Регистрация"}
      >
        <LoginAndRegisterForm
          buttonText={"Войти"}
          onSubmit={handleSubmit}
          className={buttonClassName}
          disabled={buttonDisabled}
        >
          <div className="form__container">
            <label className="form__title" htmlFor="email">E-mail</label>
            <input
              id="email"
              className={!errors.email ? "form__input" : "form__input form__input_type_error"}
              name="email"
              type="email"
              value={formValue.email || ""}
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              placeholder="введите ваш email"
              required
            />
            <span className="form__text-error">{errors.email}</span>
          </div>
          <div className="form__container">
            <label className="form__title" htmlFor="password">Пароль</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formValue.password || ""}
              className={!errors.password ? "form__input" : "form__input form__input_type_error"}
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              placeholder="введите ваш пароль"
              required
            />
            <span className="form__text-error">{errors.password}</span>
          </div>
        </LoginAndRegisterForm>
      </LoginAndRegister>
    </main>
  );
}

export default Login;