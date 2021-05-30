import React from 'react';
import './Movies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies({ isLoggedIn, handleMenuButtonClick, isOpen, onClose }) {
  return (
    <div className="movies">
      <Header
        isLoggedIn={isLoggedIn}
        onOpenMenu={handleMenuButtonClick}
      />

      <SearchForm/>

      <MoviesCardList isSavedMoviesList={false}/>

      <div className="movies__more movies__more_enable">
        <button className="movies__more-button">Ещё</button>
      </div>

      <Menu
        isOpen={isOpen}
        onClose={onClose}
      />

      <Footer/>
    </div>
  )
}