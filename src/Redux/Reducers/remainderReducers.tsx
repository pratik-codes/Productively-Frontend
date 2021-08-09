import { Action, ActionCreator, Dispatch } from "redux";
import axios from "axios";
import { Reducer } from "redux";
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

const remainderInitialState = { upcoming: [], past: [] };

const addRemainderInitialState = { message: "" };

type getRemainderAction = {
  type: string;
  payload: RemainderData;
};

type addRemainderAction = {
  type: string;
  payload: { message: "" };
};

export interface RemainderData {
  Upcoming: remainderData[];
  Past: remainderData[];
}

export interface remainderData {
  _id: string;
  user: string;
  remainderName: string;
  remainderDescription: string;
  remainderDate: Date;
  __v: string;
}

export const getRemaindersReducers = (
  state = remainderInitialState,
  action: getRemainderAction
) => {
  switch (action.type) {
    case USER_REMAINDER_REQUEST:
      return { loading: true };
    case USER_REMAINDER_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_REMAINDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addRemaindersReducers = (
  state = addRemainderInitialState,
  action: addRemainderAction
) => {
  switch (action.type) {
    case USER_CREATE_REMAINDER_REQUEST:
      return { loading: true };
    case USER_CREATE_REMAINDER_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_CREATE_REMAINDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editRemaindersReducers = (
  state = addRemainderInitialState,
  action: addRemainderAction
) => {
  switch (action.type) {
    case USER_REMAINDER_DETAILS_EDIT_REQUEST:
      return { loading: true };
    case USER_REMAINDER_DETAILS_EDIT_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_REMAINDER_DETAILS_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteRemaindersReducers = (
  state = addRemainderInitialState,
  action: addRemainderAction
) => {
  switch (action.type) {
    case USER_REMAINDER_DELETE_REQUEST:
      return { loading: true };
    case USER_REMAINDER_DELETE_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_REMAINDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
