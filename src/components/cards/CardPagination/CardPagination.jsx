import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../../store/cards/cardsActions";
import { changePage } from "../../../store/cards/cardsSlice";
import { Stack } from "@mui/material";
import { Pagination } from "@mui/material";
import "./CardPagination.css";

export default function PaginationControlled() {
  const { currentPage, totalPages } = useSelector((state) => state.cards);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(changePage({ page: value }));
    dispatch(getCards());
  };
  return (
    <Stack sx={{ marginTop: "0" }} className="pagination">
      <Pagination
        className="paginationBody"
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
}
