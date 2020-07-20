import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Header from '../../../src/shared/header/Header';
import NoticeCard from '../noticeCard/NoticeCard';
import './NoticePage.scss';

const NoticePage = props => {
  const noticeId = useParams().id;
  const { products } = props;

  if (products !== undefined) {
    const [product] = products.filter(prod => prod.id === noticeId);
    return (
      <section className="noticePage__wrapper">
        <Header />
        <NoticeCard notice={product} />
      </section>
    );
  }
};

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.notices,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(() => ['notices'])
)(NoticePage);
