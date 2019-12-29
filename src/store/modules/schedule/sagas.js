import { takeLatest, all, select, put } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import { addScheduleFirebaseScuccess } from './actions';

const scheduleFirebase = firestore().collection('schedules');

export function* addScheduleFirebase() {
  const schedule = yield select(state => state.schedule);

  const response = yield scheduleFirebase.add(schedule.data);
  console.tron.log('responseFirebaseScheduling', response);

  if (response) {
    yield put(addScheduleFirebaseScuccess({ status: 'add_success' }));
  }
}

export default all([
  takeLatest('@schedule/ADD_SCHEDULE_REQUEST', addScheduleFirebase),
]);
