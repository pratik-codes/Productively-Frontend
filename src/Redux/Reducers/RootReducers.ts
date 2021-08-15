import { combineReducers } from "redux";
import { getFlashcardGroupReducers } from "./flashcardReducers";
import { getJournalReducers } from "./journalReducers";
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
  flashcardGroups: getFlashcardGroupReducers,
  journalGroups: getJournalReducers,
});

export default RootReducer;
