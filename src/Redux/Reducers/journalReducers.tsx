import { Action, ActionCreator, Dispatch } from "redux";
import axios from "axios";
import { Reducer } from "redux";
import {
  USER_ADD_JOURNAL_FAIL,
  USER_ADD_JOURNAL_REQUEST,
  USER_ADD_JOURNAL_SUCCESS,
  USER_CREATE_JOURNAL_GROUP_FAIL,
  USER_CREATE_JOURNAL_GROUP_REQUEST,
  USER_CREATE_JOURNAL_GROUP_SUCCESS,
  USER_JOURNAL_DELETE_FAIL,
  USER_JOURNAL_DELETE_REQUEST,
  USER_JOURNAL_DELETE_SUCCESS,
  USER_JOURNAL_FAIL,
  USER_JOURNAL_GROUP_DELETE_FAIL,
  USER_JOURNAL_GROUP_DELETE_REQUEST,
  USER_JOURNAL_GROUP_DELETE_SUCCESS,
  USER_JOURNAL_GROUP_DETAILS_EDIT_FAIL,
  USER_JOURNAL_GROUP_DETAILS_EDIT_REQUEST,
  USER_JOURNAL_GROUP_DETAILS_EDIT_SUCCESS,
  USER_JOURNAL_REQUEST,
  USER_JOURNAL_SUCCESS,
} from "../Constants/journal.constants";
import { JournalGroup } from "../../Interfaces/Interfaces";
const journalInitialState = { Journals: [] };

// const addPriorityInitialState = { message: "" };

type getJournalAction = {
  type: string;
  payload: JournalGroup[];
};

// type addPriorityAction = {
//   type: string;
//   payload: { message: "" };
// };

export const getJournalReducers = (
  state = journalInitialState,
  action: getJournalAction
) => {
  switch (action.type) {
    case USER_JOURNAL_REQUEST:
      return { loading: true };
    case USER_JOURNAL_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_JOURNAL_FAIL:
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
