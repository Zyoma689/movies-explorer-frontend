import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props) {
  return (
    <section className="cards">
      <p className="cards__empty">Список пуст</p>
      <ul className="cards__list">
        {
          props.moviesList.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              isSaved={false}
              isSavedMoviesList={props.isSavedMoviesList}
              movie={movie}
            />
          ))
        }
      </ul>
    </section>
  )
}