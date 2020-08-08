import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../../../shared/NoticeThumbnailButton.scss';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const RemoveNoticeButton = ({ sharedId }) => {
  const [error, setError] = useState('');
  const deleteNotice = async () => {
    if (window.confirm('The notice will be deleted. Are you sure?')) {
      await firebase.firestore().collection('notices').doc(sharedId).delete();
      await firebase
        .storage()
        .ref(`notices/${sharedId}`)
        .delete()
        .catch(err => setError(err.message));
    } else return false;
  };

  return (
    <>
      <div className="form__mainErrorHandler">{error}</div>
      <button onClick={deleteNotice} className="userNoticeThumbnail__button-gray">
        Delete <FontAwesomeIcon icon={faTrashAlt} color="#cdcdcd" />
      </button>
    </>
  );
};

export default RemoveNoticeButton;
