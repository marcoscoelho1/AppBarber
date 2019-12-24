const INITIAL_STATE = {
  data: {
    nearbyBarbershopsList: [],
  },
  loading: false,
};

export default function barbershop(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@barbershop/UPDATE_BARBERSHOP': {
      const { data } = action.payload;
      state = {
        ...state,
        data: {
          ...state.data,
          ...data,
        },
        loading: false,
      };

      return state;
    }

    case '@barbershop/CREATEBARBERSHOP_FIREBASE_REQUEST': {
      state = {
        ...state,
        loading: true,
      };

      return state;
    }

    case '@barbershop/GET_BARBERSHOPS_AROUND_REQUEST': {
      state = {
        ...state,
        loading: true,
      };

      return state;
    }

    case '@barbershop/GET_BARBERSHOPS_AROUND_SUCCESS': {
      const { data } = action.payload;

      console.tron.log('daaaaaaata', data);

      state = {
        ...state,
        data: {
          ...state.data,
          nearbyBarbershopsList: [
            ...state.data.nearbyBarbershopsList,
            data.barberShop,
          ],
        },
        loading: false,
      };

      return state;
    }

    default:
      return state;
  }
}
