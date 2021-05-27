import React from 'react';
import './Portfolio.css';
import avatar from '../../images/place-holder-avatar.jpg'

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Студент</h2>
        <article className="about">
          <div>
            <h3 className="about__name">Артем</h3>
            <p className="about__profession">Фронтенд-разработчик, 22 года</p>
            <p className="about__bio">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
              С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс
              по веб&#8209;разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="about__links-list">
              <li className="about__links-element">
                <a className="about__link"
                   href="https://t.me/Zy0ma"
                   rel="noreferrer"
                   target="_blank">Telegram</a>
              </li>
              <li className="about__links-element">
                <a className="about__link"
                   href="https://github.com/Zyoma689"
                   rel="noreferrer"
                   target="_blank">Github
                </a>
              </li>
            </ul>
          </div>
          <img className="about__photo" src={avatar} alt="Артем Иванов"/>
        </article>
        <h3 className="portfolio__subtitle">Портфолио</h3>
        <ul className="portfolio__links-list">
          <li className="portfolio__links-element">
            <a
              className="portfolio__link"
              href="https://zyoma689.github.io/how-to-learn"
              rel="noreferrer"
              target="_blank">Статичный сайт
              <div className="portfolio__arrow">↗</div>
            </a>
          </li>
          <li className="portfolio__links-element">
            <a
              className="portfolio__link"
              href="https://zyoma689.github.io/russian-travel/index.html"
              rel="noreferrer"
              target="_blank">Адаптивный сайт
              <div className="portfolio__arrow">↗</div>
            </a>
          </li>
          <li className="portfolio__links-element">
            <a
              className="portfolio__link"
              href="https://ivart.students.nomoredomains.icu/"
              rel="noreferrer"
              target="_blank">Одностраничное приложение
              <div className="portfolio__arrow">↗</div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}