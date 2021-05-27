import React from 'react';
import { Link, NavLink } from "react-router-dom";

import './Navigation.css';
import icon from "../../images/profile_icon.svg";

export default function Navigation(props) {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__element">
          <ul className="movies-navigation">
            <li className="movies-navigation__element movies-navigation__element_place_menu">
              <Link
                className="movies-navigation__link"
                onClick={props.onClose}
                to="/">Главная
              </Link>
            </li>
            <li className="movies-navigation__element">
              <NavLink
                className="movies-navigation__link"
                activeClassName="movies-navigation__link_active"
                onClick={props.onClose}
                to="/movies">Фильмы
              </NavLink>
            </li>
            <li className="movies-navigation__element">
              <NavLink
                className="movies-navigation__link"
                activeClassName="movies-navigation__link_active"
                onClick={props.onClose}
                to="/saved-movies">Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="navigation__element">
          <NavLink
            className="navigation__profile-button"
            activeClassName="navigation__profile-button_active"
            onClick={props.onClose}
            to="/profile">
            <img className="navigation__profile-icon" src={icon} alt="Аккаунт"/>Аккаунт
          </NavLink>
          {/*<ProfileButton/>*/}
          {/*<Link to="/profile">*/}
          {/*  <img src={icon} alt="Аккаунт"/>Аккаунт*/}
          {/*</Link>*/}
        </li>
      </ul>
    </nav>

    // <ul className="movies-navigation">
    //   <li className="movies-navigation__element">
    //     <Link
    //       className="movies-navigation__link"
    //       to="/movies">Фильмы
    //     </Link>
    //   </li>
    //   <li className="movies-navigation__element">
    //     <Link
    //       className="movies-navigation__link"
    //       to="/saved-movies">Сохранённые фильмы
    //     </Link>
    //   </li>
    // </ul>
    // <nav className="navigation">
    //   <ul className="navigation__list">
    //     <li className="navigation__element">
    //
    //     </li>
    //     <li className="navigation__element">
    //       <Link to="/profile">
    //         <img src={icon} alt="Аккаунт"/>Аккаунт
    //       </Link>
    //     </li>
    //   </ul>
    // </nav>
    //
    // <nav className="navigation">
    //   <ul className="navigation__list">
    //     <li className="navigation__element">
    //
    //     </li>
    //     <li className="navigation__element">
    //       <Link to="/profile">
    //         <img src={icon} alt="Аккаунт"/>Аккаунт
    //       </Link>
    //     </li>
    //   </ul>
    // </nav>
  )
};
