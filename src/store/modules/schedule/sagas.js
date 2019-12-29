/* import { takeLatest, put, all } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {
  registerFirebaseSuccess,
  registerFirebaseFailure,
  loginFirebaseSuccess,
} from './actions';
import { updateUser } from '../user/actions';

export function* registerFirebase({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const { user } = response;

    // yield put(registerFirebaseSuccess(user.email, user.uid, false));
    yield put(updateUser({ email: user.email, uid: user.uid }));
  } catch (error) {
    console.tron.log(error);
    yield put(registerFirebaseFailure());
  }
}

export function* loginFirebase({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield auth().signInWithEmailAndPassword(email, password);
    const { user } = response;
    yield put(loginFirebaseSuccess(user.email, user.uid, true));
  } catch (error) {
    console.tron.log(error);
  }
}

export default all([
  takeLatest('@auth/REGISTER_FIREBASE_REQUEST', registerFirebase),
  takeLatest('@auth/LOGIN_FIREBASE_REQUEST', loginFirebase),
]); */
