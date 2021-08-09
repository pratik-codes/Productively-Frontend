import { Dispatch } from "redux";
import Axios from "axios";

import { baseURL } from "./userActions";
import {
  USER_CREATE_REMAINDER_FAIL,
  USER_CREATE_REMAINDER_REQUEST,
  USER_CREATE_REMAINDER_SUCCESS,
  USER_REMAINDER_DELETE_FAIL,
  USER_REMAINDER_DELETE_REQUEST,
  USER_REMAINDER_DELETE_SUCCESS,
  USER_REMAINDER_DETAILS_EDIT_FAIL,
  USER_REMAINDER_DETAILS_EDIT_REQUEST,
  USER_REMAINDER_DETAILS_EDIT_SUCCESS,
  USER_REMAINDER_FAIL,
  USER_REMAINDER_REQUEST,
  USER_REMAINDER_SUCCESS,
} from "../Constants/remainder.constants";

export const getRemainders = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_REMAINDER_REQUEST,
    });
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // hitting REMAINDER api
    const { data } = await Axios.get(`${baseURL}remainder`, config);
    // only make success if the response is success
    if (data.statusCode === 200) {
      dispatch({
        type: USER_REMAINDER_SUCCESS,
        payload: data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_REMAINDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addRemainder =
  (title: string, description: string, date?: Date) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_CREATE_REMAINDER_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const Body = {
        remainderName: title,
        remainderDescription: description,
        date: date,
      };
      // hitting REMAINDER api
      const { data } = await Axios.post(`${baseURL}remainder`, Body, config);
      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_CREATE_REMAINDER_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_CREATE_REMAINDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editRemainderDetails =
  (
    remainderId: string,
    title: string,
    description: string,
    date: Date | undefined
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_REMAINDER_DETAILS_EDIT_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const Body = {
        remainderId: remainderId,
        updateRemainderDto: {
          remainderName: title,
          remainderDescription: description,
          date: date,
        },
      };
      console.log(Body);
      // hitting REMAINDER api
      const { data } = await Axios.patch(`${baseURL}remainder`, Body, config);
      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_REMAINDER_DETAILS_EDIT_SUCCESS,
          payload: true,
        });
        // setting the accesstoken to the local storage
        localStorage.setItem("accessToken", data.data.accessToken);
      }
    } catch (error) {
      dispatch({
        type: USER_REMAINDER_DETAILS_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteRemainder =
  (remainderId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_REMAINDER_DELETE_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // hitting REMAINDER api
      const { data } = await Axios.delete(
        `${baseURL}remainder/${remainderId}`,
        config
      );
      // only make success if the response is success
      if (data.statusCode === 200) {
        dispatch({
          type: USER_REMAINDER_DELETE_SUCCESS,
          payload: true,
        });
        // setting the accesstoken to the local storage
        localStorage.setItem("accessToken", data.data.accessToken);
      }
    } catch (error) {
      dispatch({
        type: USER_REMAINDER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
