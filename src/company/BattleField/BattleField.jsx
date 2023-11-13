import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  attackLogic,
  enemyAttackLogic,
  getCardsForBattle,
  getPowersForBattle,
} from "../../store/company/companySlice";
import { getOneLevel } from "../../store/company/companyActions";
import CardInvet from "../../components/cards/CardInvent/CardInvet";
import { useParams } from "react-router-dom";
import { getTeamPowers } from "../../helpers/functions";
import BattleResult from "../BattleResult/BattleResult";
import AttackModal from "../AttackModal/AttackModal";

import "./BattleField.css";

const BattleField = () => {
  const {
    oneLevel,
    cardsForBattle,
    oneCardPower,
    enemyPower,
    step,
    resultModal,
  } = useSelector((state) => state.company);
  const [attack, setAttack] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneLevel(id));
    dispatch(getCardsForBattle(cardsForBattle, enemyPower));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(enemyAttackLogic());
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [step]);

  useEffect(() => {
    if (oneLevel) {
      dispatch(
        getPowersForBattle({
          enemyTotal: oneLevel.enemy.power,
          powersArray: getTeamPowers(),
        })
      );
    }
  }, [oneLevel]);

  return (
    <div className="battle--field">
      <>
        {resultModal && (
          <BattleResult
            resultModal={resultModal}
            cardsForBattle={cardsForBattle}
          />
        )}
      </>
      <div>
        {attack && <AttackModal attack={attack} setAttack={setAttack} />}
      </div>
      <div className="battle--field__main">
        <h1 className="enemy--h1">HP/Power: {enemyPower}</h1>
        <div className="enemy--card">
          {oneLevel && (
            <>
              <CardInvet card={oneLevel.enemy} />
            </>
          )}
        </div>
        <p className="versus">VS</p>
        <div className="players--cont">
          <>
            {cardsForBattle.map((card, index) => (
              <div key={`card${card.id}`}>
                <div className="players--HP">
                  <h1 style={{ fontSize: "25px" }}>
                    HP/Power: {oneCardPower[index]}
                  </h1>
                  <button
                    onClick={() => {
                      setAttack(true);
                      dispatch(attackLogic({ index, cardId: card.id }));
                    }}
                  >
                    Attack
                  </button>
                </div>
                <CardInvet card={card} />
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default BattleField;
