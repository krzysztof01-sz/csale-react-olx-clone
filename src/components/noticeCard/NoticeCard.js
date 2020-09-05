import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import NoticeCardPresenter from './NoticeCardPresenter';
import { renderNoticeCondition } from '../../utils/utilsFunctions';
import LackOfNoticesMessage from '../../shared/LackOfNoticesMessage';
import firebase from 'firebase/app';
import 'firebase/firestore';

const getUser = async userId => {
  return await firebase
    .firestore()
    .doc(`users/${userId}`)
    .get()
    .then(data => data.data());
};

const NoticeCard = ({ products }) => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => window.scrollTo(0, 0), []);

  if (products !== undefined) {
    const [product] = products.filter(prod => prod.id === id);
    if (Object.keys(user).length === 0) {
      getUser(product.createdBy).then(data => setUser(data));
    }
    const productCondition = renderNoticeCondition(product.productCondition);
    return <NoticeCardPresenter productCondition={productCondition} notice={product} userInfo={user} />;
  } else return <LackOfNoticesMessage text="There is no notices." />;
};

const mapStateToProps = state => ({
  products: state.firestore.ordered.notices,
});

export default connect(mapStateToProps)(NoticeCard);
