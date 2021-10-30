import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import NavBar from "./Components/Navbar/NavBar";
import Homepage, { homepageProps } from "./Pages/Homepage/Homepage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./styles/index.css";
import "./styles/App.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import HomePage from "./Components/HomePage/HomePage";
import ForgotPassword from "./Pages/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import {
  showNavBarAction,
  showSidebarAction,
} from "./Redux/Actions/userActions";
import { RootStore } from "./Redux/Store";
import { showNavBarReduxState } from "./Interfaces/Interfaces";
import TaskList from "./Pages/Homepage/TaskList";
import TaskListView from "./Components/TaskList/TaskListView";

const App = () => {
  const [login, setLogin] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [sidebar, setSidebar] = useState(true);

  const dispatch = useDispatch();

  const showNavbarRedux: showNavBarReduxState = useSelector(
    (state: RootStore) => state.showNavbar
  );

  const showHideNavbarHandler = (value: boolean) => {
    setShowNavbar(value);
    dispatch(showNavBarAction(value));
  };
  const showSidebarHandler = (value: boolean) => {
    setSidebar(value);
    dispatch(showSidebarAction(value));
  };

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
        <div
          style={{ height: "2rem" }}
          className="absolute bottom-0 2xl:top-0 xl:top-0 l:top-0 md:top-0 right-0 mx-1 my-2"
        >
          <button
            type="button"
            className="invisible 2xl:visible xl:visible l:visible md:visible mr-3 inline-flex justify-center px-2 py-1 text-sm font-medium text-purple-900 bg-purple-100 border border-transparent rounded-2xl hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
            onClick={() => {
              showSidebarHandler(!sidebar);
            }}
          >
            {sidebar === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}

            <span className="font-bold ml-2">sidebar</span>
          </button>
          <button
            type="button"
            className=" mr-3 inline-flex justify-center px-2 py-1 text-sm font-medium text-purple-900 bg-purple-100 border border-transparent rounded-2xl hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
            onClick={() => {
              showHideNavbarHandler(!showNavbar);
            }}
          >
            {showNavbar === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}

            <span className="font-bold ml-1">navbar</span>
          </button>
        </div>

        <div className={`${showNavbarRedux.show === true ? "none" : "hidden"}`}>
          <NavBar />
        </div>

        <Switch>
          {/* non protectedRoute */}
          <Route path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />

          {/* protectedRoute */}
          <ProtectedRoute
            loggedIn={login}
            path="/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            loggedIn={login}
            path="/:section"
            component={Homepage}
          />
          <ProtectedRoute
            loggedIn={login}
            path="/tasklist/:groupId"
            component={TaskListView}
          />
        </Switch>
      </ToastProvider>
    </BrowserRouter>
  );
};
export default App;
