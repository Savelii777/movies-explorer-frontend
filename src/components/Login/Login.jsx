import {AppRoute} from "../../utils/constants";
import LoginAndRegister from "../LoginAndRegister/LoginAndRegister";
import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";
import ValidationForm from "../../hooks/ValidationForm";
import "../Register/Register.scss";

function Login({login}) {
  const {handleChange, errors, formValue} = ValidationForm();

  function handelSubmit(e) {
    e.preventDefault();
    login(formValue.password, formValue.email)
      .then((response) => {
        if (response.status === 200) {
          formValue.password = "";
          formValue.email = "";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const buttonDisables = !(errors.email === "" && errors.password === "");
  const buttonClassName = `login__button form__button ${
    buttonDisables ? "form__button_disabled" : "button-hover"
  }`;
  
  return (
    <main>
      <LoginAndRegister
        title={"Рады видеть!"}
        link={AppRoute.Register}
        paragraph={"Ещё не зарегистрированы?"}
        span={" Регистрация"}
      >
        <LoginAndRegisterForm
          buttonText={"Войти"}
          onSubmit={handelSubmit}
          className={buttonClassName}
          disabled={buttonDisables}
        >
          <div className="form__container">
            <p className="form__title">E-mail</p>
            <input
              id="email"
              className={
                !errors.email
                  ? "form__input"
                  : "form__input form__input_type_error"
              }
              name="email"
              type="email"
              value={formValue.email || ""}
              onChange={handleChange}
              minLength="2"
              required
            />
            <span className="form__text-error">{errors.email}</span>
          </div>
          <div className="form__container">
            <p className="form__title">Пароль</p>
            <input
              id="password"
              name="password"
              type="password"
              value={formValue.password || ""}
              className={
                !errors.password
                  ? "form__input"
                  : "form__input form__input_type_error"
              }
              onChange={handleChange}
              minLength="2"
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
