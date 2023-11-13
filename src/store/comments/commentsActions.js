import { createAsyncThunk } from "@reduxjs/toolkit";
import { CARDS_API } from "../../helpers/consts";
import axios from "axios";
import { getOneCard } from "../cards/cardsActions";
import { getCardRating } from "../../helpers/functions";

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ cardObj, commentObj }, { dispatch }) => {
    const updatedCardObj = { ...cardObj };
    const checkCommentKeyInCard =
      Object.keys(updatedCardObj).includes("comments");

    if (!checkCommentKeyInCard) {
      updatedCardObj.comments = [commentObj];
    } else {
      updatedCardObj.comments = [...cardObj.comments, commentObj];
    }
    updatedCardObj.rating = getCardRating(updatedCardObj);
    await axios.patch(`${CARDS_API}/${updatedCardObj.id}`, updatedCardObj);
    dispatch(getOneCard({ id: updatedCardObj.id }));
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ commentId }, { dispatch, getState }) => {
    const { oneCard } = getState().cards;
    const updatedCard = { ...oneCard };
    updatedCard.comments = updatedCard.comments.filter(
      (comment) => comment.id !== commentId
    );

    updatedCard.rating = getCardRating(updatedCard);
    await axios.patch(`${CARDS_API}/${updatedCard.id}`, updatedCard);
    dispatch(getOneCard({ id: updatedCard.id }));
  }
);
