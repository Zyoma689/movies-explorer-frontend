import React from 'react';
import './Movies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies({ isLoggedIn, onOpenMenu, moviesList }) {
  return (
    <div className="movies">
      <Header
        isLoggedIn={isLoggedIn}
        onOpenMenu={onOpenMenu}
      />

      <SearchForm/>

      <MoviesCardList
        isSavedMoviesList={false}
        moviesList={moviesList}
      />

      <div className="movies__more movies__more_enable">
        <button className="movies__more-button">Ещё</button>
      </div>

      <Footer/>
    </div>
  )
}