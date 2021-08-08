import {
  PrioritiesData,
  PriorityData,
} from "../Redux/Reducers/priorityReducers";
import { RemainderData } from "../Redux/Reducers/remainderReducers";

export interface UserInterface {
  id: string;
  username: string;
  isAdmin: boolean;
}

export interface RemainderReduxState {
  loading: string;
  data: RemainderData;
}

export interface PrioritiesReduxState {
  loading: string;
  data: PriorityData[];
}
