import React from "react";
import RegistrationForm from "../../components/users/Registration/RegistrationForm";
import "./RegisterPage.css";
import registerBack from "./images/registerBack.png";

const RegisterPage = () => {
  return (
    <div className="register">
      <img src={registerBack} alt="" />
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
