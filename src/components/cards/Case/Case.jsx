import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cardsRandomizer,
  getALlCards,
} from "../../../store/cards/cardsActions";
import CardInvet from "../CardInvent/CardInvet";
import style from "./Case.module.css";

const Case = ({ setCardsModal }) => {
  const { allCards, randomCard } = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [stopRendering, setStopRendering] = useState(false);

  useEffect(() => {
    dispatch(getALlCards());
  }, []);

  useEffect(() => {
    const renderTimer = setTimeout(() => {
      if (currentCardIndex === allCards.length - 1) {
        setCurrentCardIndex(0);
      } else {
        setCurrentCardIndex(currentCardIndex + 1);
      }
    }, 10);

    return () => {
      clearTimeout(renderTimer);
    };
  }, [currentCardIndex, allCards]);

  useEffect(() => {
    const stopTimer = setTimeout(() => {
      setStopRendering(true);
      dispatch(cardsRandomizer());
    }, 5000);

    return () => {
      clearTimeout(stopTimer);
    };
  }, []);

  useEffect(() => {
    const stopTimer = setTimeout(() => {
      setCardsModal(false);
    }, 8000);

    return () => {
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <div className={style.caseModal}>
      {allCards.length && !stopRendering ? (
        <div>
          <CardInvet card={allCards[currentCardIndex]} />
        </div>
      ) : (
        <>
          {randomCard && (
            <div>
              <CardInvet card={randomCard} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Case;
