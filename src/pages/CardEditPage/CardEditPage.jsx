import React from "react";
import CardEdit from "../../components/cards/CardEdit/CardEdit";
import style from "../../components/cards/CardEdit/CardEdit.module.css";

const CardEditPage = () => {
  return (
    <div className={style.cardEditPage}>
      <CardEdit />
    </div>
  );
};

export default CardEditPage;
