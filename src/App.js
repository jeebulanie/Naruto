import React from "react";
import MainRoutes from "./routing/MainRoutes";
import Navbar from "./components/ui/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Navbar />
      <MainRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
