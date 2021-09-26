import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import NavBar from "./Components/NavBar";
import Homepage, { homepageProps } from "./Pages/Homepage/Homepage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./styles/index.css";
import "./styles/App.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import HomePage from "./Components/HomePage/HomePage";

const App = () => {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <ToastProvider>
        <NavBar />
        <Switch>
          <ProtectedRoute
            loggedIn={login}
            path="/"
            activeView="Homepage"
            exact
            component={Homepage}
          />
          <ProtectedRoute
            loggedIn={login}
            path="/tasklists"
            activeView="Task List"
            component={Homepage}
          />
          <ProtectedRoute
            loggedIn={login}
            path="/flashcards"
            activeView="Flash Cards"
            component={Homepage}
          />
          <ProtectedRoute
            loggedIn={login}
            path="/Journaling"
            activeView="Journaling"
            component={Homepage}
          />
          <ProtectedRoute
            loggedIn={login}
            path="/dashboard"
            exact
            component={Dashboard}
          />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </ToastProvider>
    </BrowserRouter>
  );
};
export default App;
