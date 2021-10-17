import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../store/actions/index";
import axios from "axios";
import "./ChangePassword.css";
import { START_UPDATING, STOP_UPDATING } from "../../store/actions/actionTypes";
import Spinner from "../UI/Spinner/Spinner";

const ChangePassword = (props) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  if (!localStorage.token) {
    return <Redirect to="/login" />;
  }

  const onChangeHandler = (event) => {
    setFormData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    props.startLoading();
    if (formData.newPassword === formData.confirmNewPassword) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token,
        },
      };
      const oldPassword = formData.oldPassword;
      const newPassword = formData.newPassword;
      const body = JSON.stringify({ oldPassword, newPassword });
      try {
        const res = await axios.post("/api/changepassword", body, config);
        props.setAlert(res.data.msg, "success");
        props.history.replace("/profile");
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((err) => props.setAlert(err.msg, "danger"));
        }
      }
    } else {
      props.setAlert("Passwords do not match", "danger");
    }
    props.stopLoading();
  };
  return (
    <div>
      {props.loading && <div className="loading"><Spinner/> </div>}
      <h1 className="large text-primary">Change Password</h1>
      <form className="form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <input
            required
            type="password"
            placeholder="Old password"
            name="oldPassword"
            onChange={onChangeHandler}
          />
        </div>

        <div className="form-group">
          <input
            required
            type="password"
            placeholder="New password"
            name="newPassword"
            onChange={onChangeHandler}
          />
        </div>

        <div className="form-group">
          <input
            required
            type="password"
            placeholder="Confirm New password"
            name="confirmNewPassword"
            onChange={onChangeHandler}
          />
        </div>

        <button className="btn btn-primary my-1" type="submit">
          Submit
        </button>
        <Link to="/profile" className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.changePassword.updating,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, alertType) => dispatch(action.setAlert(msg, alertType)),
    startLoading: () => dispatch({ type: START_UPDATING }),
    stopLoading: () => dispatch({ type: STOP_UPDATING }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
