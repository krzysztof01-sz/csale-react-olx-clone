import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Header from '../../shared/header/Header';
import NoticeCardPresenter from './NoticeCardPresenter';

const NoticePage = props => {
  window.scrollTo(0, 0);

  const brightStarColor = '#f1ad3e';
  const dimStarColor = '#cdcdcd';
  const maxProductCondition = 5;

  const renderNoticeCondition = noticeCondition => {
    const renderOrder = [];

    for (let i = 1; i <= maxProductCondition; i++) {
      i <= noticeCondition ? renderOrder.push(brightStarColor) : renderOrder.push(dimStarColor);
    }
    return renderOrder;
  };

  const noticeId = useParams().id;
  const { products } = props;

  if (products !== undefined) {
    const [product] = products.filter(prod => prod.id === noticeId);
    const productCondition = renderNoticeCondition(product.productCondition);
    return (
      <>
        <Header />
        <NoticeCardPresenter productCondition={productCondition} notice={product} />
      </>
    );
  } else {
    return <div>There is no notices</div>;
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
