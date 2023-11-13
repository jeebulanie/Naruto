import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuizzes } from "../../store/quizzes/quizzesActions";
import QuizCard from "./QuizCard";
import style from "./Quizzes.module.css";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../../helpers/functions";

const QuizList = () => {
  const { quizzes, loading } = useSelector((state) => state.quizzes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuizzes());
  }, []);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {checkAdmin() && (
            <button
              style={{ marginLeft: "100px" }}
              onClick={() => {
                navigate("/quiz-create");
              }}
            >
              Create
            </button>
          )}
          <div className={style.quizList}>
            {quizzes.map((quiz) => (
              <QuizCard key={`quiz${quiz.id}`} quiz={quiz} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default QuizList;
