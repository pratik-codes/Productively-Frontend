import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TodoCardComponent from "./TodoCardComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../Redux/Store";
import { addPriority, getPriority } from "../../Redux/Actions/priorityActions";
import { useToasts } from "react-toast-notifications";
import { PrioritiesReduxState } from "../../Interfaces/Interfaces";
import {
  addPriorityReducers,
  PriorityData,
} from "../../Redux/Reducers/priorityReducers";
import Loader from "../loader";

const TodoCard: React.FC = () => {
  const [addPriorities, setAddPriorities] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const Priorities: PrioritiesReduxState = useSelector(
    (state: RootStore) => state.priorities
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (!Priorities.data) dispatch(getPriority());
  }, []);

  const addPriorityHandler = async () => {
    if (addPriorities) {
      await dispatch(addPriority(addPriorities));
      addToast("priority added successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(getPriority());
    } else {
      addToast("Priority cant be empty.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className=" h-6/6 m-5   ">
        <br />
        <div className="flex justify-between">
          <h1 className="text-2xl font-sans font-bold text-blue-800 ml-4 mb-4">
            Today's Priorities 🌟
          </h1>
          <button
            onClick={openModal}
            className="bg-black text-white font-bold mb-4 py-1 px-4 rounded"
          >
            New
          </button>
        </div>
        <div className="m-4">
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
                      Add Priority
                    </Dialog.Title>
                    <div className="mt-2">
                      <input
                        type="text"
                        maxLength={50}
                        placeholder="Priority Description"
                        onChange={(e) => setAddPriorities(e.target.value)}
                        className="px-3 py-2  my-3 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      />
                    </div>
                    <div className="flex justify-end">
                      <p style={{ fontSize: "0.8rem" }}>
                        {addPriorities.length}/50
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                          closeModal();
                          addPriorityHandler();
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
          {!Priorities.data ? (
            <Loader />
          ) : Priorities.data.length === 0 ? (
            <div className="">
              <br />
              <h1 className="text-l ml-5 font-bold">No priorities</h1>
              <br />
            </div>
          ) : (
            Priorities.data.map((task: PriorityData) => {
              return (
                <div>
                  <TodoCardComponent id={task._id} task={task.priority} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
