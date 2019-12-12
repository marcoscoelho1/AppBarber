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
import { updateBarbershop } from './actions';

const barbershopFirebase = firestore().collection('barbershops');

export function* createBarbershopFirebase({ payload }) {
  const { data } = payload;
  const user = yield select(state => state.user);
  const barbershop = yield select(state => state.barbershop);

  const newBarbershop = { ...barbershop.data, ...data, uid: user.data.uid };

  const response = yield barbershopFirebase.add(newBarbershop);
  console.tron.log('responseFirebase', response);

  if (response) {
    yield put(updateBarbershop({ ...newBarbershop }));
  }
}

export default all([
  takeLatest(
    '@barbershop/CREATEBARBERSHOP_FIREBASE_REQUEST',
    createBarbershopFirebase
  ),
]);
