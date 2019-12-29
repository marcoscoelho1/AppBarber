/*
export function registerFirebase(email, password) {
  return {
    type: '@auth/REGISTER_FIREBASE_REQUEST',
    payload: { email, password },
  };
} */

export function updateSchedule(data) {
  return {
    type: '@schedule/UPDATE_REQUEST',
    payload: { data },
  };
}

export function addScheduleFirebase() {
  return {
    type: '@schedule/ADD_SCHEDULE_REQUEST',
  };
}

export function addScheduleFirebaseScuccess(data) {
  return {
    type: '@schedule/ADD_SCHEDULE_SUCCESS',
    payload: { data },
  };
}
