import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  cardColorChange,
  checkCardInFavorites,
  checkUserLogin,
  getAuthUser,
  processNumber,
} from "../../../helpers/functions";
import {
  checkCardInCart,
  toggleCardToCart,
} from "../../../store/cart/cartActions";
import { getCart } from "../../../store/cart/cartSlice";
import CardLike from "../CardLike/CardLike";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toggleCardFavorite } from "../../../store/users/usersActions";
import StarIcon from "@mui/icons-material/Star";
import { unlockCard } from "../../../store/cards/cardsActions";
import InfoIcon from "@mui/icons-material/Info";

import "./CardFooter.css";

const CardFooter = ({ card }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { oneUser } = useSelector((state) => state.users);
  const { cart } = useSelector((state) => state.cart);
  const [isCardInCart, setIsCardInCart] = useState(false);
  const [isLikedCard, setIsLikedCard] = useState(false);
  const [isFavCard, setIsFavCard] = useState(false);

  useEffect(() => {
    if (checkCardInCart(card.id)) {
      setIsCardInCart(true);
    } else {
      setIsCardInCart(false);
    }
  }, [cart]);

  useEffect(() => {
    if (checkCardInFavorites(card.id)) {
      setIsFavCard(true);
    } else {
      setIsFavCard(false);
    }
  }, [oneUser]);

  const checkCardLike = () => {
    const user = getAuthUser();
    if (!card.likes) return;
    const userLike = card.likes.find((like) => like.user === user);

    if (userLike) {
      setIsLikedCard(true);
    } else {
      setIsLikedCard(false);
    }
  };

  useEffect(() => {
    checkCardLike();
  }, []);

  return (
    <div className="cardFooter">
      {checkUserLogin() && (
        <div style={{ display: "flex" }} className="card--footer">
          <div style={{ display: "flex" }} className="card--likes">
            <button className="like--btn">
              <CardLike
                isLikedCard={isLikedCard}
                likes={card.likes}
                cardId={card.id}
              />
            </button>
            <span className="likes--count">
              {card.likes ? card.likes.length : 0}
            </span>
          </div>
          <button
            className="card--fav"
            onClick={() => {
              dispatch(toggleCardFavorite({ card }));
            }}
          >
            {isFavCard ? (
              <StarIcon fontSize="large" color="warning" />
            ) : (
              <StarIcon fontSize="large" />
            )}
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <button
              className="card--toCart"
              onClick={() => {
                toggleCardToCart(card);
                dispatch(getCart());
              }}
            >
              {isCardInCart ? (
                <ShoppingCartIcon fontSize="large" color="primary" />
              ) : (
                <ShoppingCartIcon fontSize="large" />
              )}
            </button>
          </div>
          <div
            className="CardLikeButton"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
          <InfoIcon
            className="card--details"
            fontSize="large"
            onClick={() => navigate(`/store/${card.id}`)}
          />
          <button
            onClick={() => {
              dispatch(unlockCard({ cardId: card.id, bool: false }));
            }}
            className="CardPrice"
          >
            {processNumber(card.price)}
          </button>
        </div>
      )}
    </div>
  );
};

export default CardFooter;
