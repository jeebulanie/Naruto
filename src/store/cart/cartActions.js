import { createAsyncThunk } from "@reduxjs/toolkit";
import { ORDERS_API } from "../../helpers/consts";
import axios from "axios";
import { NOTIFY_TYPES, notify } from "../../helpers/functions";

export const getCartData = () => {
  const cart = JSON.parse(localStorage.getItem("NarutoCart"));
  if (!cart)
    return {
      user: "",
      totalCost: 0,
      cards: [],
    };
  return cart;
};

export const setCartData = (cartObj) => {
  const userName = JSON.parse(localStorage.getItem("NarutoUser"));
  cartObj.user = userName.name;
  localStorage.setItem("NarutoCart", JSON.stringify(cartObj));
};

export const checkCardInCart = (cardId) => {
  const cart = getCartData();
  return cart.cards.find((card) => card.cardItem.id == cardId);
};

export const countCartTotalCost = (cartCards) => {
  return cartCards.reduce((acc, currVal) => {
    return acc + currVal.totalPrice;
  }, 0);
};

export const toggleCardToCart = (cardObj) => {
  const cart = getCartData();
  if (!checkCardInCart(cardObj.id)) {
    cart.cards.push({
      count: 1,
      totalPrice: +cardObj.price,
      cardItem: cardObj,
    });
  } else {
    cart.cards = cart.cards.filter((card) => card.cardItem.id !== cardObj.id);
  }
  cart.totalCost = countCartTotalCost(cart.cards);
  setCartData(cart);
};

export const changeCountCardsInCart = (cardId, count) => {
  if (count < 0)
    return notify("Число не может быть отрицательным", NOTIFY_TYPES.error);
  const cart = getCartData();
  cart.cards = cart.cards.map((card) => {
    if (card.cardItem.id === cardId) {
      card.count = count;
      card.totalPrice = card.cardItem.price * count;
    }
    return card;
  });
  cart.totalCost = countCartTotalCost(cart.cards);
  setCartData(cart);
};

export const deleteCardFromCart = (cardId) => {
  const cart = getCartData();
  cart.cards = cart.cards.filter((card) => card.cardItem.id != cardId);
  cart.totalCost = countCartTotalCost(cart.cards);
  setCartData(cart);
};

export const cleanCart = () => {
  localStorage.removeItem("NarutoCart");
};

export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async ({ userCardData }) => {
    const cart = getCartData();
    const order = { ...cart, cardData: userCardData };
    if (!cart.cards.length) return;
    await axios.post(ORDERS_API, order);
    notify("Заказ отправлен на рассмотрение");
    cleanCart();
  }
);
