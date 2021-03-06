import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useToasts } from "react-toast-notifications";
import {
  DatePickerComponent,
  DateTimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import RemainderComponent from "./RemainderComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../Redux/Store";
import {
  addRemainder,
  getRemainders,
  multipleDeleteRemainder,
} from "../../Redux/Actions/RemainderActions";
import {
  addRemaindersReducers,
  remainderData,
  RemainderData,
} from "../../Redux/Reducers/remainderReducers";
import { RemainderReduxState } from "../../Interfaces/Interfaces";
import loader from "../loader";
import Loader from "../loader";

import { gsap, TimelineLite, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Remainder = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [remainderTitle, setRemaindertitle] = useState("");
  const [remainderDescription, setRemainderDescription] = useState("");
  const [remainderDate, setRemainderDate] = useState();
  const [multipleDelete, setMultipleDelete] = useState(false);
  const [cardsToDelete, setCardsToDelete] = useState<string[]>([]);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeDeleteModal() {
    setDeleteIsOpen(false);
  }

  function openDeleteModal() {
    setDeleteIsOpen(true);
  }

  let t1 = new TimelineLite({ delay: 0.3 });

  useEffect(() => {
    t1.staggerFrom(
      ".animateRemainder",
      1,
      { y: 30, ease: Power3.easeOut, opacity: 0 },
      0.15
    );
  }, [t1]);

  const Remainders: RemainderReduxState = useSelector(
    (state: RootStore) => state.remainders
  );

  const addRemainderHandler = async () => {
    if (!remainderDescription || !remainderTitle || !remainderDate) {
      addToast("Title, description or date cant be empty.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      await dispatch(
        addRemainder(remainderTitle, remainderDescription, remainderDate)
      );
      addToast("remainder added successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(getRemainders());
      setRemaindertitle("");
      setRemainderDescription("");
    }
  };

  const addCardsToAddOrDelete = (id: string, add: boolean) => {
    if (add === true) cardsToDelete.push(id);
    else {
      var idIndex = cardsToDelete.indexOf(id);
      cardsToDelete.splice(idIndex, 1);
    }
    console.log(cardsToDelete);
  };

  const multipleDeleteHandler = async (remainderIds: string[]) => {
    if (remainderIds.length === 0) {
      addToast("No cards selected to delete.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      await dispatch(multipleDeleteRemainder(remainderIds));
      addToast("Reminders deleted successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      setCardsToDelete([]);
      dispatch(getRemainders());
    }
  };

  useEffect(() => {
    if (!Remainders.data) dispatch(getRemainders());
  }, []);

  return (
    <div className="rounded-2xl h-full overflow-y-auto ">
      <div>
        <br />
        <div className="flex justify-between mb-2">
          <div className="2xl:flex xl:flex l:flex md:flex justify-start">
            <span className="text-xl 2xl:text-2xl xl:text-2xl l:text-2xl md:text-2xl font-sans font-bold text-yellow-700 ml-4 mb-4">
              Reminder Timeline{" "}
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 mt-1 mx-2 text-yellow-700 ml-4 2xl:ml-2 xl:ml-2 l:ml-2 md:ml-2 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
          </div>
          <div className="flex">
            <button
              onClick={openModal}
              className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
            {multipleDelete ? (
              <div className="flex">
                <button
                  onClick={() => {
                    openDeleteModal();
                  }}
                  className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setMultipleDelete(false);
                    setCardsToDelete([]);
                  }}
                  className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex">
                <button
                  onClick={() => {
                    setMultipleDelete(!multipleDelete);
                  }}
                  className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        {/* search component */}
        <div
          className="flex items-center w-5/6 mx-auto bg-white rounded-md shadow-md mt-4"
          x-data="{ search: '' }"
        >
          <div className="w-full">
            <input
              type="search"
              className="w-full px-4 py-1 text-gray-900 rounded-md focus:outline-none"
              placeholder="search"
              x-model="search"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className={`flex items-center justify-center w-12 h-12 text-gray-100 rounded-md ${
                searchInput.length > 0 ? "bg-purple-500" : "bg-gray-500"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
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
                    Add Remainder
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      maxLength={50}
                      value={remainderTitle}
                      onChange={(e) => setRemaindertitle(e.target.value)}
                      placeholder="Remainder Title"
                      className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    />
                    <div className="flex justify-end">
                      <p style={{ fontSize: "0.8rem" }}>
                        {remainderTitle.length}/50
                      </p>
                    </div>
                    <input
                      type="text"
                      placeholder="Description"
                      maxLength={150}
                      onChange={(e) => setRemainderDescription(e.target.value)}
                      value={remainderDescription}
                      className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    />
                    <div className="flex justify-end">
                      <p style={{ fontSize: "0.8rem" }}>
                        {remainderDescription.length}/150
                      </p>
                    </div>
                    <div className="w-full">
                      <DateTimePickerComponent
                        id="datepicker"
                        placeholder="Select Date"
                        onChange={(e: any) => setRemainderDate(e.target.value)}
                        min={new Date()}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => {
                        addRemainderHandler();
                        closeModal();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

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
                    Delete Multiple Remainder
                  </Dialog.Title>
                  <div className="mt-2">
                    <Dialog.Description>
                      Are you sure you want to delete all the reminders?
                    </Dialog.Description>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => {
                        closeDeleteModal();
                        multipleDeleteHandler(cardsToDelete);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className=" inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => {
                        closeDeleteModal();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        <br></br>
        <div className="flex justify-between mb-2">
          <div className="flex">
            <span className="text-2xl font-sans  text-black ml-4 mb-4 font-bold">
              Upcoming
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mt-1 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                />
              </svg>
            </span>
          </div>
          <br />
        </div>
        <div className="w-full grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 gap-2 ">
          {!Remainders.data ? (
            <Loader />
          ) : Remainders.data.Upcoming.length === 0 ? (
            <div style={{ marginBottom: "2rem" }}>
              <br />
              <h1 className="text-l ml-5 ">No upcoming reminders</h1>
              <br />
            </div>
          ) : (
            Remainders.data.Upcoming.filter((value) => {
              if (searchInput === "") {
                return value;
              } else if (
                value.remainderName
                  .toLocaleLowerCase()
                  .includes(searchInput.toLocaleLowerCase()) ||
                value.remainderDescription
                  .toLocaleLowerCase()
                  .includes(searchInput.toLocaleLowerCase())
              ) {
                return value;
              }
            }).map((remainder: remainderData) => {
              return (
                <div style={{ marginBottom: "2rem" }}>
                  <RemainderComponent
                    id={remainder._id}
                    title={remainder.remainderName}
                    description={remainder.remainderDescription}
                    date={remainder.remainderDate}
                    multipleDelete={multipleDelete}
                    addMultipleDelete={() =>
                      addCardsToAddOrDelete(remainder._id, true)
                    }
                    removeMultipleDelete={() =>
                      addCardsToAddOrDelete(remainder._id, false)
                    }
                  />
                </div>
              );
            })
          )}
        </div>
        <br></br>
        <br></br>
        <div className="mb-2">
          <div className="flex">
            <span className="text-2xl font-sans text-black ml-4 mb-4 font-bold">
              Past
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 mt-1 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                />
              </svg>
            </span>
          </div>
          <br />

          <div className="w-full grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 gap-2 ">
            {!Remainders.data ? (
              <Loader />
            ) : Remainders.data.Past.length === 0 ? (
              <div className="">
                <br />
                <h1 className="text-l ml-5 ">No past reminders</h1>
                <br />
              </div>
            ) : (
              Remainders.data.Past.filter((value) => {
                if (searchInput === "") {
                  return value;
                } else if (
                  value.remainderName
                    .toLocaleLowerCase()
                    .includes(searchInput.toLocaleLowerCase()) ||
                  value.remainderDescription
                    .toLocaleLowerCase()
                    .includes(searchInput.toLocaleLowerCase())
                ) {
                  return value;
                }
              }).map((remainder: remainderData) => {
                return (
                  <div style={{ marginBottom: "2rem" }}>
                    <RemainderComponent
                      id={remainder._id}
                      title={remainder.remainderName}
                      description={remainder.remainderDescription}
                      date={remainder.remainderDate}
                      multipleDelete={multipleDelete}
                      addMultipleDelete={() =>
                        addCardsToAddOrDelete(remainder._id, true)
                      }
                      removeMultipleDelete={() =>
                        addCardsToAddOrDelete(remainder._id, false)
                      }
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Remainder;
