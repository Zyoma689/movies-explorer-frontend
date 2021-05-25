import React from 'react';
import './Movies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";

export default function Movies(props) {
  return (
    <>
      <Header
        onOpenMenu={props.onOpenMenu}
      />
      <MoviesCardList isSavedMoviesList={false}/>
      <Menu
        isOpen={props.isOpen}
        onClose={props.onClose}
      />
      <Footer/>
    </>
  )
}