import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCard, getOneCard } from "../../../store/cards/cardsActions";
import { clearOneCardState } from "../../../store/cards/cardsSlice";
import { checkAdmin, checkUserLogin } from "../../../helpers/functions";
import CommentCreate from "../../comments/CommentCreate/CommentCreate";
import CommentsList from "../../comments/CommentsList/CommentsList";
import "./CardDetails.css";

const CardDetails = () => {
  const { loading, oneCard } = useSelector((state) => state.cards);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneCard({ id }));
    return () => dispatch(clearOneCardState());
  }, []);

  return (
    <div className="card--details--page">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {oneCard && (
            <div className="card--details__main">
              <div className="card--details__left">
                <div className="card--details__img">
                  <img src={oneCard.image} alt={oneCard.name} />
                  <p className="details--descr">{oneCard.description}</p>
                </div>
                <div className="card--details__footer">
                  <div className="card--descr">
                    <p>Имя:{oneCard.name}</p>
                    <p>Цена:{oneCard.price}両</p>
                    <p>Сила:{oneCard.power}</p>
                    <p>Ранг:{oneCard.rank}</p>
                    <p>Рейтинг: {oneCard.rating}</p>
                  </div>
                  {checkAdmin() && (
                    <div className="card--details__btn">
                      <button
                        className="card--edit"
                        onClick={() => navigate(`/card-edit/${id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="card--deleteBtn"
                        onClick={() => {
                          dispatch(deleteCard({ id }));
                          navigate("/store");
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="card--details__right">
                {oneCard.comments ? (
                  <div className="comments--details">
                    <CommentsList comments={oneCard.comments} />
                  </div>
                ) : (
                  <h2>Комменты отсутсвуют</h2>
                )}
                {checkUserLogin() && <CommentCreate card={oneCard} />}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CardDetails;
