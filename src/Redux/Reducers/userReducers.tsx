import { ActionCreator, Dispatch } from "redux";
import axios from "axios";
import { Reducer } from "redux";
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
  USER_SHOW_HIDE_NAVBAR_REQUEST,
  USER_SHOW_HIDE_NAVBAR_SUCCESS,
  USER_SHOW_HIDE_NAVBAR_FAIL,
  USER_SHOW_HIDE_SIDEBAR_REQUEST,
  USER_SHOW_HIDE_SIDEBAR_SUCCESS,
  USER_SHOW_HIDE_SIDEBAR_FAIL,
} from "../Constants/user.constants";

export interface userBasicState {
  user: {};
}

const userInitialBasicState: userBasicState = {
  user: {},
};

const showNavbarInitialState = {
  show: true,
};
const showSidebarInitialState = {
  show: true,
};

export interface userHomepageBasicState {
  view: string;
}

const userHomePageViewInitialBasicState: userHomepageBasicState = {
  view: "",
};

type Action = {
  type: string;
  payload?: boolean;
};

type HomePageAction = {
  type: string;
  payload?: string;
};

export const userLoginReducer = (
  state = userInitialBasicState,
  action: Action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = userInitialBasicState,
  action: Action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userHomePageViewChangeReducer = (
  state = userHomePageViewInitialBasicState,
  action: HomePageAction
) => {
  switch (action.type) {
    case USER_HOMEPAGE_VIEW_REQUEST:
      return { loading: true };
    case USER_HOMEPAGE_VIEW_SUCCESS:
      return { loading: false, view: action.payload };
    case USER_HOMEPAGE_VIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userShowHiveNavbarReducer = (
  state = showNavbarInitialState,
  action: Action
) => {
  switch (action.type) {
    case USER_SHOW_HIDE_NAVBAR_REQUEST:
      return { loading: true };
    case USER_SHOW_HIDE_NAVBAR_SUCCESS:
      return { loading: false, show: action.payload };
    case USER_SHOW_HIDE_NAVBAR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userShowSidebarReducer = (
  state = showSidebarInitialState,
  action: Action
) => {
  switch (action.type) {
    case USER_SHOW_HIDE_SIDEBAR_REQUEST:
      return { loading: true };
    case USER_SHOW_HIDE_SIDEBAR_SUCCESS:
      return { loading: false, show: action.payload };
    case USER_SHOW_HIDE_SIDEBAR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
