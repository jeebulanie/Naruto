import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NOTIFY_TYPES, getAuthUser, notify } from "../../../helpers/functions";
import { createComment } from "../../../store/comments/commentsActions";
import "./CommentCreate.css";

const CommentCreate = ({ card }) => {
  const [comment, setComment] = useState({
    commentContent: "",
    rating: "",
  });
  const dispatch = useDispatch();

  const addComment = () => {
    if (!comment.commentContent.trim())
      return notify("Напишите комментарий", NOTIFY_TYPES.warning);

    if (!comment.rating)
      return notify("Поставьте оценку", NOTIFY_TYPES.warning);

    const commentObj = {
      id: Date.now(),
      body: comment.commentContent,
      rating: comment.rating,
      user: getAuthUser(),
    };

    dispatch(createComment({ cardObj: card, commentObj }));

    setComment({
      commentContent: "",
      rating: "",
    });
  };

  return (
    <div>
      <div>
        <textarea
          className="comment--creator"
          cols="30"
          rows="10"
          onChange={(e) =>
            setComment({ ...comment, commentContent: e.target.value })
          }
          value={comment.commentContent}
        ></textarea>
        <div className="btns--block">
          <select
            onChange={(e) =>
              setComment({ ...comment, rating: +e.target.value })
            }
            value={comment.rating}
          >
            <option hidden>Оценка</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button onClick={addComment}>Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default CommentCreate;
