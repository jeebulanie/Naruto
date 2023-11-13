import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { QUIZZES_API } from "../../helpers/consts";

export const getQuizzes = createAsyncThunk("quizzes/getQuizzes", async () => {
  const { data } = await axios.get(QUIZZES_API);
  return data;
});

export const getOneQuiz = createAsyncThunk(
  "quizzes/getOneQuiz",
  async ({ id }) => {
    const { data } = await axios.get(`${QUIZZES_API}/${id}`);
    return data;
  }
);

export const createQuiz = createAsyncThunk(
  "quizzes/createQuiz",
  async ({ quiz }) => {
    await axios.post(QUIZZES_API, quiz);
  }
);

export const deleteQuiz = createAsyncThunk(
  "quizzes/deleteQuiz",
  async ({ id }, { dispatch }) => {
    await axios.delete(`${QUIZZES_API}/${id}`);
    dispatch(getQuizzes());
  }
);
