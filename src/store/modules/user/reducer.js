const INITIAL_STATE = {
  data: {
    status: '',
  },
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

    case '@user/CREATEUSER_FIREBASE_REQUEST': {
      state = {
        ...state,
        loading: true,
      };

      return state;
    }

    case '@user/CREATEUSER_FIREBASE_SUCCESS': {
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

    case '@user/UPDATEUSER_FIREBASE_REQUEST': {
      state = {
        ...state,
        loading: true,
      };

      return state;
    }

    case '@user/UPDATEUSER_FIREBASE_SUCCESS': {
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
