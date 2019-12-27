import { takeLatest, all, select, put } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import { updateUser } from './actions';
import { loginFirebaseSuccess } from '../auth/actions';

const userFirebase = firestore().collection('users');

export function* createUserFirebase({ payload }) {
  const { data } = payload;
  const user = yield select(state => state.user);

  const newUser = { ...user.data, ...data };

  const response = yield userFirebase.add(newUser);
  console.tron.log('responseFirebase', response);

  if (response) {
    yield put(updateUser({ ...newUser }));

    console.log('novoUsuário', newUser);

    if (newUser.type !== 'barber') {
      yield put(loginFirebaseSuccess(newUser.uid, newUser.email, true));
    }
  }
}

export default all([
  takeLatest('@user/CREATEUSER_FIREBASE_REQUEST', createUserFirebase),
]);
