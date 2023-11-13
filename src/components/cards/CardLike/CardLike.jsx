import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { toggleCardLike } from "../../../store/cards/cardsActions";

const CardLike = ({ isLikedCard, likes, cardId }) => {
  const dispatch = useDispatch();

  return (
    <>
      {isLikedCard ? (
        <div
          onClick={() =>
            dispatch(toggleCardLike({ setIsLike: false, likes, cardId }))
          }
        >
          <FavoriteIcon fontSize="large" color="error" />
        </div>
      ) : (
        <div
          onClick={() =>
            dispatch(toggleCardLike({ setIsLike: true, likes, cardId }))
          }
        >
          <FavoriteIcon fontSize="large" />
        </div>
      )}
    </>
  );
};

export default CardLike;
