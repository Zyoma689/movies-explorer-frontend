import React from 'react';
import './Movies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies(props) {
  return (
    <div className="movies">
      <div>
        <Header
          onOpenMenu={props.onOpenMenu}
        />
        <SearchForm/>
        <MoviesCardList isSavedMoviesList={false}/>
        <Menu
          isOpen={props.isOpen}
          onClose={props.onClose}
        />
      </div>
      <Footer/>
    </div>
  )
}