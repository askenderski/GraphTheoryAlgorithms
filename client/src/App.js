import React from "react";
import "./App.css";
import {Routes} from "./Data/Routes/routes";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Content routes={Routes}/>
      </BrowserRouter>
  );
}

export default App;