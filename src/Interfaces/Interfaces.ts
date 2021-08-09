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

// task list section

export interface TaskListReduxState {
  loading: boolean;
  data: TaskGroup[];
}
export interface TaskGroup {
  taskGroupId: string;
  taskGroupName: string;
  taskGroupDescription: string;
  tasks: { Pending: Task[]; Done: Task[] };
}

export interface Task {
  taskId: string;
  taskName: string;
  taskDescription: string;
  taskStatus: string;
}
