import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { attackAnimation } from "../../assets/attackAnimation";
import "./AttackModal.css";

const AttackModal = ({ setAttack, attack }) => {
  const { whoAttack } = useSelector((state) => state.company);
  useEffect(() => {
    if (attack) {
      const timer = setTimeout(() => {
        setAttack(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [attack]);

  return (
    <div className="attack--container">
      <div
        style={{
          border: "3px solid black",
          borderRadius: "30px",
          width: "30rem",
          height: "20rem",
        }}
      >
        {whoAttack && <img src={attackAnimation(whoAttack)} alt="" />}
      </div>
    </div>
  );
};

export default AttackModal;
