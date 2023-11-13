import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS_API } from "../../helpers/consts";
import {
  NOTIFY_TYPES,
  addToLocalStorage,
  getAuthUser,
  notify,
} from "../../helpers/functions";

export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ user }) => {
    const { data } = await axios.get(USERS_API);
    const oneUser = data.find(
      (item) => user.name === item.name && user.mail === item.mail
    );

    if (!oneUser) {
      if (user.name === "aman" || user.name === "erkin") {
        user.isAdmin = true;
      }
      await axios.post(USERS_API, user);
    } else {
      return notify("Пользователь уже есть в базе данных", NOTIFY_TYPES.error);
    }
    return user;
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ user }) => {
    const { data } = await axios.get(USERS_API);

    const oneUser = data.find(
      (item) =>
        user.name === item.name &&
        user.mail === item.mail &&
        user.password === item.password
    );

    if (!oneUser) {
      notify("Пользователь не найден", NOTIFY_TYPES.error);
    }
    return oneUser;
  }
);

export const savePoints = createAsyncThunk(
  "users/savePoints",
  async (correct) => {
    const oneUser = JSON.parse(localStorage.getItem("NarutoUser"));
    oneUser.points = oneUser.points + +correct;
    await axios.patch(`${USERS_API}/${oneUser.id}`, oneUser);
    addToLocalStorage(oneUser);
    return oneUser;
  }
);

export const toggleCardFavorite = createAsyncThunk(
  "users/toggleCardFavorite",
  async ({ card }) => {
    const oneUser = JSON.parse(localStorage.getItem("NarutoUser"));
    const isFav = oneUser.favorites.find((oneCard) => oneCard.id === card.id);

    if (isFav) {
      oneUser.favorites = oneUser.favorites.filter(
        (oneCard) => oneCard.id !== card.id
      );
    } else {
      oneUser.favorites.push(card);
    }

    addToLocalStorage(oneUser);
    await axios.patch(`${USERS_API}/${oneUser.id}`, oneUser);
    return oneUser;
  }
);

export const deleteCardFromFavorite = createAsyncThunk(
  "users/deleteCardFromFavorite",
  async ({ cardId }) => {
    const oneUser = JSON.parse(localStorage.getItem("NarutoUser"));
    oneUser.favorites = oneUser.favorites.filter((card) => card.id != cardId);
    addToLocalStorage(oneUser);
    await axios.patch(`${USERS_API}/${oneUser.id}`, oneUser);
    return oneUser;
  }
);

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const { data } = await axios.get(`${USERS_API}?q=&_sort=level&_order=desc`);
  return data;
});
