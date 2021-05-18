import React from 'react';
import './Promo.css'
import illustration from "../../images/web-pic.svg";

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__text-container">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a className="promo__button" href="#dd">Узнать больше</a>
        </div>
        <img className="promo__main-illustration" src={illustration} alt=""/>
      </div>
    </section>
  )
}