import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardsForBattle } from "../../store/company/companySlice";

const CardsForBattle = () => {
  const { cardsForBattle } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCardsForBattle());
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "20px" }}>Ваша команда</h1>
      <div
        style={{
          display: "flex",
          padding: "10px",
          flexDirection: "column",
          border: "3px solid black",
          borderRadius: "10px",
        }}
      >
        {cardsForBattle.map((card) => (
          <div key={card.id}>
            <div
              style={{
                width: "100px",
                height: "100px",
                margin: "3px",
                border: "1px solid black",
                borderRadius: "50%",
              }}
            >
              <img
                src={card.image}
                alt=""
                width="100"
                height="100"
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsForBattle;
