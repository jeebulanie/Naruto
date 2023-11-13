import React from "react";
import { useDispatch } from "react-redux";
import { getAuthUser } from "../../../helpers/functions";
import { deleteComment } from "../../../store/comments/commentsActions";
import "./CommentItem.css";

const CommentItem = ({ comment }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="one--comment">
        <p>@{comment.user}</p>
        <p>{comment.body}</p>
        <p>Рейтинг:{comment.rating}</p>
        {getAuthUser() === comment.user && (
          <button
            className="commentDeleteBtn"
            onClick={() => {
              dispatch(deleteComment({ commentId: comment.id }));
            }}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
