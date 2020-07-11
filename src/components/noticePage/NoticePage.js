import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const NoticePage = props => {
  const noticeId = useParams().id;
  const { products } = props;

  if (products !== undefined) {
    const [product] = products.filter(prod => prod.id === noticeId);
    return (
      <>
        <div>Siema {noticeId}</div>
        <div>Product: {product.name}</div>
      </>
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
