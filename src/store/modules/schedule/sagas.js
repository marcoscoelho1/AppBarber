import { takeLatest, all, select, put } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import { addScheduleFirebaseScuccess } from './actions';
import { showFeedback } from '../feedback/actions';

const scheduleFirebase = firestore().collection('schedules');

export function* addScheduleFirebase() {
  try {
    const schedule = yield select(state => state.schedule);

    const response = yield scheduleFirebase.add(schedule.data);

    if (response) {
      yield put(
        showFeedback({
          message: 'Agendamento feito com sucesso!',
          type: 'success',
          visible: true,
        })
      );
      yield put(addScheduleFirebaseScuccess({ status: 'add_success' }));
    }
  } catch (error) {
    yield put(
      showFeedback({
        message: 'Ops! Aconteceu algum problema no agendamento',
        type: 'error',
        visible: true,
      })
    );
  }
}

export default all([
  takeLatest('@schedule/ADD_SCHEDULE_REQUEST', addScheduleFirebase),
]);
