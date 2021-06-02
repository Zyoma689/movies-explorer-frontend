import React from 'react';
import './MoviesCard.css';
// import image from '../../images/pic__COLOR_pic.jpg'
import { durationConverter } from '../../utils/durationConverter';

export default function MoviesCard({ isSavedMoviesList, isSaved, movie }) {
  const { image, nameRU, duration, trailer } = movie;


  const cardButtonClassName = (`card__button ${isSavedMoviesList ? 'card__button_type_remove' : isSaved ? 'card__button_saved' : 'card__button_type_save' }`);

  return (
    <li className="card">
      <figure className="card__container">
        <a className="card__link"
           href={trailer}
           rel="noreferrer"
           target="_blank">
          <img className="card__image" src={image} alt={nameRU}/>
        </a>
        <figcaption className="card__caption">
          <p className="card__name">{nameRU}</p>
          <p className="card__duration">{durationConverter(duration)}</p>
        </figcaption>
        <button className={cardButtonClassName}>Сохранить</button>
      </figure>
    </li>
  )
}