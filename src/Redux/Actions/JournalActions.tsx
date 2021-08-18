import { Dispatch } from "redux";
import Axios from "axios";
import { baseURL } from "./userActions";
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

export const getJournalGroupList = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_JOURNAL_REQUEST,
    });
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await Axios.get(`${baseURL}journalgroup`, config);
    console.log(data);
    // only make success if the response is success
    if (data.statusCode === 200) {
      dispatch({
        type: USER_JOURNAL_SUCCESS,
        payload: data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_JOURNAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addJournalGroup =
  (groupName: string, groupDescription: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_CREATE_JOURNAL_GROUP_REQUEST,
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
      console.log(Body);
      // hitting REMAINDER api
      const { data } = await Axios.post(`${baseURL}journalgroup`, Body, config);
      console.log(data);

      // only make success if the response is success
      if (data.statusCode === 200) {
        dispatch({
          type: USER_CREATE_JOURNAL_GROUP_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_CREATE_JOURNAL_GROUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addJournal =
  (
    journalName: string,
    journalDescription: string,
    journalDate: Date | undefined,
    ans1: string,
    ans2: string,
    ans3: string,
    ans4: string,
    journalGroupId: string | undefined
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_JOURNAL_GROUP_DETAILS_EDIT_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const Body = {
        addJournalsDto: {
          journalName: journalName,
          journalDescription: journalDescription,
          journalDate: journalDate,
          ans1: ans1,
          ans2: ans2,
          ans3: ans3,
          ans4: ans4,
        },
        journalGroupId: journalGroupId,
      };
      console.log(Body);
      // hitting REMAINDER api
      const { data } = await Axios.post(
        `${baseURL}journalgroup/journal`,
        Body,
        config
      );
      console.log(data);

      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_JOURNAL_GROUP_DETAILS_EDIT_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_JOURNAL_GROUP_DETAILS_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editJournalGroup =
  (groupName: string, groupDescription: string, JournalGroupId: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_ADD_JOURNAL_REQUEST,
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
        JournalGroupId: JournalGroupId,
      };
      console.log(Body);
      // hitting REMAINDER api
      const { data } = await Axios.patch(
        `${baseURL}journalgroup`,
        Body,
        config
      );
      console.log(data);
      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_ADD_JOURNAL_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_ADD_JOURNAL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteJournalGroup =
  (journalGroupId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_JOURNAL_GROUP_DELETE_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // hitting REMAINDER api
      const { data } = await Axios.delete(
        `${baseURL}journalGroup/${journalGroupId}`,
        config
      );
      console.log(data);
      // only make success if the response is success
      if (data.statusCode === 200) {
        dispatch({
          type: USER_JOURNAL_GROUP_DELETE_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_JOURNAL_GROUP_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteJournal =
  (journalGroupId: string, journalId: string | undefined) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_JOURNAL_DELETE_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // hitting REMAINDER api
      const { data } = await Axios.delete(
        `${baseURL}journalgroup/journal/${journalGroupId}/${journalId}`,
        config
      );
      // only make success if the response is success
      if (data.statusCode === 200) {
        dispatch({
          type: USER_JOURNAL_DELETE_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_JOURNAL_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
