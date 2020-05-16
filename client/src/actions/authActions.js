import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
} from "./types";

//check token and load user

export const loadUser = () => (dispatch, getState) => {
  //user loading

  dispatch({ type: USER_LOADING });
};
