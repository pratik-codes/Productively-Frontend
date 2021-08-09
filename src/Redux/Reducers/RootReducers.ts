import { combineReducers } from "redux";
import { getPrioritiesReducers } from "./priorityReducers";
import { getRemaindersReducers } from "./remainderReducers";
import { getTaskListGroupReducers } from "./taskReducers";
import { userLoginReducer, userRegisterReducer } from "./userReducers";

const RootReducer = combineReducers({
  userInfo: userLoginReducer,
  userRegister: userRegisterReducer,
  remainders: getRemaindersReducers,
  priorities: getPrioritiesReducers,
  taskListGroups: getTaskListGroupReducers,
});

export default RootReducer;
