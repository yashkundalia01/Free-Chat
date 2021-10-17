import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  loading: true,
  isAuthenticated: null,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    }
    case LOGOUT:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REGISTER_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    }
    case USER_LOADED: {
      const name = action.payload.name;
      const arr = name.split(" ");
      localStorage.setItem("name", arr[0] + "_" + arr[1]);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
