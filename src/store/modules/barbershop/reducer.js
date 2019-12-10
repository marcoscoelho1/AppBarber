const INITIAL_STATE = {
  data: {},
  loading: false,
};

export default function barbershop(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@user/UPDATE_BARBERSHOP': {
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

    default:
      return state;
  }
}
