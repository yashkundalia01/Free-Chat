import axios from "axios";
import { setAlert } from "./index";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./actionTypes";

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });

    if (name.includes(" "))
      try {
        const res = await axios.post("/api/users", body, config);

        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        dispatch(loadUser());
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
        dispatch({
          type: REGISTER_FAIL,
        });
      }
    else dispatch(setAlert("Please Enter Firstname and Lastname", "danger"));
  };

// Get Current User
export const loadUser = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };
    const res = await axios.get("api/auth", config);
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    console.log("ERROR   " + err);
    dispatch({ type: AUTH_ERROR });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    // returning token
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};