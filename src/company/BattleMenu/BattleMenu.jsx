import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanBattleSlots } from "../../store/company/companyActions";
import { useNavigate } from "react-router-dom";
import { clearCardsForBattle } from "../../store/company/companySlice";
import { NOTIFY_TYPES, notify } from "../../helpers/functions";
import { Button } from "@mui/material";
import CardInvet from "../../components/cards/CardInvent/CardInvet";

const BattleMenu = ({ setModal }) => {
  const { oneLevel, cardsForBattle } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    cleanBattleSlots();
    dispatch(clearCardsForBattle());
  }, [oneLevel]);

  function goToBattle() {
    if (cardsForBattle.length) {
      navigate(`/battleField/${oneLevel.id}`);
    } else {
      notify("Выберите карты", NOTIFY_TYPES.error);
    }
  }

  return (
    <>
      {oneLevel && (
        <div style={{ marginRight: "30px" }}>
          <h1 style={{ textAlign: "center", fontSize: "20px" }}>Враг</h1>
          <CardInvet card={oneLevel.enemy} />
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              onClick={() => {
                setModal(false);
              }}
              variant="contained"
              color="error"
            >
              Вернуться
            </Button>
            <Button onClick={goToBattle} variant="contained" color="success">
              В бой
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default BattleMenu;
