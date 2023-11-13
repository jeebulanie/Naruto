import React from "react";
import AuthorizationForm from "../../components/users/Authorization/AuthorizationForm";
import "./LoginPage.css";
import authBack from "./images/authBack.png";

const LoginPage = () => {
  return (
    <div className="loginPage">
      <img src={authBack} alt="" />
      <div className="loginForm">
        <AuthorizationForm />
      </div>
    </div>
  );
};

export default LoginPage;
