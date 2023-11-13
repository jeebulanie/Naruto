import { createAsyncThunk } from "@reduxjs/toolkit";
import { COMPANY_API, USERS_API } from "../../helpers/consts";
import axios from "axios";
import {
  NOTIFY_TYPES,
  addToLocalStorage,
  notify,
} from "../../helpers/functions";

export const getLevels = createAsyncThunk("company/getLevels", async () => {
  const { data } = await axios.get(COMPANY_API);
  return data;
});

export const getOneLevel = createAsyncThunk(
  "company/getOneLevel",
  async (id) => {
    const { data } = await axios.get(`${COMPANY_API}/${id}`);
    return data;
  }
);

export const chooseCardForBattle = (card) => {
  let battleCards = JSON.parse(localStorage.getItem("NarutoBattle")) || [];
  const checkCard = battleCards.find((oneCard) => oneCard.id === card.id);

  if (checkCard) {
    battleCards = battleCards.filter((oneCard) => oneCard.id !== card.id);
  } else {
    battleCards.push(card);
  }

  if (battleCards.length <= 4) {
    localStorage.setItem("NarutoBattle", JSON.stringify(battleCards));
    if (!checkCard) {
    }
  } else {
    return notify(
      "В бою может участвовать максимум 4 карты",
      NOTIFY_TYPES.error
    );
  }
};

export const cleanBattleSlots = () => {
  localStorage.removeItem("NarutoBattle");
};

export const userWin = createAsyncThunk("company/userWin", async (levelId) => {
  const oneUser = JSON.parse(localStorage.getItem("NarutoUser"));

  if (oneUser) {
    if (levelId == oneUser.level) {
      oneUser.level = oneUser.level + 1;
      notify("+1 уровень");
      await axios.patch(`${USERS_API}/${oneUser.id}`, oneUser);
      addToLocalStorage(oneUser);
    }
  }
});

export const userLose = createAsyncThunk(
  "company/userLose",
  async (teamPower) => {
    const oneUser = JSON.parse(localStorage.getItem("NarutoUser"));

    if (oneUser) {
      if (teamPower.length === 0) {
        oneUser.points =
          oneUser.points - Math.round(oneUser.points / 2).toFixed(0);
        await axios.patch(`${USERS_API}/${oneUser.id}`, oneUser);
        addToLocalStorage(oneUser);
      }
    }
  }
);
