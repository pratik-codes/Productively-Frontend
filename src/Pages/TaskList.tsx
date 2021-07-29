import React, { useEffect, useState } from "react";
import TaskGroupCard from "../Components/TaskList/TaskGroupCard";
import TaskListView, {
  TaskListViewProps,
} from "../Components/TaskList/TaskListView";

const TaskList = () => {
  const [taskListIsOpen, setTaskListIsOpen] = useState("");
  const [taskListData, setTaskListData] = useState<
    TaskListViewProps | undefined
  >();
  const [TaskGroupData, setTaskGroupData] = useState([
    {
      GroupId: "1",
      title: "Demo title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint coaxime mollitia,molestiae quas vel sint ",
      tasks: {
        Pending: [
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "PENDING",
          },
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "PENDING",
          },
        ],
        Done: [
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "DONE",
          },
        ],
      },
    },
    {
      GroupId: "2",
      title: "Demo title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint coaxime mollitia,molestiae quas vel sint ",
      tasks: {
        Pending: [
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "PENDING",
          },
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "PENDING",
          },
        ],
        Done: [
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "DONE",
          },
        ],
      },
    },
    {
      GroupId: "3",
      title: "Demo title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint coaxime mollitia,molestiae quas vel sint ",
      tasks: {
        Pending: [
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "PENDING",
          },
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "PENDING",
          },
        ],
        Done: [
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "DONE",
          },
        ],
      },
    },
    {
      GroupId: "4",
      title: "Demo title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint coaxime mollitia,molestiae quas vel sint ",
      tasks: {
        Pending: [
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "PENDING",
          },
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "PENDING",
          },
        ],
        Done: [
          {
            taskTitle: "Demo Title",
            Description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,mol",
            Status: "DONE",
          },
        ],
      },
    },
  ]);

  useEffect(() => {
    const groupId = taskListIsOpen;

    const groupdata = TaskGroupData.find((task) => task.GroupId === groupId);

    const stateData = {
      GroupId: groupdata?.GroupId,
      GroupName: groupdata?.title,
      GroupDescription: groupdata?.description,
      Pending: groupdata?.tasks.Pending,
      Done: groupdata?.tasks.Done,
      Back: () => setTaskListIsOpen(""),
    };
    setTaskListData(stateData);
  });

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
            {TaskGroupData.map((taskGroup) => {
              return (
                <div>
                  <TaskGroupCard
                    title={taskGroup.title}
                    description={taskGroup.description}
                    color="#B095F6"
                    Open={() => setTaskListIsOpen(taskGroup.GroupId)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
