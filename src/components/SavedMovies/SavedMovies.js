import React from 'react';
import './SavedMovies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({ isLoggedIn, onOpenMenu }) {
  return (
    <div className="saved-movies">
      <Header
        isLoggedIn={isLoggedIn}
        onOpenMenu={onOpenMenu}
      />
      <SearchForm/>
      <MoviesCardList isSavedMoviesList={true}/>
      {/*<Menu*/}
      {/*  isOpen={isOpen}*/}
      {/*  onClose={onClose}*/}
      {/*/>*/}
      <Footer/>
    </div>
  )
}