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
import * as MainApi from "../../utils/MainApi"
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [ isMenuOpen, setIsMenuOpen ] = React.useState(false);
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ errorMessage, setErrorMessage ] = React.useState('');
  const history = useHistory();

  function handleRegister({ email, password, name }) {
    setIsLoading(true);
    MainApi.register({ email, password, name })
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
    MainApi.login({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleMenuButtonClick() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false)
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
          {/*<Route path="/movies">*/}
          {/*  <Movies*/}
          {/*    onOpenMenu={handleMenuButtonClick}*/}
          {/*    isOpen={isMenuOpen}*/}
          {/*    onClose={closeMenu}*/}
          {/*  />*/}
          {/*</Route>*/}
          {/*<Route path="/saved-movies">*/}
          {/*  <SavedMovies*/}
          {/*    onOpenMenu={handleMenuButtonClick}*/}
          {/*    isOpen={isMenuOpen}*/}
          {/*    onClose={closeMenu}*/}
          {/*  />*/}
          {/*</Route>*/}
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            onOpenMenu={handleMenuButtonClick}
            isOpen={isMenuOpen}
            onClose={closeMenu}
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
            onOpenMenu={handleMenuButtonClick}
            isOpen={isMenuOpen}
            onClose={closeMenu}
          />
          {/*<Route path="/profile">*/}
          {/*  <Profile*/}
          {/*    onOpenMenu={handleMenuButtonClick}*/}
          {/*    isOpen={isMenuOpen}*/}
          {/*    onClose={closeMenu}*/}
          {/*  />*/}
          {/*</Route>*/}
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

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
