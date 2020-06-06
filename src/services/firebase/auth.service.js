import firebase from '@/plugins/firebase';

export const firebaseLogin = async (email, password) => {
  try {
    const data = await firebase.auth().signInWithEmailAndPassword(email, password);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const firebaseLogout = async () => {
  try {
    const data = await firebase.auth().signOut();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const firebaseReset = async (email) => {
  try {
    const data = await firebase.auth().sendPasswordResetEmail(email);
    // console.log(data);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
