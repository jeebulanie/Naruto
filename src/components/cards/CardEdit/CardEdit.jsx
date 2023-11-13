import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editCard,
  getCategories,
  getOneCard,
} from "../../../store/cards/cardsActions";
import { clearOneCardState } from "../../../store/cards/cardsSlice";
import style from "./CardEdit.module.css";

const CardEdit = () => {
  const { loading, oneCard, categories } = useSelector((state) => state.cards);
  const [card, setCard] = useState(oneCard);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneCard({ id }));
    dispatch(getCategories());
    return () => dispatch(clearOneCardState());
  }, []);

  useEffect(() => {
    if (oneCard) {
      setCard(oneCard);
    }
  }, [oneCard]);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {card && (
            <div className={style.cardEditForm}>
              <h1>РЕДАКТИРОВАТЬ</h1>
              <input
                type="text"
                placeholder="имя"
                onChange={(e) => setCard({ ...card, name: e.target.value })}
                value={card.name}
              />
              <input
                type="text"
                placeholder="ссылка на фото"
                onChange={(e) => setCard({ ...card, image: e.target.value })}
                value={card.image}
              />
              <select
                onChange={(e) => setCard({ ...card, rank: e.target.value })}
                value={card.rank}
              >
                <option hidden>Выбрать ранг</option>
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
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="number"
                  placeholder="цена"
                  onChange={(e) => setCard({ ...card, price: +e.target.value })}
                  value={card.price}
                />
                <input
                  type="number"
                  placeholder="сила"
                  onChange={(e) => setCard({ ...card, power: +e.target.value })}
                  value={card.power}
                />
              </div>

              <textarea
                cols="30"
                rows="10"
                placeholder="описание"
                onChange={(e) =>
                  setCard({ ...card, description: e.target.value })
                }
                value={card.description}
              ></textarea>
              <button
                onClick={() => {
                  dispatch(editCard({ card }));
                  navigate("/store");
                }}
              >
                Сохранить
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CardEdit;
