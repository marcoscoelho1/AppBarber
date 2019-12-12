/*
export function signInRequest(email, password) {
  return { type: '@auth/SIGN_IN_REQUEST', payload: { email, password } };
}

export function signInSuccess(token, user) {
  return { type: '@auth/SING_IN_SUCCESS', payload: { token, user } };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
} */

export function updateUser(data) {
  return {
    type: '@user/UPDATE_USER',
    payload: { data },
  };
}

export function createUserFirebase(data) {
  return {
    type: '@user/CREATEUSER_FIREBASE_REQUEST',
    payload: { data },
  };
}
