import { Dispatch } from "redux";
import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_HOMEPAGE_VIEW_REQUEST,
  USER_HOMEPAGE_VIEW_SUCCESS,
  USER_HOMEPAGE_VIEW_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_VALIDATE_OTP_REQUEST,
  USER_VALIDATE_OTP_SUCCESS,
  USER_VALIDATE_OTP_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
} from "../Constants/user.constants";

export const baseURL = "https://productively-by-pratik.herokuapp.com/";
// export const baseURL = "http://localhost:3000/";

export const LoginAction =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // hitting login api
      const { data } = await axios.post(
        `${baseURL}users/signin`,
        { email, password },
        config
      );
      console.log(data);

      // only make success if the response is success
      if (data.statusCode === 200) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data.data.userData,
        });
        // setting the accesstoken to the local storage
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("userData", JSON.stringify(data.data.userData));

        return true;
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      return error.response.data.message;
    }
  };

export const RegisterAction =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // hitting login api
      const { data } = await axios.post(
        `${baseURL}users/signup`,
        { email, name, password },
        config
      );
      // only make success if the response is success
      if (data) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userHomePageViewAction =
  (viewName: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_HOMEPAGE_VIEW_REQUEST,
      });

      dispatch({
        type: USER_HOMEPAGE_VIEW_SUCCESS,
        payload: viewName,
      });
    } catch (error) {
      dispatch({
        type: USER_HOMEPAGE_VIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const submitContactUsAction =
//   (viewName: string) => async (dispatch: Dispatch) => {
//     try {
//       dispatch({
//         type: USER_HOMEPAGE_VIEW_REQUEST,
//       });

//       dispatch({
//         type: USER_HOMEPAGE_VIEW_SUCCESS,
//         payload: viewName,
//       });
//     } catch (error) {
//       dispatch({
//         type: USER_HOMEPAGE_VIEW_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };

export const userChangePasswordRequestAction =
  (email: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_FORGOT_PASSWORD_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const Body = { email: email };

      const { data } = await axios.post(
        `${baseURL}auth/forgotpassword/email`,
        Body,
        config
      );

      // only make success if the response is success
      if (data) {
        dispatch({
          type: USER_FORGOT_PASSWORD_SUCCESS,
        });
        return data;
      }
    } catch (error) {
      dispatch({
        type: USER_FORGOT_PASSWORD_FAIL,
      });
      return error;
    }
  };

export const validateOTPAction =
  (email: string, OTP: number) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_VALIDATE_OTP_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const Body = { email: email, OTP: OTP };

      const { data } = await axios.post(
        `${baseURL}auth/forgotpassword/validate`,
        Body,
        config
      );

      // only make success if the response is success
      if (data) {
        dispatch({
          type: USER_VALIDATE_OTP_SUCCESS,
        });
        return data;
      }
    } catch (error) {
      dispatch({
        type: USER_VALIDATE_OTP_FAIL,
      });
      return error.response;
    }
  };

export const changePasswordAction =
  (email: string, newPassword: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_CHANGE_PASSWORD_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const Body = { email: email, newPassword: newPassword };

      const { data } = await axios.post(
        `${baseURL}auth/forgotpassword/update`,
        Body,
        config
      );

      // only make success if the response is success
      if (data) {
        dispatch({
          type: USER_CHANGE_PASSWORD_SUCCESS,
        });
        return data;
      }
    } catch (error) {
      dispatch({
        type: USER_CHANGE_PASSWORD_FAIL,
      });
      return error.response;
    }
  };
