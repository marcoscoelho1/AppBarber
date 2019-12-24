import { takeLatest, all, select, put } from 'redux-saga/effects';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import { updateBarbershop, getBarbershopsAroundSuccess } from './actions';

const barbershopFirebase = firestore().collection('barbershops');

export function* createBarbershopFirebase({ payload }) {
  const { data } = payload;
  const user = yield select(state => state.user);
  const barbershop = yield select(state => state.barbershop);

  const axiosString = `https://maps.googleapis.com/maps/api/geocode/json?address=${barbershop.data.address.street},+${barbershop.data.address.number},+${barbershop.data.address.city},+${barbershop.data.address.regionCode}&key=AIzaSyDpBylObA8bCaCZYoRIn2z7XwfqU1pwHPk`;

  const coordinatesData = yield axios.get(axiosString);
  const coordinates = coordinatesData.data.results[0].geometry.location;

  console.tron.log('coordenadas', coordinates);

  const newBarbershop = {
    ...barbershop.data,
    ...data,
    uid: user.data.uid,
    coordinates: { ...coordinates },
  };

  const response = yield barbershopFirebase.add(newBarbershop);
  console.tron.log('responseFirebase', response);

  if (response) {
    yield put(updateBarbershop({ ...newBarbershop }));
  }
}

// -47.2954373;
// -23.1947698;

export function* getBarbershopsAround({ payload }) {
  const { lng } = payload;
  // const nearByBarbershops = [];
  yield barbershopFirebase
    .where('coordinates.lng', '<=', lng + 0.5)
    .where('coordinates.lng', '>=', lng - 0.5)
    .limit(50)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.tron.log('querySnapshot1', doc.data());
        console.tron.log('fdp');
      });
    });
  yield put(getBarbershopsAroundSuccess({ barberShop: 'teste' }));
}

export default all([
  takeLatest(
    '@barbershop/CREATEBARBERSHOP_FIREBASE_REQUEST',
    createBarbershopFirebase
  ),
  takeLatest(
    '@barbershop/GET_BARBERSHOPS_AROUND_REQUEST',
    getBarbershopsAround
  ),
]);
