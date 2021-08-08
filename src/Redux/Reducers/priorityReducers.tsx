import { Action, ActionCreator, Dispatch } from "redux";
import axios from "axios";
import { Reducer } from "redux";
import {
  USER_CREATE_PRIORITY_FAIL,
  USER_CREATE_PRIORITY_REQUEST,
  USER_CREATE_PRIORITY_SUCCESS,
  USER_PRIORITY_DETAILS_EDIT_FAIL,
  USER_PRIORITY_DETAILS_EDIT_REQUEST,
  USER_PRIORITY_DETAILS_EDIT_SUCCESS,
  USER_PRIORITY_FAIL,
  USER_PRIORITY_REQUEST,
  USER_PRIORITY_SUCCESS,
} from "../Constants/Priority.constants";

const priorityInitialState = { Priority: [] };

const addPriorityInitialState = { message: "" };

type getPriorityAction = {
  type: string;
  payload: PrioritiesData;
};

type addPriorityAction = {
  type: string;
  payload: { message: "" };
};

export interface PrioritiesData {
  Priority: PriorityData[];
}

export interface PriorityData {
  _id: string;
  user: string;
  priority: string;
  __v: string;
}

export const getPrioritiesReducers = (
  state = priorityInitialState,
  action: getPriorityAction
) => {
  switch (action.type) {
    case USER_PRIORITY_REQUEST:
      return { loading: true };
    case USER_PRIORITY_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_PRIORITY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addPriorityReducers = (
  state = addPriorityInitialState,
  action: addPriorityAction
) => {
  switch (action.type) {
    case USER_CREATE_PRIORITY_REQUEST:
      return { loading: true };
    case USER_CREATE_PRIORITY_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_CREATE_PRIORITY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editPriorityReducers = (
  state = addPriorityInitialState,
  action: addPriorityAction
) => {
  switch (action.type) {
    case USER_PRIORITY_DETAILS_EDIT_REQUEST:
      return { loading: true };
    case USER_PRIORITY_DETAILS_EDIT_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_PRIORITY_DETAILS_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
