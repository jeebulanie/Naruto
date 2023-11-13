import React, { useEffect, useState } from "react";
import CardInvet from "../../components/cards/CardInvent/CardInvet";
import { useDispatch, useSelector } from "react-redux";
import { chooseCardForBattle } from "../../store/company/companyActions";
import { getCardsForBattle } from "../../store/company/companySlice";
import style from "./CardsMenu.module.css";

const CardsMenu = () => {
  const { inventory, oneUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  return (
    <div style={{ height: "85%", width: "auto" }}>
      <p style={{ fontSize: "20px", fontWeight: "700", textAlign: "center" }}>
        Выбери карты для боя
      </p>
      <div className={style.cardsMenu}>
        {oneUser && (
          <>
            {inventory.map((card) => (
              <div
                style={{ margin: "10px", cursor: "pointer" }}
                key={card.id}
                onClick={() => {
                  chooseCardForBattle(card);
                  dispatch(getCardsForBattle());
                }}
              >
                <CardInvet card={card} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CardsMenu;
