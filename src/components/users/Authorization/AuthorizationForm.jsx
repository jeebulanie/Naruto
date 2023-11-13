import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NOTIFY_TYPES, notify } from "../../../helpers/functions";
import { loginUser } from "../../../store/users/usersActions";

import "./AuthForm.css";

const AuthorizationForm = () => {
  const { loading } = useSelector((state) => state.users);

  const [user, setUser] = useState({
    name: "",
    mail: "",
    password: "",
    image: "",
    level: 1,
    inventory: [],
    favorites: [],
    points: 100,
    isAdmin: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signIn() {
    if (!user.name.trim() || !user.mail.trim() || !user.password.trim()) {
      return notify("Заполните поля", NOTIFY_TYPES.warning);
    }

    const result = await dispatch(loginUser({ user }));
    if (result.payload) {
      notify("Добро пожаловать", NOTIFY_TYPES.success);
      navigate("/");
      setUser({
        name: "",
        mail: "",
        password: "",
        image: "",
        level: 1,
        inventory: [],
        favorites: [],
        points: 0,
        isAdmin: false,
      });
    }
  }

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="authForm">
          <h1>Авторизация</h1>
          <p>
            Нет аккаунта? <br />
            <br /> <Link to="/registration">Создать</Link>
          </p>
          <div className="auth--content">
            <input
              type="text"
              placeholder="Логин"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
            />
            <input
              type="mail"
              placeholder="Мail"
              onChange={(e) => setUser({ ...user, mail: e.target.value })}
              value={user.mail}
            />
            <input
              type="password"
              placeholder="Пароль"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
            />
            <button onClick={signIn}>Войти</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorizationForm;
