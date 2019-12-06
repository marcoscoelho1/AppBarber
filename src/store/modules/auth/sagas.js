import { takeLatest, put, all } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import { registerFirebaseSuccess, registerFirebaseFailure } from './actions';
import { updateUser } from '../user/actions';

/*
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;
  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { token, user } = response.data;
  yield put(signInSuccess(token, user));
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]); */

export function* registerFirebase({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const { user } = response;

    yield put(registerFirebaseSuccess(user.email, user.uid));
    yield put(updateUser({ email: user.email, uid: user.uid }));
  } catch (error) {
    console.tron.log(error);
    yield put(registerFirebaseFailure());
  }
}

export default all([
  takeLatest('@auth/REGISTER_FIREBASE_REQUEST', registerFirebase),
]);
