import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NOTIFY_TYPES, notify } from "../../../helpers/functions";
import { createUser } from "../../../store/users/usersActions";

import "./RegistrationForm.css";

const RegistrationForm = () => {
  const { loading } = useSelector((state) => state.users);
  const [user, setUser] = useState({
    name: "",
    mail: "",
    password: "",
    image: "",
    level: 1,
    inventory: [],
    favorites: [],
    isAdmin: false,
    points: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signUp() {
    if (
      !user.name.trim() ||
      !user.mail.trim() ||
      !user.password.trim() ||
      !user.image.trim()
    ) {
      return notify("Заполните поля", NOTIFY_TYPES.warning);
    }

    const result = await dispatch(createUser({ user }));

    if (result.payload) {
      notify("Регистрация прошла успешно", NOTIFY_TYPES.success);
      navigate("/authorization");
      setUser({
        name: "",
        mail: "",
        password: "",
        image: "",
        level: 1,
        inventory: [],
        favorites: [],
        isAdmin: false,
        points: 0,
      });
    }
  }

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="regForm">
          <h1>Регистрация</h1>
          <p>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </p>
          <div className="reg__content">
            <input
              type="text"
              placeholder="Логин"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
            />
            <input
              type="mail"
              placeholder="Mail"
              onChange={(e) => setUser({ ...user, mail: e.target.value })}
              value={user.mail}
            />
            <input
              type="text"
              placeholder="Cсылка на изображение"
              onChange={(e) => setUser({ ...user, image: e.target.value })}
              value={user.image}
            />
            <input
              type="password"
              placeholder="Пароль"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
            />
            <button onClick={signUp}>Создать аккаунт</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationForm;
