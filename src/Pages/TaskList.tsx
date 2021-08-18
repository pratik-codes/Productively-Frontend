import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Loader from "../Components/loader";
import TaskGroupCard from "../Components/TaskList/TaskGroupCard";
import TaskListView, {
  TaskListViewProps,
} from "../Components/TaskList/TaskListView";
import { TaskGroup, TaskListReduxState } from "../Interfaces/Interfaces";
import { addTaskGroup, getTaskList } from "../Redux/Actions/taskActions";
import { RootStore } from "../Redux/Store";

const TaskList = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [addGroupTitle, setaddGroupTitle] = useState("");
  const [addGroupDescription, setaddGroupDescription] = useState("");
  const [taskListIsOpen, setTaskListIsOpen] = useState("");
  const [taskListData, setTaskListData] = useState<any>();

  const TaskListGroups: TaskListReduxState = useSelector(
    (state: RootStore) => state.taskListGroups
  );

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addTaskGroupHandler = async () => {
    if (addGroupDescription || addGroupTitle) {
      await dispatch(addTaskGroup(addGroupTitle, addGroupDescription));
      addToast("Task group added successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(getTaskList());
      setaddGroupTitle("");
      setaddGroupDescription("");
    } else {
      addToast("title and description are required.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (!TaskListGroups.data) dispatch(getTaskList());
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
          // Back={() => setTaskListIsOpen("")}
          Back={setTaskListIsOpen}
        />
      )}
      {taskListIsOpen === "" && (
        <div>
          <div className="flex justify-between w-5/6 mx-auto pt-10 mt-10">
            <h1 className="text-2xl font-sans font-bold text-purple-700 ml-4 mb-4">
              Task Groups 📝
            </h1>
            <button
              onClick={openModal}
              className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500"
            >
              New
            </button>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={openModal}
              >
                <div className=" px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Add TaskList Group
                      </Dialog.Title>
                      <div className="mt-2">
                        <input
                          type="text"
                          maxLength={50}
                          value={addGroupTitle}
                          onChange={(e) => setaddGroupTitle(e.target.value)}
                          placeholder="Group Title"
                          className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        />
                        <div className="flex justify-end">
                          <p style={{ fontSize: "0.8rem" }}>
                            {addGroupTitle.length}/50
                          </p>
                        </div>
                        <input
                          type="text"
                          placeholder="Description"
                          maxLength={150}
                          onChange={(e) =>
                            setaddGroupDescription(e.target.value)
                          }
                          value={addGroupDescription}
                          className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        />
                        <div className="flex justify-end">
                          <p style={{ fontSize: "0.8rem" }}>
                            {addGroupDescription.length}/150
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={() => {
                            closeModal();
                            addTaskGroupHandler();
                          }}
                        >
                          add!
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={closeModal}
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
          <div className="p-10 h-full w-full grid grid-cols-3 gap-2  overflow-y-auto">
            {!TaskListGroups.data ? (
              <Loader />
            ) : TaskListGroups.data.length === 0 ? (
              <div className="">
                <br />
                <h1 className="text-l ml-10 ">No taskgroups</h1>
                <br />
              </div>
            ) : (
              TaskListGroups.data.map((taskGroup) => {
                return (
                  <div style={{ marginBottom: "2rem" }}>
                    <TaskGroupCard
                      id={taskGroup.taskGroupId}
                      title={taskGroup.taskGroupName}
                      description={taskGroup.taskGroupDescription}
                      color="#B095F6"
                      Open={() => setTaskListIsOpen(taskGroup.taskGroupId)}
                      type="Tasks"
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
