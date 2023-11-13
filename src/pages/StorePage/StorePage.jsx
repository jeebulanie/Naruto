import React from "react";
import CardsList from "../../components/cards/CardsList/CardsList";
import CardPagination from "../../components/cards/CardPagination/CardPagination";
import CardSearch from "../../components/cards/CardSearch/CardSearch";
import CardsFilter from "../../components/cards/CardsFilter/CardsFilter";
import "./StorePage.css";
import CardsPriceRangeFilter from "../../components/cards/CardsPriceRangeFilter/CardsPriceRangeFilter";
import CardsSortRating from "../../components/cards/CardsSortRating/CardsSortRating";
import { clearAllFilters, setSearchVal } from "../../store/cards/cardsSlice";
import { getCards } from "../../store/cards/cardsActions";
import { useDispatch } from "react-redux";

const StorePage = () => {
  const dispatch = useDispatch();

  return (
    <div className="StoreMain">
      {/* <h2
        style={{
          textAlign: "center",
          margin: "0px 5% 2%",
          fontSize: "5rem",
          marginTop: "0",
          paddingTop: "3%",
        }}
      >
        МАГАЗИН
      </h2> */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: "2% 10px",
          width: "80%",
          margin: "0 auto",
          borderRadius: "20px",
        }}
      >
        <div
          className="searchAndFilter"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <p
              style={{
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              Фильтрация
            </p>
            <CardsFilter />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <p
              style={{
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              Поиск по цене
            </p>
            <CardsPriceRangeFilter />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <p
              style={{
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              Сортировка по рейтингу
            </p>
            <CardsSortRating />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <p
              style={{
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              Живой поиск
            </p>
            <CardSearch />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <p
              style={{
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              Сброс фильтров
            </p>
            <button
              onClick={() => {
                dispatch(clearAllFilters());
                dispatch(setSearchVal({ search: "" }));
                dispatch(getCards());
              }}
              style={{ alignItems: "center" }}
              className="ThrowButton"
            >
              Сбросить
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "4.3%",
            paddingTop: "0.5%",
          }}
        ></div>
      </div>
      <CardPagination />
      <CardsList />
      <CardPagination />
    </div>
  );
};

export default StorePage;
