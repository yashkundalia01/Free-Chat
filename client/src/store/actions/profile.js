import axios from "axios";
import { setAlert } from "./index";
import setAuthToken from "../../utils/setAuthToken";
import {
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILES_LOADED,
} from "./actionTypes";
import { logout } from "./auth";

// Update User's Profile
export const updateProfile =
  ({ status, location, bio, url }) =>
  async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const imageUrl = url;
    const body = JSON.stringify({ status, location, bio, imageUrl });

    try {
      const res = await axios.post("/api/profile", body, config);

      dispatch({
        type: PROFILE_UPDATE_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert("Profile updated successfully.", "success"));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
      // dispatch({
      //   type: PROFILE_UPDATE_FAIL,
      // });
    }
  };

//Get all Profiles

export const getProfiles = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "x-auth-token": localStorage.token,
    },
  };
  const res = await axios.get("/api/profile", config);
  const profiles = res.data;
  dispatch({ type: PROFILES_LOADED, payload: profiles });
};

//Delete account
export const deleteAccount = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  await axios.delete("/api/profile");
  dispatch(setAlert("Account deleted successfully", "success"));
  dispatch(logout());
};
