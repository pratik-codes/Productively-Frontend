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
  tasks: { Pending: Task[]; done: Task[] };
}

export interface Task {
  taskId: string;
  taskName: string;
  taskDescription: string;
  taskStatus: string;
}

// flashcard section
export interface flashcardGroupReduxState {
  loading: string;
  data: flashcardGroups[];
}

export interface flashcardGroups {
  flashcard: flashcard[];
  _id: string;
  user: string;
  groupName: string;
  groupDescription: string;
}

export interface flashcard {
  flashcardId: string;
  flashcardName: string;
  flashcardDescription: string;
  data: string;
}

// journal section

export interface JournalReduxState {
  loading: string;
  data: JournalGroup[];
}
export interface JournalGroup {
  _id: string;
  user: string;
  groupName: string;
  groupDescription: string;
  Journals: Journal[];
}
export interface Journal {
  journalId: string;
  journalName: string;
  journalDescription: string;
  journalDate: string;
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
}
