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

export function updateBarbershop(data) {
  return {
    type: '@user/UPDATE_BARBERSHOP',
    payload: { data },
  };
}