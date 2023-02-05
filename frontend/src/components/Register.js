import { useRef } from "react";
import { Link, Redirect } from "react-router-dom";


function Register({onRegister, registrationSuccessful, isLoading}) {

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(evt) {
  evt.preventDefault();
  onRegister(emailRef.current.value, passwordRef.current.value);
  }

  if(registrationSuccessful) {
    return <Redirect to="/sign-in"/>
  }

  return(
    <main className="register">
      <form name="register" className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Регистрация</h2>
        <input 
          name="email"
          className="form__input"
          placeholder="Email"
          type="email"
          required
          ref={emailRef}  
        />
        <input
          name="password"
          className="form__input"
          placeholder="Пароль"
          type="password"
          required
          ref={passwordRef}
        />
        <button className="form__submit-button" type="submit">{isLoading ? 'Загрузка...' : 'Зарегистрироваться'}</button>
      </form>
      <p className="register__text">Уже зарегистрированы? 
      <Link to="./sign-in" className="register__link">Войти</Link> 
      </p>
    </main>
  );
}

export default Register;
