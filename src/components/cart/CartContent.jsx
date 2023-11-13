import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/cart/cartSlice";
import {
  changeCountCardsInCart,
  cleanCart,
  createOrder,
  deleteCardFromCart,
} from "../../store/cart/cartActions";
import PaymentForm from "../ui/PaymentForm/PaymentForm";
import { useState } from "react";
import "./CartContent.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CardInvet from "../cards/CardInvent/CardInvet";

const CartContent = () => {
  const [modal, setModal] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <div className="cart-page">
      <div className="cart-container">
        {cart && (
          <>
            {cart.cards.length ? (
              <>
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Изображение</th>
                      <th>Цена (1 шт.)</th>
                      <th>Кол-во</th>
                      <th>Итого</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.cards.map((card) => (
                      <tr key={`cart${card.cardItem.id}`}>
                        <td className="cart-image">
                          <img
                            src={card.cardItem.image}
                            alt={card.cardItem.name}
                          />
                          <p>{card.cardItem.name}</p>
                        </td>
                        <td style={{ fontSize: "25px" }}>
                          {card.cardItem.price}両
                        </td>
                        <td>
                          <input
                            className="cart-input"
                            type="number"
                            value={card.count}
                            onChange={(e) => {
                              changeCountCardsInCart(
                                card.cardItem.id,
                                +e.target.value
                              );
                              dispatch(getCart());
                            }}
                          />
                        </td>
                        <td style={{ fontSize: "25px" }}>
                          {card.totalPrice}両
                        </td>
                        <td>
                          <button
                            className="cart-button"
                            onClick={() => {
                              deleteCardFromCart(card.cardItem.id);
                              dispatch(getCart());
                            }}
                          >
                            <DeleteOutlineIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h2
                  style={{
                    textAlign: "center",
                    marginTop: "15px",
                    fontSize: "30px",
                  }}
                >
                  Итого: {cart.totalCost}
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <button
                    className="cart-button"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    Заказать
                  </button>
                  <button
                    className="cart-button"
                    onClick={() => {
                      cleanCart();
                      dispatch(getCart());
                    }}
                  >
                    Очистить корзину
                  </button>
                </div>
              </>
            ) : (
              <span className="cart-empty-message">
                <h2>Корзина пуста</h2>
              </span>
            )}
          </>
        )}
        {modal && (
          <div className="modal-overlay">
            <div className="payment-form-container">
              <button
                className="modal-close-button"
                onClick={() => {
                  setModal(false);
                }}
              >
                &times;
              </button>
              <PaymentForm setModal={setModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartContent;
