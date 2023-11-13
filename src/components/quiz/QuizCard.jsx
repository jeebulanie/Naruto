import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Quizzes.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { deleteQuiz } from "../../store/quizzes/quizzesActions";
import { checkAdmin } from "../../helpers/functions";

const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={style.quizCard}>
      {checkAdmin() && (
        <DeleteOutlineIcon
          onClick={() => {
            dispatch(deleteQuiz({ id: quiz.id }));
          }}
          className={style.quizDelete}
          color="error"
        />
      )}

      <h3
        onClick={() => {
          navigate(`/quizzes/${quiz.id}`);
        }}
      >
        {quiz.name}
      </h3>
      <p>Вопросов: {quiz.questions.length}</p>
      <img
        onClick={() => {
          navigate(`/quizzes/${quiz.id}`);
        }}
        src={quiz.image}
        alt=""
      />
    </div>
  );
};

export default QuizCard;
