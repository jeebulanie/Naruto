import { createSlice } from "@reduxjs/toolkit";
import { getOneQuiz, getQuizzes } from "./quizzesActions";
import { NOTIFY_TYPES, notify } from "../../helpers/functions";

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: {
    quizzes: [],
    oneQuiz: null,
    loading: false,
    question: null,
    step: 0,
    corrects: 0,
  },
  reducers: {
    onClickVariant: (state, action) => {
      state.step = state.step + 1;
      if (action.payload === state.question.correct) {
        state.corrects = state.corrects + 1;
        notify("Верно", NOTIFY_TYPES.success);
      } else {
        notify("Не верно", NOTIFY_TYPES.error);
      }
    },
    clearQuizValues: (state) => {
      state.oneQuiz = null;
      state.step = 0;
      state.question = null;
    },
    clearCorrets: (state) => {
      state.corrects = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizzes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      // .addCase(getOneQuiz.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(getOneQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.oneQuiz = action.payload;
        state.question = action.payload.questions[state.step];
      });
  },
});

export const { onClickVariant, clearQuizValues, clearCorrets } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
