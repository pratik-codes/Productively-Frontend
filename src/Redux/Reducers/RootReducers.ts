import { combineReducers } from "redux";
import { getPrioritiesReducers } from "./priorityReducers";
import { getRemaindersReducers } from "./remainderReducers";
import { userLoginReducer, userRegisterReducer } from "./userReducers";

const RootReducer = combineReducers({
  userInfo: userLoginReducer,
  userRegister: userRegisterReducer,
  remainders: getRemaindersReducers,
  priorities: getPrioritiesReducers,
});

export default RootReducer;
