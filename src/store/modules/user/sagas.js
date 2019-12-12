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
import { takeLatest, all, select, put } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import { updateUser } from './actions';

const userFirebase = firestore().collection('users');

export function* createUserFirebase({ payload }) {
  const { data } = payload;
  const user = yield select(state => state.user);

  const newUser = { ...user.data, ...data };

  const response = yield userFirebase.add(newUser);
  console.tron.log('responseFirebase', response);

  if (response) {
    yield put(updateUser({ ...newUser }));
  }
}

export default all([
  takeLatest('@user/CREATEUSER_FIREBASE_REQUEST', createUserFirebase),
]);
