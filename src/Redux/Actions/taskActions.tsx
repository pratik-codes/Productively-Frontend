import { Dispatch } from "redux";
import Axios from "axios";
import { baseURL } from "./userActions";
import {
  USER_TASK_FAIL,
  USER_TASK_REQUEST,
  USER_TASK_SUCCESS,
} from "../Constants/Tasks.constants";

export const getTaskList = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_TASK_REQUEST,
    });
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // hitting REMAINDER api
    const { data } = await Axios.get(`${baseURL}taskgroup`, config);
    // only make success if the response is success
    if (data.statusCode === 200) {
      dispatch({
        type: USER_TASK_SUCCESS,
        payload: data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const addPriority = (Priority: string) => async (dispatch: Dispatch) => {
//   try {
//     dispatch({
//       type: USER_CREATE_PRIORITY_REQUEST,
//     });
//     const token = localStorage.getItem("accessToken");
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const Body = {
//       Priority: Priority,
//     };
//     // hitting REMAINDER api
//     const { data } = await Axios.post(`${baseURL}priority`, Body, config);
//     // only make success if the response is success
//     if (data.statusCode === 201) {
//       dispatch({
//         type: USER_CREATE_PRIORITY_SUCCESS,
//         payload: data.message,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: USER_CREATE_PRIORITY_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const editPriorityDetails =
//   (priorityId: string, Priority: string) => async (dispatch: Dispatch) => {
//     try {
//       dispatch({
//         type: USER_PRIORITY_DETAILS_EDIT_REQUEST,
//       });
//       const token = localStorage.getItem("accessToken");
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const Body = {
//         PriorityId: priorityId,
//         Priority: Priority,
//       };
//       console.log(Body);
//       // hitting REMAINDER api
//       const { data } = await Axios.patch(`${baseURL}priority`, Body, config);
//       // only make success if the response is success
//       if (data.statusCode === 201) {
//         dispatch({
//           type: USER_PRIORITY_DETAILS_EDIT_SUCCESS,
//           payload: true,
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: USER_PRIORITY_DETAILS_EDIT_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };

// export const deletePriority =
//   (priorityId: string) => async (dispatch: Dispatch) => {
//     try {
//       dispatch({
//         type: USER_PRIORITY_DELETE_REQUEST,
//       });
//       const token = localStorage.getItem("accessToken");
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       // hitting REMAINDER api
//       const { data } = await Axios.delete(
//         `${baseURL}priority/${priorityId}`,
//         config
//       );
//       // only make success if the response is success
//       if (data.statusCode === 200) {
//         dispatch({
//           type: USER_PRIORITY_DELETE_SUCCESS,
//           payload: true,
//         });
//         // setting the accesstoken to the local storage
//         localStorage.setItem("accessToken", data.data.accessToken);
//       }
//     } catch (error) {
//       dispatch({
//         type: USER_PRIORITY_DELETE_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };
