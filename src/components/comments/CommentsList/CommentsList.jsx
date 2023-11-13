import React from "react";
import CommentItem from "../CommentItem/CommentItem";

const CommentsList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
