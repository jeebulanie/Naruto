import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../../store/cards/cardsActions";
import { setSearchVal } from "../../../store/cards/cardsSlice";
import "./CardSearch.css";

const CardSearch = () => {
  const { search } = useSelector((state) => state.cards);
  const [searchValue, setSearchValue] = useState(search);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Поиск..."
          className="search--input"
          onChange={(e) => {
            setSearchValue(e.target.value);
            dispatch(setSearchVal({ search: e.target.value }));
            dispatch(getCards());
          }}
          value={searchValue}
        />
      </div>
    </div>
  );
};

export default CardSearch;
