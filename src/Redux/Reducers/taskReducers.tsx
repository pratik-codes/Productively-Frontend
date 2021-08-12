import { Action, ActionCreator, Dispatch } from "redux";
import axios from "axios";
import { Reducer } from "redux";
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
import { TaskGroup } from "../../Interfaces/Interfaces";

const TaskListInitialState = { TaskGroups: [] };

const addPriorityInitialState = { message: "" };

type getTaskListAction = {
  type: string;
  payload: TaskGroup;
};

type addPriorityAction = {
  type: string;
  payload: { message: "" };
};

export const getTaskListGroupReducers = (
  state = TaskListInitialState,
  action: getTaskListAction
) => {
  switch (action.type) {
    case USER_TASK_REQUEST:
      return { loading: true };
    case USER_TASK_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_TASK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addTaskGroupReducers = (
  state = addPriorityInitialState,
  action: addPriorityAction
) => {
  switch (action.type) {
    case USER_CREATE_TASK_GROUP_REQUEST:
      return { loading: true };
    case USER_CREATE_TASK_GROUP_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_CREATE_TASK_GROUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addTaskReducers = (
  state = addPriorityInitialState,
  action: addPriorityAction
) => {
  switch (action.type) {
    case USER_ADD_TASK_REQUEST:
      return { loading: true };
    case USER_ADD_TASK_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_ADD_TASK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editTaskGroupReducers = (
  state = addPriorityInitialState,
  action: addPriorityAction
) => {
  switch (action.type) {
    case USER_TASK_GROUP_DETAILS_EDIT_REQUEST:
      return { loading: true };
    case USER_TASK_GROUP_DETAILS_EDIT_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_TASK_GROUP_DETAILS_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteTaskGroupReducers = (
  state = addPriorityInitialState,
  action: addPriorityAction
) => {
  switch (action.type) {
    case USER_TASK_GROUP_DELETE_REQUEST:
      return { loading: true };
    case USER_TASK_GROUP_DELETE_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_TASK_GROUP_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteTaskReducers = (
  state = addPriorityInitialState,
  action: addPriorityAction
) => {
  switch (action.type) {
    case USER_TASK_DELETE_REQUEST:
      return { loading: true };
    case USER_TASK_DELETE_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
