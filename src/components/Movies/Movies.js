import React from 'react';
import './Movies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies({
    isLoggedIn,
    onOpenMenu,
    savedMovies,
    moviesList,
    handleSaveMovie ,
    handleRemoveMovie,
}) {
  return (
    <div className="movies">
      <Header
        isLoggedIn={isLoggedIn}
        onOpenMenu={onOpenMenu}
      />

      <SearchForm/>

      <MoviesCardList
        isSavedMoviesList={false}
        savedMovies={savedMovies}
        moviesList={moviesList}
        handleSaveMovie={handleSaveMovie}
        handleRemoveMovie={handleRemoveMovie}
      />

      <div className="movies__more movies__more_enable">
        <button className="movies__more-button">Ещё</button>
      </div>

      <Footer/>
    </div>
  )
}