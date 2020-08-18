import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { v1 } from 'uuid';
import { getDateInSeconds } from '../../../utils/utilsFunctions';

const WithExtraFunctions = WrappedComponent => {
  return class WithSubmitHandler extends React.Component {
    state = {
      error: null,
      addingStatus: false,
      updatingStatus: false,
    };

    addNotice = async data => {
      if (typeof data.productPhoto === 'string') return false;

      this.setState(() => ({ addingStatus: true }));

      const sharedId = v1();
      const storageRef = firebase.storage().ref(`notices/${sharedId}`);
      const firestoreRef = firebase.firestore().collection('notices').doc(sharedId);

      await storageRef.put(data.productPhoto).catch(err => this.setState(() => ({ error: err.message })));

      const photoURL = await storageRef.getDownloadURL();
      const creationDate = getDateInSeconds();

      return await firestoreRef
        .set({
          ...data,
          creationDate,
          sharedId,
          productPhoto: photoURL,
          createdBy: firebase.auth().currentUser.uid,
        })
        .then(this.setState(() => ({ addingStatus: false })));
    };

    updateNoticeWithoutPhoto = async (data, noticeToUpdateSharedId) => {
      this.setState(() => ({ updatingStatus: true }));
      const firestoreRef = firebase.firestore().collection('notices').doc(noticeToUpdateSharedId);
      await firestoreRef
        .update({
          productName: data.productName,
          productDescription: data.productDescription,
          productCondition: data.productCondition,
          productPrice: data.productPrice,
        })
        .then(() => this.setState(() => ({ updatingStatus: false })));
    };

    updateNoticeWithPhoto = async (data, noticeToUpdateSharedId) => {
      this.setState(() => ({ updatingStatus: true }));
      const storageRef = firebase.storage().ref(`notices/${noticeToUpdateSharedId}`);
      const firestoreRef = firebase.firestore().collection('notices').doc(noticeToUpdateSharedId);

      await storageRef.delete().catch(err => this.setState(() => ({ error: err.message })));
      await storageRef.put(data.productPhoto).catch(err => this.setState(() => ({ error: err.message })));

      const photoURL = await storageRef.getDownloadURL();

      return await firestoreRef
        .update({
          productName: data.productName,
          productDescription: data.productDescription,
          productCondition: data.productCondition,
          productPrice: data.productPrice,
          productPhoto: photoURL,
        })
        .then(() => this.setState(() => ({ updatingStatus: false })));
    };

    functions = {
      addNotice: this.addNotice,
      updateNoticeWithoutPhoto: this.updateNoticeWithoutPhoto,
      updateNoticeWithPhoto: this.updateNoticeWithPhoto,
    };

    render() {
      return <WrappedComponent functions={this.functions} {...this.state} />;
    }
  };
};

export default WithExtraFunctions;
