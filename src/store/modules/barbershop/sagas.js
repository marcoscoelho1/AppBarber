/*
import { takeLatest, put, all } from 'redux-saga/effects';

export function* registerFirebase({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const { user } = response;

    yield put(registerFirebaseSuccess(user.email, user.uid));
  } catch (error) {
    console.tron.log(error);
    yield put(registerFirebaseFailure());
  }
}

export default all([
  takeLatest('@auth/REGISTER_FIREBASE_REQUEST', registerFirebase),
]); */
