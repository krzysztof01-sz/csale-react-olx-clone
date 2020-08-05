import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../../../shared/NoticeThumbnailButton.scss';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const RemoveNoticeButton = ({ notice, sharedId }) => {
  const [error, setError] = useState('');
  const deleteNotice = async () => {
    if (window.confirm('The notice will be deleted. Are you sure?')) {
      await firebase.firestore().collection('notices').doc(notice.id).delete();
      await firebase
        .storage()
        .ref(`notices/${sharedId}`)
        .delete()
        .then(() => console.log('notice deleted!'))
        .catch(err => {
          setError(err.message);
        });
    } else return false;
  };

  return (
    <>
      <button onClick={deleteNotice} className="userNoticeThumbnail__button-gray">
        Delete <FontAwesomeIcon icon={faTrashAlt} color="#cdcdcd" />
      </button>
      <div className="form__mainErrorHandler">{error}</div>
    </>
  );
};

export default RemoveNoticeButton;
