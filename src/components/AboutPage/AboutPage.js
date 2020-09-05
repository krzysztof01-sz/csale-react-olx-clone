import React from 'react';

const AboutPage = () => {
  return (
    <article className="about__wrapper">
      <h1 className="about__header">About Csale</h1>
      <section className="about__paragraph">
        Welcome to Csale - online shopping platform as a my little project. First of all, this is not an e-commerce
        website. I created it because I love making web applications :). Here you can add a notice if you want to sell
        or to buy something. On top of that, you are able to manage your notices by deleting or updating them. Is there
        any announcement that you are interested in? - that's fine, you can communicate with an owner but be alert - I
        didn't add an authentication yet, so when a user is signing up, they don't need to enter them own e-mail.
        Otherwise, have fun when using and testing it. The problems are able to occur, but I bent over backwards to
        reduce them. My little request - don't public an offensive photos as a visualisation of your thing you want to
        sell. One way or another they will be deleted by me. <br />
        See you soon{' '}
        <span role="img" aria-label="waving emoji">
          👋
        </span>
      </section>

      <h2 className="about__list-label">In the next updates:</h2>
      <section className="about__section">
        <ul className="about__list">
          <li className="about__list-item">Dark mode</li>
          <li className="about__list-item">User's profile picture</li>
          <li className="about__list-item">Products buying</li>
          <li className="about__list-item">Bids making</li>
          <li className="about__list-item">Dynamic products filtering</li>
          <li className="about__list-item">Chatting with an owner</li>
        </ul>
      </section>

      <h2 className="about__list-label">The technology stack I used:</h2>
      <section className="about__section">
        <ul className="about__list">
          <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">
            <li className="about__list-item">React - A JavaScript library for building user interfaces.</li>
          </a>
          <a href="https://redux.js.org/" rel="noopener noreferrer" target="_blank">
            <li className="about__list-item">Redux - A Predictable State Container for JS Apps.</li>
          </a>
          <a href="https://firebase.google.com/" rel="noopener noreferrer" target="_blank">
            <li className="about__list-item">
              Firebase - A comprehensive app development platform. I used it as a hosting and database
            </li>
          </a>
          <a href="https://formik.org/" rel="noopener noreferrer" target="_blank">
            <li className="about__list-item">Formik - Build forms in React, without the tears</li>
          </a>
          <a href="https://github.com/jquense/yup" rel="noopener noreferrer" target="_blank">
            <li className="about__list-item">Yup - A JavaScript schema builder for value parsing and validation</li>
          </a>
          <a href="https://sass-lang.com/" rel="noopener noreferrer" target="_blank">
            <li className="about__list-item">
              Sass - the most mature, stable, and powerful professional grade CSS extension language in the world.{' '}
            </li>
          </a>
        </ul>

        <h2 className="about__list-label">Besides:</h2>
        <section className="about__section">
          <ul className="about__list">
            <li className="about__list-item">Create React App - setup</li>
            <li className="about__list-item">ESLint and Prettier - code hygiene</li>
            <li className="about__list-item">Gulp - task runner</li>
            <li className="about__list-item">Moment - formatting dates</li>
            <li className="about__list-item">React image (package from NPM)</li>
            <li className="about__list-item">Browser image compression (package from NPM)</li>
            <li className="about__list-item">React loader spinner (package from NPM)</li>
            <br />
            If you are interested in code, let's check out my github profile{' '}
            <a
              className="about__githubLink"
              href="https://github.com/krzysztof01-sz/csale-react-olx-clone"
              rel="noopener noreferrer"
              target="_blank">
              here.
            </a>
          </ul>
        </section>
      </section>
    </article>
  );
};

export default AboutPage;
