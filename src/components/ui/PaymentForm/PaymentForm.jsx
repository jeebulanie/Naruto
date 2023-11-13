import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import style from "./PaymentForm.module.css";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../store/cart/cartActions";
import { NOTIFY_TYPES, notify } from "../../../helpers/functions";

const PaymentForm = ({ setModal }) => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    let newValue = value;
    if (name === "number" || name === "cvc") {
      newValue = value.replace(/\D/g, "");
    }

    // Для поля 'expiry' ограничиваем ввод до 4 цифр
    if (name === "expiry") {
      newValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setState((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleClick = () => {
    if (
      !state.number.trim() ||
      !state.name.trim() ||
      !state.expiry.trim() ||
      !state.cvc.trim()
    ) {
      return notify("Заполните поля", NOTIFY_TYPES.warning);
    }

    if (
      state.number.length != 16 ||
      state.expiry.length != 4 ||
      state.cvc.length != 3
    ) {
      return notify("Правильно заполните все поля", NOTIFY_TYPES.error);
    }

    dispatch(createOrder({ userCardData: state }));
    setModal(false);
  };

  return (
    <div className={style.paymentForm}>
      <div className={style.paymentFormContent}>
        <span
          onClick={() => {
            setModal(false);
          }}
        >
          x
        </span>
        <h1
          style={{ fontSize: "25px", textAlign: "center", marginTop: "25px" }}
        >
          1000両 = 1$
        </h1>
        <div className={style.creditCard}>
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
        </div>
        <div className={style.paymentInputs}>
          <input
            type="text"
            name="number"
            placeholder="Номер карты"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength="16"
          />
          <input
            type="text"
            name="name"
            placeholder="Имя владельца"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              style={{ width: "42%" }}
              type="text"
              name="expiry"
              placeholder="Срок действия (мм/гг)"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength="4"
            />
            <input
              style={{ width: "42%" }}
              type="text"
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength="3"
            />
          </div>
        </div>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Заказать
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
