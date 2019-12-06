const INITIAL_STATE = {
  data: {},
  loading: false,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@user/UPDATE_USER': {
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
