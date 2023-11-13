import { createSlice } from "@reduxjs/toolkit";
import { getLevels, getOneLevel } from "./companyActions";
import { NOTIFY_TYPES, notify } from "../../helpers/functions";

const companySlice = createSlice({
  name: "company",
  initialState: {
    levels: [],
    loading: false,
    oneLevel: null,
    cardsForBattle: [],
    step: 0,
    teamPower: 0,
    enemyPower: 0,
    oneCardPower: [],
    resultModal: null,
    whoAttack: "",
  },
  reducers: {
    getCardsForBattle: (state) => {
      let inventoryInLocalStorage =
        JSON.parse(localStorage.getItem("NarutoBattle")) || [];
      state.cardsForBattle = inventoryInLocalStorage;
    },
    clearCardsForBattle: (state) => {
      state.cardsForBattle = [];
      state.resultModal = null;
      state.step = 0;
    },
    getPowersForBattle: (state, action) => {
      state.teamPower = action.payload.ourTotal;
      state.enemyPower = action.payload.enemyTotal;
      state.oneCardPower = action.payload.powersArray;
    },
    attackLogic: (state, action) => {
      const { index, cardId } = action.payload;
      state.whoAttack = cardId;

      let updatedEnemyPower;
      if (state.step % 2 == 0) {
        state.step = state.step + 1;
        updatedEnemyPower = state.enemyPower - state.oneCardPower[index];
      }

      if (updatedEnemyPower <= 0 || !updatedEnemyPower) {
        state.enemyPower = state.enemyPower = 0;
        state.resultModal = 1;
        return;
      } else {
        state.enemyPower = updatedEnemyPower;
      }
    },
    enemyAttackLogic: (state) => {
      if (state.step % 2 === 1 && state.enemyPower > 0) {
        const enemyAttack = Math.floor(
          Math.random() * state.cardsForBattle.length
        );

        console.log(state.enemyPower);
        let updatedCardPower =
          state.oneCardPower[enemyAttack] - state.enemyPower;

        notify(
          `${state.oneLevel.enemy.name} атаковал ${state.cardsForBattle[enemyAttack].name}`,
          NOTIFY_TYPES.info
        );

        if (updatedCardPower <= 0) {
          state.cardsForBattle = state.cardsForBattle.filter((card, index) => {
            return index !== enemyAttack;
          });
          state.oneCardPower = state.oneCardPower.filter((card, index) => {
            return index !== enemyAttack;
          });
        } else {
          state.oneCardPower[enemyAttack] = updatedCardPower;
        }

        if (state.oneCardPower.length === 0) {
          state.resultModal = 2;
          return;
        }

        state.step = state.step + 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.levels = action.payload;
      })
      .addCase(getOneLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.oneLevel = action.payload;
      });
  },
});

export const {
  getPowersForBattle,
  getCardsForBattle,
  clearCardsForBattle,
  attackLogic,
  enemyAttackLogic,
} = companySlice.actions;
export default companySlice.reducer;
