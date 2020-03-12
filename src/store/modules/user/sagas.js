import { takeLatest, all, select, put } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import { updateUser } from './actions';
import { loginFirebaseSuccess } from '../auth/actions';
import { showFeedback } from '../feedback/actions';

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

export function* updateUserFirebase({ payload }) {
  try {
    const { data } = payload;
    const user = yield select(state => state.user);

    const userToBeUpated = { ...user.data, ...data };

    const doc = userFirebase.doc(userToBeUpated.documentId);
    yield doc.update(userToBeUpated);
    yield put(updateUser({ ...userToBeUpated }));
    yield put(
      showFeedback({
        message: 'Atualizado com sucesso!',
        type: 'success',
        visible: true,
      })
    );
  } catch (error) {
    yield put(
      showFeedback({
        message: 'Ops! Aconteceu algum ao atualizar usuário',
        type: 'error',
        visible: true,
      })
    );
  }
}

export default all([
  takeLatest('@user/CREATEUSER_FIREBASE_REQUEST', createUserFirebase),
  takeLatest('@user/UPDATEUSER_FIREBASE_REQUEST', createUserFirebase),
]);
