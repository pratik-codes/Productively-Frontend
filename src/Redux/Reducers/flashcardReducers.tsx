import { Action, ActionCreator, Dispatch } from "redux";
import axios from "axios";
import { Reducer } from "redux";
import {
  USER_ADD_FLASHCARD_FAIL,
  USER_ADD_FLASHCARD_REQUEST,
  USER_ADD_FLASHCARD_SUCCESS,
  USER_CREATE_FLASHCARD_GROUP_FAIL,
  USER_CREATE_FLASHCARD_GROUP_REQUEST,
  USER_CREATE_FLASHCARD_GROUP_SUCCESS,
  USER_FLASHCARD_DELETE_FAIL,
  USER_FLASHCARD_DELETE_REQUEST,
  USER_FLASHCARD_DELETE_SUCCESS,
  USER_FLASHCARD_FAIL,
  USER_FLASHCARD_GROUP_DELETE_FAIL,
  USER_FLASHCARD_GROUP_DELETE_REQUEST,
  USER_FLASHCARD_GROUP_DELETE_SUCCESS,
  USER_FLASHCARD_GROUP_DETAILS_EDIT_FAIL,
  USER_FLASHCARD_GROUP_DETAILS_EDIT_REQUEST,
  USER_FLASHCARD_GROUP_DETAILS_EDIT_SUCCESS,
  USER_FLASHCARD_REQUEST,
  USER_FLASHCARD_SUCCESS,
} from "../Constants/Falshcard.constants";
import { flashcardGroups } from "../../Interfaces/Interfaces";

const FlashcardInitialState = { flashcardGroups: [] };

const addPriorityInitialState = { message: "" };

export type getFlashcardAction = {
  type: string;
  payload: flashcardGroups[];
};

type addFlashcardAction = {
  type: string;
  payload: { message: "" };
};

export const getFlashcardGroupReducers = (
  state = FlashcardInitialState,
  action: getFlashcardAction
) => {
  switch (action.type) {
    case USER_FLASHCARD_REQUEST:
      return { loading: true };
    case USER_FLASHCARD_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_FLASHCARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addFlashcardGroupReducers = (
  state = addPriorityInitialState,
  action: addFlashcardAction
) => {
  switch (action.type) {
    case USER_CREATE_FLASHCARD_GROUP_REQUEST:
      return { loading: true };
    case USER_CREATE_FLASHCARD_GROUP_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_CREATE_FLASHCARD_GROUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addFlashcardReducers = (
  state = addPriorityInitialState,
  action: addFlashcardAction
) => {
  switch (action.type) {
    case USER_ADD_FLASHCARD_REQUEST:
      return { loading: true };
    case USER_ADD_FLASHCARD_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_ADD_FLASHCARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editFlashcardGroupReducers = (
  state = addPriorityInitialState,
  action: addFlashcardAction
) => {
  switch (action.type) {
    case USER_FLASHCARD_GROUP_DETAILS_EDIT_REQUEST:
      return { loading: true };
    case USER_FLASHCARD_GROUP_DETAILS_EDIT_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_FLASHCARD_GROUP_DETAILS_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteFlashcardGroupReducers = (
  state = addPriorityInitialState,
  action: addFlashcardAction
) => {
  switch (action.type) {
    case USER_FLASHCARD_GROUP_DELETE_REQUEST:
      return { loading: true };
    case USER_FLASHCARD_GROUP_DELETE_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_FLASHCARD_GROUP_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteFlashcardReducers = (
  state = addPriorityInitialState,
  action: addFlashcardAction
) => {
  switch (action.type) {
    case USER_FLASHCARD_DELETE_REQUEST:
      return { loading: true };
    case USER_FLASHCARD_DELETE_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_FLASHCARD_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
