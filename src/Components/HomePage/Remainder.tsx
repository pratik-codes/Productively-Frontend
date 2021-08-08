import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useToasts } from "react-toast-notifications";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import RemainderComponent from "./RemainderComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../Redux/Store";
import {
  addRemainder,
  getRemainders,
} from "../../Redux/Actions/RemainderActions";
import {
  addRemaindersReducers,
  remainderData,
  RemainderData,
} from "../../Redux/Reducers/remainderReducers";
import { RemainderReduxState } from "../../Interfaces/Interfaces";
import loader from "../loader";
import Loader from "../loader";

const Remainder = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [remainderTitle, setRemaindertitle] = useState("");
  const [remainderDescription, setRemainderDescription] = useState("");
  const [remainderDate, setRemainderDate] = useState();

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
      dispatch(
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

  useEffect(() => {
    dispatch(getRemainders());
  }, []);

  return (
    <div className="rounded-2xl h-full overflow-y-auto">
      <div>
        <br />
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-sans font-bold text-yellow-700 ml-4 mb-4">
            Remainder Timeline ⏰
          </h1>
          <button
            onClick={openModal}
            className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4"
          >
            New
          </button>
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
                      <DatePickerComponent
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
        <br></br>
        <br></br>
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-sans font-bold text-black ml-4 mb-4">
            Upcoming ⏭️
          </h1>
          <br />
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          {!Remainders.data ? (
            <Loader />
          ) : Remainders.data.Upcoming.length === 0 ? (
            <div className="">
              <br />
              <h1 className="text-l ml-5 font-bold">No upcoming remainders</h1>
              <br />
            </div>
          ) : (
            Remainders.data.Upcoming.map((remainder: remainderData) => {
              return (
                <div style={{ marginBottom: "2rem" }}>
                  <RemainderComponent
                    id={remainder._id}
                    title={remainder.remainderName}
                    description={remainder.remainderDescription}
                    date={remainder.remainderDate}
                  />
                </div>
              );
            })
          )}
        </div>
        <br></br>
        <br></br>
        <div className="mb-2">
          <h1 className="text-2xl font-sans font-bold text-black ml-4 mb-4">
            Past 🔙
          </h1>
          <br />

          <div className="w-full grid grid-cols-2 gap-4">
            {!Remainders.data ? (
              <Loader />
            ) : Remainders.data.Past.length === 0 ? (
              <div className="">
                <br />
                <h1 className="text-l ml-5 font-bold">No past remainders</h1>
                <br />
              </div>
            ) : (
              Remainders.data.Past.map((remainder: remainderData) => {
                return (
                  <div>
                    <RemainderComponent
                      id={remainder._id}
                      title={remainder.remainderName}
                      description={remainder.remainderDescription}
                      date={remainder.remainderDate}
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
