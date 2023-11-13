import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userLose, userWin } from "../../store/company/companyActions";
import style from "./BattleResult.module.css";

const BattleResult = ({ resultModal, cardsForBattle }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (resultModal == 1) {
      dispatch(userWin(id));
    }
    dispatch(userLose(cardsForBattle));
  }, [resultModal]);

  return (
    <div style={{ backgroundColor: "white" }} className={style.battleResult}>
      {resultModal && (
        <>
          {resultModal === 1 ? (
            <div className={style.winModal}>
              <h1>ПОБЕДА</h1>
              <p>Поздравляю с победой</p>
              <Link className="returnLink" to="/company">
                Вернуться
              </Link>
            </div>
          ) : (
            <div className={style.loseModal}>
              <h1>ПОРАЖЕНИЕ</h1>
              <p>К сожалению, вы потеряли половину своих очков</p>
              <Link className="returnLink" to="/company">
                Вернуться
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BattleResult;
