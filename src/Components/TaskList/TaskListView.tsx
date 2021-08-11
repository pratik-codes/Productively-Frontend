import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Task } from "../../Interfaces/Interfaces";
import { addTask, getTaskList } from "../../Redux/Actions/taskActions";
import TaskCard from "./TaskCard";

export interface TaskListViewProps {
  GroupId: string | undefined;
  GroupName: string | undefined;
  GroupDescription: string | undefined;
  Pending: Task[] | undefined;
  Done: Task[] | undefined;
  Back: any;
}

interface TaskList {
  taskTitle: string;
  Description: string;
  Status: string;
}

const TaskListView: React.FC<TaskListViewProps | undefined> = ({
  GroupId,
  GroupName,
  GroupDescription,
  Pending,
  Done,
  Back,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const [TaskName, setTaskName] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");
  const [TaskStatus, setTaskStatus] = useState("");

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addTaskHandler = async () => {
    if (TaskName || TaskDescription) {
      console.log("running add");
      await dispatch(addTask(TaskName, TaskDescription, "PENDING", GroupId));
      dispatch(getTaskList());
      Back("");
      addToast("Task added successfully.", {
        appearance: "success",
        autoDismiss: true,
      });

      setTaskName("");
      setTaskDescription("");
    } else {
      console.log("aborting add");

      addToast("title and description and status are required.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  // useEffect(() => {
  //   setTaskName(GroupName);
  //   setTaskDescription(GroupDescription);
  // }, []);

  return (
    <>
      <div className="p-10 mx-auto pt-10 mt-10">
        <div className="flex justify-between">
          <div className="w-5/6">
            <h1 className="text-2xl font-sans font-bold text-blue-700 ml-4 mb-1">
              Task Group: {GroupName}
            </h1>
            <p className="text-xs font-sans w-3/6 text-black ml-4 mb-4">
              {GroupDescription}
            </p>
          </div>

          <button
            onClick={() => {
              openModal();
            }}
            className="bg-black text-white font-bold h-10 mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500"
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
                      Add Task
                    </Dialog.Title>
                    <div className="mt-2">
                      <input
                        type="text"
                        maxLength={50}
                        value={TaskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Task Title"
                        className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      />
                      <div className="flex justify-end">
                        <p style={{ fontSize: "0.8rem" }}>
                          {TaskName.length}/50
                        </p>
                      </div>
                      <input
                        type="text"
                        placeholder="Description"
                        maxLength={150}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        value={TaskDescription}
                        className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      />
                      <div className="flex justify-end">
                        <p style={{ fontSize: "0.8rem" }}>
                          {TaskDescription.length}/150
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                          closeModal();
                          addTaskHandler();
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
          <button
            onClick={() => Back("")}
            className="bg-black text-white font-bold h-10 mb-4 py-1 px-4 rounded mr-4 hover:bg-red-600 transition duration-500"
          >
            Back
          </button>
        </div>
      </div>
      <div className="p-10  mx-auto">
        <h1 className="text-2xl font-sans text-black ml-4 mb-4">
          Task Status: Pending ⌛
        </h1>
      </div>
      <div className="p-10 w-full grid grid-cols-4 gap-2  overflow-y-auto">
        {Pending && Pending.length === 0 ? (
          <div className="">
            <br />
            <h1 className="text-l ml-5 ">No pending tasks</h1>
            <br />
          </div>
        ) : (
          Pending?.map((task) => {
            return (
              <div>
                <TaskCard
                  groupId={GroupId}
                  taskId={task.taskId}
                  title={task.taskName}
                  description={task.taskDescription}
                  color="#DBEAFE"
                  back={Back}
                />
              </div>
            );
          })
        )}
      </div>
      <br />
      <div className="p-10  mx-auto">
        <h1 className="text-2xl font-sans text-black ml-4 mb-4">
          Task Status: Done ✅
        </h1>
      </div>
      <div className="p-10 w-full grid grid-cols-4 gap-2  overflow-y-auto">
        {Done && Done.length === 0 ? (
          <div className="">
            <br />
            <h1 className="text-l ml-5 ">No done tasks</h1>
            <br />
          </div>
        ) : (
          Done?.map((task) => {
            return (
              <div>
                <TaskCard
                  groupId={GroupId}
                  taskId={task.taskId}
                  title={task.taskName}
                  description={task.taskDescription}
                  color="#E6EE96"
                  back={Back}
                />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default TaskListView;
