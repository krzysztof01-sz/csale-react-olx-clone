import React, { memo } from 'react';
import image from './splashScreenBg.svg';
import { Link } from 'react-router-dom';
import { BasketIcon } from '../icons/icons';

const SplashScreen = () => {
  return (
    <div className="splashScreen__wrapper">
      <main className="splashScreen">
        <h1 className="splashScreen__header">
          Csale <BasketIcon />
        </h1>
        <div className="splashScreen__imageWrapper">
          <img className="splashScreen__image" src={image} alt="background color" />
          <h2 className="splashScreen__slogan">
            Fast and modern online shopping platform. Buy and sell your stuff now!
          </h2>
        </div>
        <div className="buttons">
          <Link to="/signup">
            <button className="splashScreen__button button-signup">Sign up</button>
          </Link>

          <Link to="/login">
            <button className="splashScreen__button button-login">Login</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default memo(SplashScreen);
