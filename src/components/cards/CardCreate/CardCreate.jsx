import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCard, getCategories } from "../../../store/cards/cardsActions";
import { NOTIFY_TYPES, notify } from "../../../helpers/functions";
import "./CardCreate.css";

const CardCreate = () => {
  const { categories } = useSelector((state) => state.cards);
  const [card, setCard] = useState({
    name: "",
    image: "",
    price: 0,
    rank: "",
    power: 0,
    description: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function addCard() {
    for (let key in card) {
      if (!card[key]) return notify("Заполните все поля", NOTIFY_TYPES.error);
    }
    dispatch(createCard({ card }));
    navigate("/store");
  }

  return (
    <div className="inp-form">
      <h2 className="h2">Добавить нового героя</h2>
      <input
        className="inp-name"
        type="text"
        placeholder="имя"
        onChange={(e) => setCard({ ...card, name: e.target.value })}
      />
      <input
        className="inp-name"
        type="text"
        placeholder="ссылка на фото"
        onChange={(e) => setCard({ ...card, image: e.target.value })}
      />

      <select onChange={(e) => setCard({ ...card, rank: e.target.value })}>
        <option hidden>Выбери ранг</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div
        style={{
          display: "flex",
          width: "90%",
          height: "50px",
          padding: "10px",
          color: "white",
        }}
      >
        <input
          style={{ color: "white" }}
          type="number"
          placeholder="цена"
          onChange={(e) => setCard({ ...card, price: +e.target.value })}
        />
        <input
          style={{ color: "white" }}
          type="number"
          placeholder="сила"
          onChange={(e) => setCard({ ...card, power: +e.target.value })}
        />
      </div>

      <textarea
        className="text-name"
        cols="30"
        rows="10"
        placeholder="описание"
        onChange={(e) => setCard({ ...card, description: e.target.value })}
      ></textarea>
      <button className="btn-name" onClick={addCard}>
        Добавить героя
      </button>
    </div>
  );
};

export default CardCreate;
