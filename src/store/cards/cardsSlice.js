import { createSlice } from "@reduxjs/toolkit";
import {
  cardsRandomizer,
  getALlCards,
  getCards,
  getCategories,
  getOneCard,
} from "./cardsActions";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
    loading: false,
    oneCard: null,
    currentPage: 1,
    totalPages: 1,
    currentCategory: "",
    search: "",
    categories: [],
    sortByRating: "",
    priceRange: "",
    allCards: [],
    randomCard: null,
  },
  reducers: {
    clearOneCardState: (state) => {
      state.oneCard = null;
    },
    changePage: (state, action) => {
      state.currentPage = action.payload.page;
    },
    changeCategory: (state, action) => {
      if (action.payload.category === "все") {
        state.currentCategory = "";
      } else {
        state.currentCategory = action.payload.category;
      }
      state.currentPage = 1;
    },
    setSearchVal: (state, action) => {
      state.search = action.payload.search;
      state.currentPage = 1;
    },
    setSortByRating: (state, action) => {
      if (!action.payload.sortByRating) {
        state.sortByRating = "";
      } else {
        state.sortByRating = `&_sort=rating&_order=${action.payload.sortByRating}`;
      }
    },
    setPriceRangeState: (state, action) => {
      const { minPrice, maxPrice } = action.payload;
      if (minPrice && maxPrice) {
        state.priceRange = `&price_gte=${minPrice}&price_lte=${maxPrice}`;
      } else if (minPrice && !maxPrice) {
        state.priceRange = `&price_gte=${minPrice}`;
      } else if (maxPrice && !minPrice) {
        state.priceRange = `&price_lte=${maxPrice}`;
      } else {
        state.priceRange = "";
      }
    },
    clearAllFilters: (state) => {
      state.currentPage = 1;
      state.currentCategory = "";
      state.search = "";
      state.sortByRating = "";
      state.priceRange = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getOneCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneCard.fulfilled, (state, action) => {
        state.loading = false;
        state.oneCard = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getALlCards.fulfilled, (state, action) => {
        state.allCards = action.payload;
      })
      .addCase(cardsRandomizer.fulfilled, (state, action) => {
        state.randomCard = action.payload;
      });
  },
});

export const {
  clearOneCardState,
  changePage,
  setSearchVal,
  changeCategory,
  setSortByRating,
  setPriceRangeState,
  clearAllFilters,
} = cardsSlice.actions;
export default cardsSlice.reducer;
