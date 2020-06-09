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

export const firebaseSignUp = async (email, password) => {
  try {
    const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(data);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserIdToken = async () => {
  try {
    const token = await firebase.auth().currentUser.getIdToken();
    // console.log(token);
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const checkPassword = async (oldPassword, newPassword) => {
  try {
  // cобираем креденшлы из мыла залогиненого юзера и введеного пароля
    const credentials = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      oldPassword,
    );
    // перелогиниваемся
    await firebase.auth().currentUser.reauthenticateWithCredential(credentials);
    // тут можно впилить новЫЙ пароль
    // console.log(newPassword);
    const data = await firebase.auth().currentUser.updatePassword(newPassword);
    return data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
