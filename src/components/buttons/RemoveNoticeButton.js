import React, { useState } from 'react';
import { TrashIcon } from '../icons/icons';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const RemoveNoticeButton = ({ id }) => {
  const [error, setError] = useState('');
  const deleteNotice = async () => {
    if (window.confirm('The notice will be deleted. Are you sure?')) {
      await firebase.firestore().collection('notices').doc(id).delete();
      await firebase
        .storage()
        .ref(`notices/${id}`)
        .delete()
        .catch(err => setError(err.message));
    } else return false;
  };

  return (
    <>
      <div className="form__mainErrorHandler">{error}</div>
      <button onClick={deleteNotice} className="userNoticeThumbnail__button-gray">
        Delete <TrashIcon />
      </button>
    </>
  );
};

export default RemoveNoticeButton;
