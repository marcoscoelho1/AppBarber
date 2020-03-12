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

export function selectBarbershopScheduling(data) {
  return {
    type: '@barbershop/SELECT_BARBERSHOP_REQUEST',
    payload: { data },
  };
}

export function updateBarbershopFirebase(data) {
  return {
    type: '@barbershop/UPDATE_BARBERSHOP_FIREBASE',
    payload: { data },
  };
}
