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
import Menu from "../Menu/Menu";

function App() {
  const [ isMenuOpen, setIsMenuOpen ] = React.useState(false);
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ errorMessage, setErrorMessage ] = React.useState('');
  const [ successMessage, setSuccessMessage ] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    handleGetUser();
  }, []);

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
    MainApi.logout()
      .then((res) => {
        setIsLoggedIn(false);
        history.push('/');
      })
      .catch((err) => {
        handleUnauthorized(err);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    MainApi.updateUser({ name, email })
      .then((res) => {
        setCurrentUser({ name, email });
        setSuccessMessage(true);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        handleUnauthorized(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleGetUser() {
    MainApi.getUser()
      .then((res) => {
        const {name, email} = res;
        setCurrentUser({ name, email });
        setIsLoggedIn(true);
        console.log(currentUser.name)
      })
      .catch((err) => {
        handleUnauthorized(err);
        console.log(err.message);
      })
  }

  function handleUnauthorized(err) {
    if (err.message === 'Необходима авторизация') {
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
