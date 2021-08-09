import { Action, ActionCreator, Dispatch } from "redux";
import axios from "axios";
import { Reducer } from "redux";
import {
  USER_TASK_FAIL,
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

// export const addPriorityReducers = (
//   state = addPriorityInitialState,
//   action: addPriorityAction
// ) => {
//   switch (action.type) {
//     case USER_CREATE_PRIORITY_REQUEST:
//       return { loading: true };
//     case USER_CREATE_PRIORITY_SUCCESS:
//       return { loading: false, data: action.payload };
//     case USER_CREATE_PRIORITY_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const editPriorityReducers = (
//   state = addPriorityInitialState,
//   action: addPriorityAction
// ) => {
//   switch (action.type) {
//     case USER_PRIORITY_DETAILS_EDIT_REQUEST:
//       return { loading: true };
//     case USER_PRIORITY_DETAILS_EDIT_SUCCESS:
//       return { loading: false, data: action.payload };
//     case USER_PRIORITY_DETAILS_EDIT_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const deletePriorityReducers = (
//   state = addPriorityInitialState,
//   action: addPriorityAction
// ) => {
//   switch (action.type) {
//     case USER_PRIORITY_DELETE_REQUEST:
//       return { loading: true };
//     case USER_PRIORITY_DELETE_SUCCESS:
//       return { loading: false, data: action.payload };
//     case USER_PRIORITY_DELETE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
