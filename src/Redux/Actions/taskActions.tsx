import { Dispatch } from "redux";
import Axios from "axios";
import { baseURL } from "./userActions";
import {
  USER_ADD_TASK_FAIL,
  USER_ADD_TASK_REQUEST,
  USER_ADD_TASK_SUCCESS,
  USER_CREATE_TASK_GROUP_FAIL,
  USER_CREATE_TASK_GROUP_REQUEST,
  USER_CREATE_TASK_GROUP_SUCCESS,
  USER_TASK_DELETE_FAIL,
  USER_TASK_DELETE_REQUEST,
  USER_TASK_DELETE_SUCCESS,
  USER_TASK_FAIL,
  USER_TASK_GROUP_DELETE_FAIL,
  USER_TASK_GROUP_DELETE_REQUEST,
  USER_TASK_GROUP_DELETE_SUCCESS,
  USER_TASK_GROUP_DETAILS_EDIT_FAIL,
  USER_TASK_GROUP_DETAILS_EDIT_REQUEST,
  USER_TASK_GROUP_DETAILS_EDIT_SUCCESS,
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

export const addTaskGroup =
  (groupName: string, groupDescription: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_CREATE_TASK_GROUP_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const Body = {
        groupName: groupName,
        groupDescription: groupDescription,
      };
      // hitting REMAINDER api
      const { data } = await Axios.post(`${baseURL}taskgroup`, Body, config);
      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_CREATE_TASK_GROUP_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_CREATE_TASK_GROUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addTask =
  (
    taskName: string,
    taskDescription: string,
    tasksStatus: string,
    TaskGroupId: string | undefined
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_ADD_TASK_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const Body = {
        Tasks: {
          taskName: taskName,
          taskDescription: taskDescription,
          tasksStatus: tasksStatus,
        },
        TaskGroupId: TaskGroupId,
      };
      console.log(Body);
      // hitting REMAINDER api
      const { data } = await Axios.post(
        `${baseURL}taskgroup/tasks`,
        Body,
        config
      );
      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_ADD_TASK_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_ADD_TASK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editTaskGroup =
  (groupName: string, groupDescription: string, TaskGroupId: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_TASK_GROUP_DETAILS_EDIT_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const Body = {
        groupName: groupName,
        groupDescription: groupDescription,
        TaskGroupId: TaskGroupId,
      };
      console.log(Body);
      // hitting REMAINDER api
      const { data } = await Axios.patch(`${baseURL}taskgroup`, Body, config);
      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_TASK_GROUP_DETAILS_EDIT_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_TASK_GROUP_DETAILS_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteTaskGroup =
  (TaskGroupId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_TASK_GROUP_DELETE_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("deleting inside action...");

      // hitting REMAINDER api
      const { data } = await Axios.delete(
        `${baseURL}taskgroup/${TaskGroupId}`,
        config
      );
      console.log(data);
      // only make success if the response is success
      if (data.statusCode === 200) {
        dispatch({
          type: USER_TASK_GROUP_DELETE_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_TASK_GROUP_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteTask =
  (TaskGroupId: string | undefined, TaskId: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_TASK_DELETE_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(TaskGroupId);
      console.log(TaskId);
      // hitting REMAINDER api
      const { data } = await Axios.delete(
        `${baseURL}taskgroup/task/${TaskGroupId}/${TaskId}`,
        config
      );
      console.log(data);
      // only make success if the response is success
      if (data.statusCode === 200) {
        dispatch({
          type: USER_TASK_DELETE_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_TASK_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
