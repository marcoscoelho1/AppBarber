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

    case '@schedule/ADD_SCHEDULE_REQUEST': {
      state = {
        ...state,
        loading: true,
      };

      return state;
    }

    case '@schedule/ADD_SCHEDULE_SUCCESS': {
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
