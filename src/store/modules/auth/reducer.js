const INITIAL_STATE = {
  data: {
    uid: '',
    email: '',
  },
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/REGISTER_FIREBASE_REQUEST': {
      state = {
        ...state,
        loading: true,
      };

      return state;
    }

    case '@auth/REGISTER_FIREBASE_SUCCESS': {
      const { email, uid } = action.payload;
      state = {
        ...state,
        data: {
          email,
          uid,
        },
        loading: false,
      };

      return state;
    }

    default:
      return state;
  }
}
