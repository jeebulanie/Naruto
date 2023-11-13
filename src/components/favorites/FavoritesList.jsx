import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../store/users/usersSlice";
import { toggleCardFavorite } from "../../store/users/usersActions";
import "./FavoritesList.css";
import { useNavigate } from "react-router-dom";

const FavoritesList = () => {
  const { oneUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="favorites-list-container">
      {oneUser && (
        <>
          {oneUser.favorites.length ? (
            <>
              <h2 className="favorites-list-header">Избранные</h2>
              {oneUser.favorites.map((card) => (
                <div key={card.id} className="favorites-list-item">
                  <img
                    onClick={() => navigate(`/store/${card.id}`)}
                    src={card.image}
                    alt="img"
                    className="favorites-list-image"
                    style={{ cursor: "pointer" }}
                  />
                  <button
                    onClick={() => {
                      dispatch(toggleCardFavorite({ card }));
                    }}
                    className="favorites-list-button"
                  >
                    Убрать
                  </button>
                </div>
              ))}
            </>
          ) : (
            <h2 style={{ color: "black" }}>Избранных нет</h2>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesList;
