import React from "react";
import headerLogo from '../images/header-logo.svg';
import { Route, Link, Switch } from "react-router-dom";

function Header({email, onSignOut}) {
    return (
        <header className="header">
            <img src={headerLogo} alt="логотип Место" className="header__logo" />

            <Switch>
                <Route path='/sign-in'>
                <Link to='/sign-up' className='header__link'>
                    Регистрация
                </Link>
                </Route>

                <Route path='/sign-up'>
                <Link to='/sign-in' className='header__link'>
                    Войти
                </Link>
                </Route>

                <Route exact path='/'>
                <nav className='header__menu'>
                    <p className='header__email'>{email}</p>
                    <button className='header__signout-button' onClick={onSignOut} type="button" aria-label="Выйти">Выйти</button>
                </nav>
                </Route>
            </Switch>

        </header>
    );
}

export default Header;