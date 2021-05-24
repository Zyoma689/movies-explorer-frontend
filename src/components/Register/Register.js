import React from 'react';
import { Link } from "react-router-dom";
import './Register.css';
import logo from '../../images/logo.svg';

export default function Register() {
  return (
    <div className="register">
      <div className="register__container">
        <Link className="register__logo-link" exact to="/">
          <img className="register__logo" src={logo} alt=""/>
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" action="">
          <label className="register__label">
            <span className="register__input-title">Имя</span>
            <input className="register__input" type="text" required/>
            <span className="register__input-error">Что-то пошло не так...</span>
          </label>
          <label className="register__label">
            <span className="register__input-title">E-mail</span>
            <input className="register__input" type="email" required/>
            <span className="register__input-error">Что-то пошло не так...</span>
          </label>
          <label className="register__label">
            <span className="register__input-title">Пароль</span>
            <input className="register__input register__input_type_error" type="password" required/>
            <span className="register__input-error register__input-error_visible register__input-error_last-of-type">Что-то пошло не так...</span>
          </label>
          <button className="register__button">Зарегистрироваться</button>
          <p className="register__question">Уже зарегистрированы?
            <Link className="register__link" to="/signin">Войти</Link>
          </p>
        </form>
      </div>
    </div>
  );
};