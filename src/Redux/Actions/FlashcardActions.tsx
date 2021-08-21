import { Dispatch } from "redux";
import Axios from "axios";
import {
  USER_ADD_FLASHCARD_FAIL,
  USER_ADD_FLASHCARD_REQUEST,
  USER_ADD_FLASHCARD_SUCCESS,
  USER_CREATE_FLASHCARD_GROUP_FAIL,
  USER_CREATE_FLASHCARD_GROUP_REQUEST,
  USER_CREATE_FLASHCARD_GROUP_SUCCESS,
  USER_FLASHCARD_DATA_EDIT_FAIL,
  USER_FLASHCARD_DATA_EDIT_REQUEST,
  USER_FLASHCARD_DATA_EDIT_SUCCESS,
  USER_FLASHCARD_DELETE_FAIL,
  USER_FLASHCARD_DELETE_REQUEST,
  USER_FLASHCARD_DELETE_SUCCESS,
  USER_FLASHCARD_EDIT_FAIL,
  USER_FLASHCARD_EDIT_REQUEST,
  USER_FLASHCARD_EDIT_SUCCESS,
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
import { baseURL } from "./userActions";

export const getFlashcardGroupList = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_FLASHCARD_REQUEST,
    });
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await Axios.get(`${baseURL}flashcard`, config);
    console.log(data);
    // only make success if the response is success
    if (data) {
      console.log("api call done");
      dispatch({
        type: USER_FLASHCARD_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_FLASHCARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addFlashcardGroup =
  (groupName: string, groupDescription: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_CREATE_FLASHCARD_GROUP_REQUEST,
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
      const { data } = await Axios.post(`${baseURL}flashcard`, Body, config);
      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_CREATE_FLASHCARD_GROUP_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_CREATE_FLASHCARD_GROUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addFlashcard =
  (
    flashcardName: string,
    flashcardDescription: string,
    flashcardData: string,
    FlashcardGroupId: string | undefined
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_FLASHCARD_GROUP_DETAILS_EDIT_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const Body = {
        addFlashcardsDto: {
          flashcardName: flashcardName,
          flashcardDescription: flashcardDescription,
          data: flashcardData,
        },
        FlashcardGroupId: FlashcardGroupId,
      };
      // hitting REMAINDER api
      const { data } = await Axios.post(
        `${baseURL}flashcard/card`,
        Body,
        config
      );
      console.log(data);
      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_FLASHCARD_GROUP_DETAILS_EDIT_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_FLASHCARD_GROUP_DETAILS_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editFlashcardGroup =
  (groupName: string, groupDescription: string, FlashcardGroupId: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_ADD_FLASHCARD_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const Body = {
        FlashcardGroupDto: {
          groupName: groupName,
          groupDescription: groupDescription,
        },
        FlashcardGroupId: FlashcardGroupId,
      };
      // hitting REMAINDER api
      const { data } = await Axios.patch(`${baseURL}flashcard`, Body, config);
      console.log(data);
      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_ADD_FLASHCARD_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_ADD_FLASHCARD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editFlashcard =
  (
    FlashcardGroupId: string | undefined,
    FlashcardId: string,
    flashcardName: string,
    flashcardDescription: string
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_FLASHCARD_EDIT_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const Body = {
        FlashcardGroupDto: {
          flashcardName: flashcardName,
          flashcardDescription: flashcardDescription,
        },
        FlashcardGroupId: FlashcardGroupId,
        FlashcardId: FlashcardId,
      };
      // hitting REMAINDER api
      const { data } = await Axios.patch(
        `${baseURL}flashcard/card`,
        Body,
        config
      );
      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_FLASHCARD_EDIT_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_FLASHCARD_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editFlashcardData =
  (
    FlashcardGroupId: string | undefined,
    FlashcardId: string,
    flashcardData: string
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_FLASHCARD_DATA_EDIT_REQUEST,
      });
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const Body = {
        FlashcardGroupId: FlashcardGroupId,
        FlashcardId: FlashcardId,
        data: flashcardData,
      };
      // hitting REMAINDER api
      const { data } = await Axios.patch(
        `${baseURL}flashcard/card/data`,
        Body,
        config
      );
      // only make success if the response is success
      if (data.statusCode === 201) {
        dispatch({
          type: USER_FLASHCARD_DATA_EDIT_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_FLASHCARD_DATA_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteFlashcardGroup =
  (FlashcardGroupId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_FLASHCARD_GROUP_DELETE_REQUEST,
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
        `${baseURL}flashcard/${FlashcardGroupId}`,
        config
      );
      console.log(data);
      // only make success if the response is success
      if (data.statusCode === 200) {
        dispatch({
          type: USER_FLASHCARD_GROUP_DELETE_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_FLASHCARD_GROUP_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteFlashcard =
  (FlashcardGroupId: string | undefined, FlashcardId: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_FLASHCARD_DELETE_REQUEST,
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
        `${baseURL}flashcard/card/${FlashcardGroupId}/${FlashcardId}`,
        config
      );
      // only make success if the response is success
      if (data.statusCode === 200) {
        dispatch({
          type: USER_FLASHCARD_DELETE_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_FLASHCARD_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
