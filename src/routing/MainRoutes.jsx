import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import StorePage from "../pages/StorePage/StorePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import CreatePage from "../pages/CreatePage/CreatePage";
import CardDetailsPage from "../pages/CardDetailsPage/CardDetailsPage";
import CardEditPage from "../pages/CardEditPage/CardEditPage";
import CartPage from "../pages/CartPage/CartPage";
import QuizzesPage from "../pages/QuizzesPage/QuizzesPage";
import OneQuiz from "../components/quiz/OneQuiz";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import MapPage from "../pages/MapPage/MapPage";
import BattleField from "../company/BattleField/BattleField";
import QuizCreate from "../components/quiz/QuizCreate";
import CasePage from "../pages/CasePage/CasePage";
import UsersRating from "../components/users/UsersRating";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/registration" element={<RegisterPage />} />
      <Route path="/authorization" element={<LoginPage />} />
      <Route path="/card-create" element={<CreatePage />} />
      <Route path="/store/:id" element={<CardDetailsPage />} />
      <Route path="/card-edit/:id" element={<CardEditPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/quizzes" element={<QuizzesPage />} />
      <Route path="/quizzes/:id" element={<OneQuiz />} />
      <Route path="/user/:id" element={<ProfilePage />} />
      <Route path="/company" element={<MapPage />} />
      <Route path="/battleField/:id" element={<BattleField />} />
      <Route path="/quiz-create" element={<QuizCreate />} />
      <Route path="/cases" element={<CasePage />} />
      <Route path="/users-rating" element={<UsersRating />} />
    </Routes>
  );
};

export default MainRoutes;
