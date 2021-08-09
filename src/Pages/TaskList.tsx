import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Loader from "../Components/loader";
import TaskGroupCard from "../Components/TaskList/TaskGroupCard";
import TaskListView, {
  TaskListViewProps,
} from "../Components/TaskList/TaskListView";
import { TaskGroup, TaskListReduxState } from "../Interfaces/Interfaces";
import { getTaskList } from "../Redux/Actions/taskActions";
import { RootStore } from "../Redux/Store";

const TaskList = () => {
  const [taskListIsOpen, setTaskListIsOpen] = useState("");
  const [taskListData, setTaskListData] = useState<any>();

  const TaskListGroups: TaskListReduxState = useSelector(
    (state: RootStore) => state.taskListGroups
  );

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    dispatch(getTaskList());
    console.log(TaskListGroups);
  }, []);
  useEffect(() => {
    console.log(TaskListGroups);
  }, []);

  useEffect(() => {
    if (taskListIsOpen !== "") {
      const groupId = taskListIsOpen;

      const groupdata = TaskListGroups.data.find(
        (task) => task.taskGroupId === groupId
      );

      const stateData = {
        GroupId: groupdata?.taskGroupId,
        GroupName: groupdata?.taskGroupName,
        GroupDescription: groupdata?.taskGroupDescription,
        Pending: groupdata?.tasks.Pending,
        Done: groupdata?.tasks.Done,
        Back: () => setTaskListIsOpen(""),
      };
      setTaskListData(stateData);
    }
  }, [taskListIsOpen]);

  return (
    <div className="h-full overflow-y-auto">
      {taskListIsOpen !== "" && (
        <TaskListView
          GroupId={taskListData?.GroupId}
          GroupName={taskListData?.GroupName}
          GroupDescription={taskListData?.GroupDescription}
          Pending={taskListData?.Pending}
          Done={taskListData?.Done}
          Back={() => setTaskListIsOpen("")}
        />
      )}
      {taskListIsOpen === "" && (
        <div>
          <div className="flex justify-between w-5/6 mx-auto pt-10 mt-10">
            <h1 className="text-2xl font-sans font-bold text-purple-700 ml-4 mb-4">
              Task Groups 📝
            </h1>
            <button className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500">
              New
            </button>
          </div>
          <div className="p-10 h-full w-full grid grid-cols-3 gap-2  overflow-y-auto">
            {!TaskListGroups.data ? (
              <Loader />
            ) : (
              TaskListGroups.data.map((taskGroup) => {
                return (
                  <div>
                    <TaskGroupCard
                      title={taskGroup.taskGroupName}
                      description={taskGroup.taskGroupDescription}
                      color="#B095F6"
                      Open={() => setTaskListIsOpen(taskGroup.taskGroupId)}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
