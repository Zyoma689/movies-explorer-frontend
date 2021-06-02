import React from 'react';
import './App.css';
import Header from "../Header/Header";
import { Route, Switch, useHistory } from "react-router-dom";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Menu from "../Menu/Menu";
import {
  BEATFILM_SOURCE_URL,
  UNKNOWN_STRING,
  UNKNOWN_NUMBER,
  UNKNOWN_IMAGE_URL,
  UNKNOWN_TRAILER_URL,
  UNAUTHORIZED,
} from '../../utils/constants';

function App() {
  const [ isMenuOpen, setIsMenuOpen ] = React.useState(false);
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ errorMessage, setErrorMessage ] = React.useState('');
  const [ globalErrorMessage, setGlobalErrorMessage ] = React.useState('');
  const [ successMessage, setSuccessMessage ] = React.useState(false);

  const [ allMovies, setAllMovies ] = React.useState([]);
  const [ savedMovies, setSavedMovies ] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    handleGetUser();
    checkLocalStorage();
  }, []);

  React.useEffect(() => {
    localStorage.setItem('localSavedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);

  function checkLocalStorage() {
    checkLocalMovies();
    checkLocalSavedMovies();
  }
  
  function checkLocalMovies() {
    const localAllMovies = localStorage.getItem('localAllMovies');
    if (localAllMovies) {
      setAllMovies(JSON.parse(localAllMovies));
    } else {
      handleGetAllMovies();
    }
  }

  function checkLocalSavedMovies() {
    const localSavedMovies = localStorage.getItem('localSavedMovies');
    if (localSavedMovies) {
      setSavedMovies(JSON.parse(localSavedMovies));
    } else {
      handleGetSavedMovies();
    }
  }

  function handleRegister({ email, password, name }) {
    setIsLoading(true);
    mainApi.register({ email, password, name })
      .then((res) => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    mainApi.login({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        history.push('/movies');
        handleGetUser();
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }
  
  function handleLogout() {
    setIsLoading(true);
    mainApi.logout()
      .then((res) => {
        setIsLoggedIn(false);
        history.push('/');
      })
      .catch((err) => {
        handleErrors(err);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi.updateUser({ name, email })
      .then((res) => {
        setCurrentUser({ name, email });
        setSuccessMessage(true);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        handleErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleGetUser() {
    mainApi.getUser()
      .then((res) => {
        const {name, email} = res;
        setCurrentUser({ name, email });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        handleErrors(err);
      })
  }

  function handleGetAllMovies() {
    moviesApi.getAllMovies()
      .then((data) => {
        const movies = data.map((item) => {
          const imageUrl = item.image && item.image.url;
          const thumbnailUrl = item.image && item.image.formats.thumbnail.url;

          return {
            country : item.country || UNKNOWN_STRING,
            director : item.director || UNKNOWN_STRING,
            duration : item.duration || UNKNOWN_NUMBER,
            year : item.year || UNKNOWN_STRING,
            description : item.description || UNKNOWN_STRING,
            image: imageUrl ? BEATFILM_SOURCE_URL + imageUrl : UNKNOWN_IMAGE_URL,
            trailer: item.trailerLink ? item.trailerLink : UNKNOWN_TRAILER_URL,
            thumbnail: thumbnailUrl ? BEATFILM_SOURCE_URL + thumbnailUrl : UNKNOWN_IMAGE_URL,
            movieId: item.id || UNKNOWN_NUMBER,
            nameRU : item.nameRU || UNKNOWN_STRING,
            nameEN : item.nameEN || UNKNOWN_STRING,
          }
        });
        localStorage.setItem('localAllMovies', JSON.stringify(movies));
      })
      .catch((err) => {
        setGlobalErrorMessage(err);
      })
  }

  function handleGetSavedMovies() {
    mainApi.getSavedMovies()
      .then((movies) => {
        localStorage.setItem('localSavedMovies', JSON.stringify(movies));
        setSavedMovies(movies);
      })
      .catch((err) => {
        setGlobalErrorMessage(err);
      })
  }

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies])
      })
      .catch((err) => {
        setGlobalErrorMessage(err);
      })
  }

  function handleRemoveMovie({ _id }) {
    mainApi.removeMovie(_id)
      .then(() => {
        const newSavedMovies = savedMovies.filter((movie) => movie._id !== _id);
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        setGlobalErrorMessage(err);
      })
  }



  function handleErrors(err) {
    if (err.status === UNAUTHORIZED) {
      setIsLoggedIn(false);
    }
  }

  function handleMenuButtonClick() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeMenu();
    }
  }

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('menu')) {
      closeMenu();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mouseup', handleOverlayClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mouseup', handleOverlayClose);
    }
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <div className="page__header-container">
              <Header
                isLoggedIn={isLoggedIn}
                onOpenMenu={handleMenuButtonClick}
              />
            </div>
            <Main/>
            <Footer/>
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            onOpenMenu={handleMenuButtonClick}
            isOpen={isMenuOpen}
            onClose={closeMenu}
            moviesList={allMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            onOpenMenu={handleMenuButtonClick}
            isOpen={isMenuOpen}
            onClose={closeMenu}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            onOpenMenu={handleMenuButtonClick}
            isOpen={isMenuOpen}
            onClose={closeMenu}
            onUpdate={handleUpdateUser}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
          <Route path="/signup">
            <Register
              isLoading={isLoading}
              onRegister={handleRegister}
              errorMessage={errorMessage}
            />
          </Route>
          <Route path="/signin">
            <Login
              isLoading={isLoading}
              onLogin={handleLogin}
              errorMessage={errorMessage}
            />
          </Route>
          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
        <div className={`page__preloader ${isLoading && 'page__preloader_enabled'}`}>
          <Preloader/>
        </div>
        <Menu
          isOpen={isMenuOpen}
          onClose={closeMenu}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
