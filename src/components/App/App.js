import React from 'react';
import './App.css';
import Header from "../Header/Header";
import { Route, Switch } from "react-router-dom";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
    <div className="page">
      <Switch>
        <Route exact path="/">
          <div className="page__header-container">
            <Header/>
          </div>
          <Main/>
          <Footer/>
        </Route>
        <Route path={["/movies", "/saved-movies", "/profile"]}>
          <Header
            onOpenMenu={handleMenuButtonClick}
          />
          <Menu
            isOpen={isMenuOpen}
            onClose={closeMenu}
          />
          <Footer/>
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
