import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortByRating } from "../../../store/cards/cardsSlice";
import { getCards } from "../../../store/cards/cardsActions";
import "./CardsSortRating.css";

const CardsSortRating = () => {
  const { sortByRating } = useSelector((state) => state.cards);
  const [sortBy, setSortBy] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSortByRating({ sortByRating: sortBy }));
    dispatch(getCards());
  }, [sortBy]);

  useEffect(() => {
    if (!sortByRating) {
      setSortBy("");
    }
  }, [sortByRating]);
  return (
    <div>
      <select
        onChange={(e) => setSortBy(e.target.value)}
        value={sortBy}
        className="select-container"
      >
        <option value="">Не сортировать</option>
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
    </div>
  );
};

export default CardsSortRating;
