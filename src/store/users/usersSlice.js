import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteCardFromFavorite,
  getUsers,
  loginUser,
  savePoints,
  toggleCardFavorite,
} from "./usersActions";
import { addToLocalStorage } from "../../helpers/functions";
import { unlockCard } from "../cards/cardsActions";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    oneUser: null,
    loading: false,
    inventory: [],
    usersSortByLevel: [],
  },
  reducers: {
    clearOneUserState: (state) => {
      state.oneUser = null;
    },
    getOneUser: (state) => {
      state.oneUser = JSON.parse(localStorage.getItem("NarutoUser"));
      if (state.oneUser) {
        state.inventory = state.oneUser.inventory;
      }
    },
    deleteCardFromInventory: (state, action) => {
      state.oneUser = JSON.parse(localStorage.getItem("NarutoUser"));
      state.oneUser.inventory = state.oneUser.inventory.filter(
        (card) => card.id != action.payload
      );
      state.inventory = state.inventory.filter(
        (card) => card.id != action.payload
      );
      addToLocalStorage(state.oneUser);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.oneUser = action.payload;
        addToLocalStorage(action.payload);
      })
      .addCase(savePoints.fulfilled, (state, action) => {
        state.oneUser = action.payload;
      })
      .addCase(toggleCardFavorite.fulfilled, (state, action) => {
        state.oneUser = action.payload;
      })
      .addCase(deleteCardFromFavorite.fulfilled, (state, action) => {
        state.oneUser = action.payload;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersSortByLevel = action.payload;
      });
  },
});

export const { clearOneUserState, getOneUser, deleteCardFromInventory } =
  usersSlice.actions;
export default usersSlice.reducer;
