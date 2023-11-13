import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createQuiz } from "../../store/quizzes/quizzesActions";
import "./QuizCreate.css";
import { useNavigate } from "react-router-dom";

const QuizCreate = () => {
  const [quiz, setQuiz] = useState({
    name: "",
    image: "",
    questions: [],
  });
  const [oneQuestion, setOneQuestion] = useState({
    title: "",
    variants: [],
    correct: 0,
  });
  const [oneVariant, setOneVariant] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addVariant = (variant) => {
    oneQuestion.variants.push(variant);
    setOneVariant("");
  };
  const addQuestion = (question) => {
    quiz.questions.push(question);
    setOneQuestion({ title: "", variants: [], correct: 0 });
  };

  return (
    <div className="quiz-container">
      <div className="quiz-form">
        <h1>Добавить викторину</h1>
        <input
          type="text"
          value={quiz.name}
          placeholder="название"
          onChange={(e) => {
            setQuiz({ ...quiz, name: e.target.value });
          }}
        />
        <input
          placeholder="изображение"
          type="text"
          value={quiz.image}
          onChange={(e) => {
            setQuiz({ ...quiz, image: e.target.value });
          }}
        />
        <h1>Добавить вопрос</h1>
        <input
          placeholder="вопрос"
          value={oneQuestion.title}
          type="text"
          onChange={(e) => {
            setOneQuestion({ ...oneQuestion, title: e.target.value });
          }}
        />
        <input
          placeholder="вариант"
          type="text"
          value={oneVariant}
          onChange={(e) => setOneVariant(e.target.value)}
        />
        <button
          className="button"
          onClick={() => {
            addVariant(oneVariant);
          }}
        >
          добавить вариант
        </button>

        <select
          className="input-field"
          value={oneQuestion.correct}
          onChange={(e) => {
            setOneQuestion({ ...oneQuestion, correct: +e.target.value });
          }}
          name=""
          id=""
        >
          <option hidden>Правильный ответ</option>
          {oneQuestion.variants.map((variant, index) => (
            <option key={index} value={index}>
              {variant}
            </option>
          ))}
        </select>

        <button
          className="button"
          onClick={() => {
            addQuestion(oneQuestion);
          }}
        >
          Добавить вопрос
        </button>
        <button
          style={{
            backgroundColor: "orange",
            padding: "15px",
            fontWeight: "800",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            dispatch(createQuiz({ quiz }));
            navigate("/quizzes");
          }}
        >
          Создать викторину
        </button>
      </div>
    </div>
  );
};

export default QuizCreate;
