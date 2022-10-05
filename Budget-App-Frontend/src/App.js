import React from "react";
import "./App.css";
import History from "./components/History";
import Navigationbar from "./components/Navigationbar";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import AddAccount from "./components/AddAccount";
import AddCategory from "./components/AddCategory";
import PrivateRoute from "./components/PrivateRoute";
import ExpInc from "./components/ExpInc";
import CreateTransfer from "./components/CreateTransfer";

function App() {
  return (
    <div className="App">
      <Navigationbar />
      <Routes>
        <Route path="/" element={<PrivateRoute children={<Home />} />} />
        <Route
          path="history"
          element={<PrivateRoute children={<History />} />}
        />
        <Route
          path="addAccount"
          element={<PrivateRoute children={<AddAccount />} />}
        />
        <Route
          path="addCategory"
          element={<PrivateRoute children={<AddCategory />} />}
        />
        <Route
          path="createTransaction"
          element={<PrivateRoute children={<ExpInc />} />}
        />
        <Route
          path="createTransfer"
          element={<PrivateRoute children={<CreateTransfer />} />}
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
