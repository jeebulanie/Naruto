import React, { useState } from "react";
import narutoBox from "../../assets/NarutoBox.png";
import Case from "../../components/cards/Case/Case";

const CasePage = () => {
  const [cardsModal, setCardsModal] = useState(false);

  return (
    <div className="casePage" style={{ height: "100vh", width: "100%" }}>
      <div
        style={{
          margin: "0 auto",
          width: "330px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="luckyText">ПРОВЕРЬ СВОЮ УДАЧУ ЗА 777両</h1>
        <img src={narutoBox} alt="" width="320" />
        <button
          onClick={() => {
            setCardsModal(true);
          }}
          style={{
            padding: "20px",
            borderRadius: "20px",
            margin: "0 auto",
            fontWeight: "800",
            cursor: "pointer",
          }}
        >
          ОТКРЫТЬ БОКС
        </button>

        <>{cardsModal && <Case setCardsModal={setCardsModal} />}</>
      </div>
    </div>
  );
};

export default CasePage;
