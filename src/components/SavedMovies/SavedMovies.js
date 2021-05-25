import React from 'react';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";

export default function SavedMovies(props) {
  return (
    <>
      <Header
        onOpenMenu={props.onOpenMenu}
      />
      <MoviesCardList isSavedMoviesList={true}/>
      <Menu
        isOpen={props.isOpen}
        onClose={props.onClose}
      />
      <Footer/>
    </>
  )
}