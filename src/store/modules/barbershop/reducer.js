const INITIAL_STATE = {
  data: {},
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

    default:
      return state;
  }
}
