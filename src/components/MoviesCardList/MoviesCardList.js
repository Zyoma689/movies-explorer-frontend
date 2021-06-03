import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
    isSavedMoviesList,
    savedMovies,
    moviesList,
    handleSaveMovie ,
    handleRemoveMovie,
  }) {
  return (
    <section className="cards">
      {
        moviesList.length ? (
          <ul className="cards__list">
            {
              moviesList.map((movie) => (
                <MoviesCard
                  key={movie.movieId}
                  isSavedMoviesList={isSavedMoviesList}
                  savedMovies={savedMovies}
                  moviesList={moviesList}
                  movie={movie}
                  handleSaveMovie={handleSaveMovie}
                  handleRemoveMovie={handleRemoveMovie}
                />
              ))
            }
          </ul>
        ) : (
          <p className="cards__empty cards__empty_enabled">Здесь будут фильмы</p>
        )
      }
    </section>
  )
}