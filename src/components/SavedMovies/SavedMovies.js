import React from 'react';
import './SavedMovies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({ isLoggedIn, onOpenMenu, savedMovies, moviesList, handleGetSavedMovies, handleRemoveMovie }) {
  React.useEffect(() => {
    handleGetSavedMovies();
  }, []);



  return (
    <div className="saved-movies">
      <Header
        isLoggedIn={isLoggedIn}
        onOpenMenu={onOpenMenu}
      />
      <SearchForm/>
      <MoviesCardList
        isSavedMoviesList={true}
        savedMovies={savedMovies}
        handleRemoveMovie={handleRemoveMovie}
        moviesList={moviesList.slice().reverse()}
      />
      {/*<Menu*/}
      {/*  isOpen={isOpen}*/}
      {/*  onClose={onClose}*/}
      {/*/>*/}
      <Footer/>
    </div>
  )
}