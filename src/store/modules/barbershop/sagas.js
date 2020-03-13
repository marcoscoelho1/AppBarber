import { takeLatest, all, select, put } from 'redux-saga/effects';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import { updateBarbershop } from './actions';
import { loginFirebase } from '../auth/actions';
import { showFeedback } from '../feedback/actions';

const barbershopFirebase = firestore().collection('barbershops');

export function* createBarbershopFirebase({ payload }) {
  try {
    const { data } = payload;
    const user = yield select(state => state.user);
    const barbershop = yield select(state => state.barbershop);

    const axiosString = `https://maps.googleapis.com/maps/api/geocode/json?address=${barbershop.data.barbershopUserBarber.address.street},+${barbershop.data.barbershopUserBarber.address.number},+${barbershop.data.barbershopUserBarber.address.city},+${barbershop.data.barbershopUserBarber.address.regionCode}&key=AIzaSyDpBylObA8bCaCZYoRIn2z7XwfqU1pwHPk`;

    const coordinatesData = yield axios.get(axiosString);
    const coordinates = coordinatesData.data.results[0].geometry.location;

    console.tron.log('coordenadas', coordinates);

    const newBarbershop = {
      ...data,
      uid: user.data.uid,
      coordinates: { ...coordinates },
      starsTotal: 5,
      starsMedia: 5,
      avaliationsNumber: 1,
      comments: [],
    };

    const response = yield barbershopFirebase.add(newBarbershop);
    console.tron.log('responseFirebase', response);

    if (response) {
      yield put(updateBarbershop({ ...newBarbershop }));
      yield put(loginFirebase(user.data.uid, user.data.email, true));
      yield put(
        showFeedback({
          message: 'Cadastrado com sucesso!',
          type: 'success',
          visible: true,
        })
      );
    }
  } catch (error) {
    yield put(
      showFeedback({
        message: 'Ops! Aconteceu algum problema ao criar a barbearia',
        type: 'error',
        visible: true,
      })
    );
  }
}

export function* updateBarbershopFirebase({ payload }) {
  try {
    const { data } = payload;
    const doc = barbershopFirebase.doc(data.documentId);
    const resp = yield doc.update(data);
    yield console.tron.log('updateBarbershopFirebase', resp);
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
        message: 'Ops! Aconteceu algum ao atualizar barbearia',
        type: 'error',
        visible: true,
      })
    );
  }
}

export default all([
  takeLatest(
    '@barbershop/CREATEBARBERSHOP_FIREBASE_REQUEST',
    createBarbershopFirebase
  ),
  takeLatest(
    '@barbershop/UPDATE_BARBERSHOP_FIREBASE',
    updateBarbershopFirebase
  ),
]);
