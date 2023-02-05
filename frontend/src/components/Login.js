import React, { useRef } from "react";
import { Redirect } from "react-router-dom";

function Login({onLogin, loggedIn, isLoading}) {

  const emailRef = useRef();
  const passwordRef = useRef();


  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(emailRef.current.value, passwordRef.current.value);

  }

  if(loggedIn) {
    return <Redirect to="/"/>
  }

  return(
    <main className="login">
      <form name="login" className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Вход</h2>
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
        <button className="form__submit-button" type="submit">{isLoading ? 'Загрузка...' : 'Войти'}</button>
      </form>
    </main>
  );
}

export default Login;