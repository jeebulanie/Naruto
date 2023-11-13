import React, { useEffect, useState } from "react";
import { getCards, getCategories } from "../../../store/cards/cardsActions";
import { changeCategory } from "../../../store/cards/cardsSlice";
import { useDispatch, useSelector } from "react-redux";
import "./CardsFilter.css";

const CardsFilter = () => {
  const { categories, currentCategory } = useSelector((state) => state.cards);
  const [category, setCategory] = useState("все");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(changeCategory({ category }));
    dispatch(getCards());
  }, [category]);

  useEffect(() => {
    if (!currentCategory) {
      setCategory("все");
    }
  }, [currentCategory]);

  return (
    <div>
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="custom-select"
        >
          <option value="все">все</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CardsFilter;
