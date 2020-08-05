import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { v1 } from 'uuid';

const WithSubmitHandler = WrappedComponent => {
  return class WithSubmitHandler extends React.Component {
    state = {
      error: null,
      addingStatus: false,
    };
    addNotice = async data => {
      this.setState(() => {
        return {
          addingStatus: true,
        };
      });
      const sharedId = v1();
      const storageRef = firebase.storage().ref(`notices/${sharedId}`);
      await firebase
        .storage()
        .ref(`notices/${sharedId}`)
        .put(data.productPhoto)
        .catch(err =>
          this.setState(() => {
            return { error: err.message };
          })
        );

      const photoURL = await storageRef.getDownloadURL();
      return await firebase
        .firestore()
        .collection('notices')
        .add({
          ...data,
          sharedId,
          productPhoto: photoURL,
          createdBy: firebase.auth().currentUser.uid,
        });
    };
    render() {
      return <WrappedComponent addNotice={this.addNotice} {...this.state} />;
    }
  };
};

export default WithSubmitHandler;
