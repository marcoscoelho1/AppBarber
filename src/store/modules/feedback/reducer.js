const INITIAL_STATE = {
  data: {
    visible: false,
    message: '',
    type: '',
  },
  loading: false,
};

export default function feedback(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@feedback/SHOW_FEEDBACK': {
      const { data } = action.payload;
      state = {
        ...state,
        data: {
          ...state.data,
          visible: true,
          ...data,
        },
        loading: false,
      };

      return state;
    }

    case '@feedback/HIDE_FEEDBACK': {
      state = {
        ...INITIAL_STATE,
      };

      return state;
    }

    default:
      return state;
  }
}
