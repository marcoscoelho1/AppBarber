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
    type: '@barbershop/UPDATE_BARBERSHOP',
    payload: { data },
  };
}

export function createBarbershopFirebase(data) {
  return {
    type: '@barbershop/CREATEBARBERSHOP_FIREBASE_REQUEST',
    payload: { data },
  };
}

export function getBarbershopsAround(lat, lng) {
  return {
    type: '@barbershop/GET_BARBERSHOPS_AROUND_REQUEST',
    payload: { lat, lng },
  };
}

export function getBarbershopsAroundSuccess(data) {
  return {
    type: '@barbershop/GET_BARBERSHOPS_AROUND_SUCCESS',
    payload: { data },
  };
}
