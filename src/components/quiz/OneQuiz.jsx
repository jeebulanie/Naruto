import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOneQuiz } from "../../store/quizzes/quizzesActions";
import { savePoints } from "../../store/users/usersActions";
import {
  clearCorrets,
  clearQuizValues,
  onClickVariant,
} from "../../store/quizzes/quizzesSlice";
import style from "./Quizzes.module.css";

const OneQuiz = () => {
  const { loading, oneQuiz, question, step, corrects } = useSelector(
    (state) => state.quizzes
  );
  const [checkQuiz, setCheckQuiz] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneQuiz({ id }));
    if (oneQuiz) {
      if (oneQuiz.questions.length == step) {
        dispatch(savePoints(corrects));
        dispatch(clearQuizValues());
        setCheckQuiz(false);
      }
    }
  }, [step]);

  useEffect(() => {
    return () => {
      dispatch(clearCorrets());
    };
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {checkQuiz ? (
            <div className={style.quizBody}>
              {question && (
                <div className={style.question}>
                  <span>
                    ВОПРОС: {step + 1}/{oneQuiz.questions.length}
                  </span>
                  <h3>{question.title}</h3>
                  {question.variants.map((text, index) => (
                    <li
                      onClick={() => dispatch(onClickVariant(index))}
                      key={index}
                      style={{
                        cursor: "pointer",
                        border: "1px solid black",
                        padding: "10px",
                      }}
                    >
                      {text}
                    </li>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className={style.quizBody}>
                <div className={style.question}>
                  <div className={style.quizResult}>
                    <p>ПОЗДРАВЛЯЮ!</p>
                    <img
                      src="https://avatanplus.com/files/resources/original/5905b2047dbf815bbe3f61a3.png"
                      alt=""
                      width="250"
                      height="auto"
                    />
                    {oneQuiz && (
                      <p>
                        Получено баллов: {corrects}/{oneQuiz.questions.length}
                      </p>
                    )}
                    <Link to="/quizzes" className={style.quizExit}>
                      ВЫЙТИ
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default OneQuiz;
