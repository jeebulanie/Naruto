import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/users/usersActions";

const UsersRating = () => {
  const { usersSortByLevel } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="ratingPage"
    >
      <h1 style={{ color: "white" }}>ТАБЛИЦА ЛИДЕРОВ</h1>
      <ol style={{ listStyle: "decimal inside" }}>
        {usersSortByLevel.map((user) => (
          <div
            style={{
              display: "flex",
              border: "1px solid black",
              width: "300px",
              padding: "10px",
              borderRadius: "20px",
              marginBottom: "10px",
              alignItems: "center",
              backgroundColor: "white",
            }}
            key={user.id}
          >
            <div style={{ width: "70px", height: "70px", borderRadius: "50%" }}>
              <img
                src={user.image}
                alt=""
                width="70"
                height="70"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <li>{user.name}</li>
              <p>lvl: {user.level}</p>
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default UsersRating;
