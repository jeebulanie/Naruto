import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import FavoritesList from "../../favorites/FavoritesList";
import CardInvet from "../../cards/CardInvent/CardInvet";
import { getOneUser } from "../../../store/users/usersSlice";
import "./UserProfile.css";

const UserProfile = () => {
  //   const { id } = useParams();
  const { oneUser, loading, inventory } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneUser());
  }, []);

  return (
    <div className="UserProfileMain">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        className="forWr"
      >
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            {oneUser && (
              <>
                <div
                  style={{
                    width: "35rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    borderRadius: "5px",
                    margin: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: "10%",
                    }}
                  >
                    <div
                      style={{
                        width: "300px",
                        height: "300px",
                        overflow: "hidden",
                        border: "3px solid black",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    >
                      <img
                        src={oneUser.image}
                        alt=""
                        width="100%"
                        height="100%"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <p>{oneUser.name}</p>
                    <p>{oneUser.points} 両</p>
                    <p>{oneUser.level} уровень</p>
                    <Link to="/users-rating">Рейтинг</Link>
                  </div>
                  <>
                    <FavoritesList />
                  </>
                </div>

                <div
                  style={{
                    border: "1px solid black",
                    width: "53rem",
                    margin: "15px 30px 0 0",
                    borderRadius: "30px",
                  }}
                  className="UserProfileRight"
                >
                  <h2
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "#ffac41",
                      margin: "5% 0",
                    }}
                    className="NameInv"
                  >
                    Инвентарь
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginLeft: "30px",
                    }}
                  >
                    {inventory && (
                      <>
                        {inventory.map((card) => (
                          <CardInvet key={card.id} card={card} />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
