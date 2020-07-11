import React from 'react';
import '../Dashboard.scss';
import './Notice.scss';
import { Link } from 'react-router-dom';

const Notice = ({ notice }) => {
  return (
    <Link key={notice.id} className="notice__link" to={`notice/${notice.id}`}>
      <article className="notice">
        <img alt="notice" className="notice__photo" src="https://unsplash.it/200/200" />
        <h2 className="notice__name">{notice.name} </h2>
        <p className="notice__description">{notice.description}</p>
        <span className="notice__price">{notice.price} $</span>
      </article>
    </Link>
  );
};

export default Notice;
