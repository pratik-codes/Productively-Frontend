import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import edit from "../../Assets/icons/EditButton.png";
import deleteIcon from "../../Assets/icons/Delete.png";
import Done from "../../Assets/icons/Done.png";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { deleteTask } from "../../Redux/Actions/taskActions";

interface RemainderComponentProps {
  title: string;
  description: string;
  color: string;
  groupId: string | undefined;
  taskId: string;
}

const TaskCard: React.FC<RemainderComponentProps> = ({
  groupId,
  taskId,
  title,
  description,
  color,
}) => {
  const [taskGroupTitle, settaskGroupTitle] = useState("");
  const [taskGroupDescription, settaskGroupDescription] = useState("");
  let [editIsOpen, setEditIsOpen] = useState(false);
  let [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function closeEditModal() {
    setEditIsOpen(false);
  }

  function openEditModal() {
    setEditIsOpen(true);
  }
  function closeDeleteModal() {
    setDeleteIsOpen(false);
  }

  function openDeleteModal() {
    setDeleteIsOpen(true);
  }

  const editTaskHandler = async () => {
    if (taskGroupTitle || taskGroupDescription) {
      console.log("running add");
      // await dispatch(addTask(TaskName, TaskDescription, "PENDING", GroupId));
      // dispatch(getTaskList());
      addToast("Task added successfully.", {
        appearance: "success",
        autoDismiss: true,
      });

      settaskGroupTitle("");
      settaskGroupDescription("");
    } else {
      console.log("aborting add");

      addToast("title and description and status are required.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const deleteTaskHandler = async () => {
    await dispatch(deleteTask(groupId, taskId));
    addToast("deleted successfully.", {
      appearance: "error",
      autoDismiss: true,
    });
  };

  return (
    <div className="w-6/6 mx-auto">
      <div style={{ background: `${color}` }} className="rounded-2xl p-2 m-3">
        <h1 className="ml-4 pt-3 mb-4 font-sans text-gray-800 text-2xl font-bold">
          {title}
        </h1>
        <h1 className="ml-4 mb-4 font-sans text-gray-800 text-l font-medium">
          {description}
        </h1>
        <br></br>
        <div className="flex justify-between">
          <div className="flex justify-end">
            <div className="flex">
              {color === "#DBEAFE" && (
                <div
                  style={{ borderRadius: "100px" }}
                  onClick={() => console.log(Done)}
                  className="ml-2 flex items-center mr-1 w-10 h-10 cursor-pointer bg-black mt-3 hover:bg-green-600 transition duration-500"
                >
                  <img
                    className="flex justify-center align-middle mx-auto w-4 h-4 text-gray-700"
                    src={Done}
                    alt="Done"
                  />
                </div>
              )}

              <div
                style={{ borderRadius: "100px" }}
                onClick={() => setEditIsOpen(true)}
                className="ml-2 flex items-center mr-1 w-10 h-10 cursor-pointer bg-black mt-3 mr-3 hover:bg-yellow-600 transition duration-500"
              >
                <img
                  className="flex justify-center align-middle mx-auto w-4 h-4 text-gray-700"
                  src={edit}
                  alt="close"
                />
              </div>
              <Transition appear show={editIsOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="fixed inset-0 z-10 overflow-y-auto"
                  onClose={openEditModal}
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
                          Edit Task Group
                        </Dialog.Title>
                        <div className="mt-2">
                          <input
                            maxLength={50}
                            type="text"
                            placeholder="Remainder Title"
                            onChange={(e) => settaskGroupTitle(e.target.value)}
                            value={taskGroupTitle}
                            className="px-3 py-2 mt-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          />
                          <div className="flex justify-end">
                            <p style={{ fontSize: "0.8rem" }}>
                              {taskGroupTitle.length}/50
                            </p>
                          </div>
                          <input
                            type="text"
                            placeholder="Description"
                            maxLength={150}
                            onChange={(e) =>
                              settaskGroupDescription(e.target.value)
                            }
                            value={taskGroupDescription}
                            className="px-3 py-2 mt-3  border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          />
                          <div className="flex justify-end">
                            <p style={{ fontSize: "0.8rem" }}>
                              {taskGroupDescription.length}/150
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={closeEditModal}
                          >
                            Edit!
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={closeEditModal}
                          >
                            cancel
                          </button>
                        </div>
                      </div>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition>
              <div
                style={{ borderRadius: "100px" }}
                onClick={() => setDeleteIsOpen(true)}
                className="flex items-center mr-1 w-10 h-10 cursor-pointer bg-black mt-3 hover:bg-red-600 transition duration-500"
              >
                <img
                  className="flex justify-center align-middle mx-auto w-4 h-4 text-gray-700"
                  src={deleteIcon}
                  alt="close"
                />
              </div>
              <Transition appear show={deleteIsOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="fixed inset-0 z-10 overflow-y-auto"
                  onClose={openDeleteModal}
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
                          Delete Task Group
                        </Dialog.Title>
                        <div className="mt-2">
                          <Dialog.Description>
                            Are you sure you want to delete this remainder?
                          </Dialog.Description>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={() => {
                              closeDeleteModal();
                              deleteTaskHandler();
                            }}
                          >
                            delete
                          </button>
                          <button
                            type="button"
                            className=" inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={closeDeleteModal}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
