import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import NoticeCardPresenter from './NoticeCardPresenter';
import { renderNoticeCondition } from '../../utils/utilsFunctions';
import LackOfNoticesMessage from '../../shared/LackOfNoticesMessage';

const NoticeCard = ({ products }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const { id } = useParams();

  if (products !== undefined) {
    const [product] = products.filter(prod => prod.id === id);
    const productCondition = renderNoticeCondition(product.productCondition);
    return <NoticeCardPresenter productCondition={productCondition} notice={product} />;
  } else return <LackOfNoticesMessage text="There is no notices." />;
};

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.notices,
  };
};

export default connect(mapStateToProps)(NoticeCard);
