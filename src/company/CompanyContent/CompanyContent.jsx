import React, { useEffect, useState } from "react";
import Level from "../Level/Level";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../store/users/usersSlice";
import BattleMenu from "../BattleMenu/BattleMenu";
import CardsMenu from "../CardsMenu/CardsMenu";
import { cleanBattleSlots } from "../../store/company/companyActions";
import CardsForBattle from "../CardsForBattle/CardsForBattle";
import style from "./CompanyContent.module.css";
import { getUsers } from "../../store/users/usersActions";

const CompanyContent = () => {
  const { oneUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const oneLevel = [];

  useEffect(() => {
    dispatch(getOneUser());
    cleanBattleSlots();
  }, []);

  if (oneUser) {
    for (let i = 1; i <= oneUser.level; i++) {
      oneLevel.push(<Level key={i} i={i} setModal={setModal} />);
    }
  }

  return (
    <>
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "50px",
          fontSize: "40px",
          letterSpacing: "5px",
        }}
      >
        КАРТА БИТВ
      </h1>
      <div className={style.companyContent}>{oneLevel}</div>
      <>
        {modal && (
          <div className={style.battleModal}>
            <div className={style.enemyAndTeam}>
              <BattleMenu setModal={setModal} />
              <CardsForBattle />
            </div>
            <CardsMenu />
          </div>
        )}
      </>
    </>
  );
};

export default CompanyContent;
