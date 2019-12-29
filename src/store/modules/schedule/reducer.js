const INITIAL_STATE = {
  data: {
    services: [],
    barbershopId: '',
    clientId: '',
  },
  loading: false,
};

export default function schedule(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@schedule/UPDATE_REQUEST': {
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
