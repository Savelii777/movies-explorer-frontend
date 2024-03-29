import {AppRoute} from "../../utils/constants";
import LoginAndRegister from "../LoginAndRegister/LoginAndRegister";
import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";
import "./Register.scss";
import ValidationForm from "../../hooks/ValidationForm";

function Register({register}) {
  const {handleChange, errors, formValue} = ValidationForm();
  const buttonDisables = !(
    errors.email === "" &&
    errors.password === "" &&
    errors.name === ""
  );
  const buttonClassName = buttonDisables
    ? "form__button form__button-register form__button_disabled"
    : "form__button form__button-register button-hover";
    
    
  
  function handelSubmit(e) {
    e.preventDefault();
    register(formValue.password, formValue.email, formValue.name)
    .then((response) => {
      if (response.status === 200) {
        formValue.password = "";
        formValue.email = "";
        formValue.name = "";
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <main>
      <LoginAndRegister
        title={"Добро пожаловать!"}
        link={AppRoute.Login}
        paragraph={"Уже зарегистрировались?"}
        span={" Войти"}
      >
        <LoginAndRegisterForm
          buttonText={"Зарегистрироваться"}
          className={buttonClassName}
          disabled={buttonDisables}
          onSubmit={handelSubmit}
        >
          <div className="form__container">
            <p className="form__title">Имя</p>
            <input
              id="name"
              className={
                !errors.name
                  ? "form__input"
                  : "form__input form__input_type_error"
              }
              name="name"
              type="text"
              value={formValue.name || ""}
              onChange={handleChange}
              minLength="2"
              required
            />
            <span className="form__text-error">{errors.name}</span>
          </div>
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
              autoComplete="off"
              minLength="2"
              required
            />
<span className="form__text-error">
    {errors.email}
</span>
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

export default Register;
