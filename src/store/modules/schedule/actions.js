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
