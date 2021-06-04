import React from 'react';
import './Movies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies(
  {
    isLoggedIn,
    onOpenMenu,
    allMovies,
    savedMovies,
    handleSaveMovie,
    handleRemoveMovie,
    onSearch,
    onFilter,
    isLoading,
  }) {

  const [ searchInput, setSearchInput ] = React.useState([]);
  const [ checkboxActivated, setCheckboxActivated ] = React.useState(false);
  const [ foundMovies, setFoundMovies ] = React.useState([]);
  const [ filteredMovies, setFilteredMovies ] = React.useState([]);

  React.useEffect(() => {
    searchHandler();
    filterHandler();
  }, [checkboxActivated, searchInput]);

  function searchHandler() {
     setFoundMovies(onSearch(allMovies, searchInput));
  }

  function filterHandler() {
    setFilteredMovies(onFilter(foundMovies));
  }


  return (
    <div className="movies">
      <Header
        isLoggedIn={isLoggedIn}
        onOpenMenu={onOpenMenu}
      />

      <SearchForm
        isLoading={isLoading}
        setSearchInput={setSearchInput}
        setCheckboxActivated={setCheckboxActivated}
      />

      <MoviesCardList
        isSavedMoviesList={false}
        savedMovies={savedMovies}
        moviesList={checkboxActivated ? filteredMovies : foundMovies}
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