import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import deleteIcon from "../../Assets/icons/Delete.png";

export interface flashCardData {
  flashCardId: string;
  flashCardTitle: string;
  flashCardDescription: string;
}

interface flashCardProps {
  color: string;
  flashCard: flashCardData;
}

const FlashCard: React.FC<flashCardProps> = ({ color, flashCard }) => {
  const [FrontIsShowing, setFrontIsShowing] = useState(true);
  const [BackIsShowing, setBackIsShowing] = useState(false);
  const [FlashCardTitle, setFlashCardTitle] = useState("");
  const [FlashCardDescription, setFlashCardDescription] = useState("");
  let [editIsOpen, setEditIsOpen] = useState(false);
  let [deleteIsOpen, setDeleteIsOpen] = useState(false);

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

  return (
    <>
      <div className="maincontainer">
        <div className="card">
          <Transition
            // as={Fragment}
            show={FrontIsShowing}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 rotate-[-120deg] scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div className="front ">
              <div className="w-6/6 h-full mx-auto">
                <div
                  style={{ background: `${color}` }}
                  className="rounded-2xl p-2 m-3"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setBackIsShowing(true);
                      setFrontIsShowing(false);
                    }}
                  >
                    <h1 className="ml-4 pt-3 mb-4 font-sans text-black text-2xl font-bold">
                      {flashCard.flashCardTitle}
                    </h1>
                    <h1 className="ml-4 mb-4 font-sans text-black text-l font-medium">
                      {flashCard.flashCardDescription}
                    </h1>
                  </div>
                  <br></br>
                  <div className="flex justify-end">
                    <div className="flex">
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
                                    Are you sure you want to delete this
                                    remainder?
                                  </Dialog.Description>
                                </div>
                                <div
                                  className="mt-4"
                                  onClick={closeDeleteModal}
                                >
                                  <button
                                    type="button"
                                    className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={closeDeleteModal}
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
          </Transition>
          <Transition
            // as={Fragment}
            show={BackIsShowing}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 rotate-[-120deg] scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div className="back cursor-pointer">
              <div className="w-6/6 h-full mx-auto">
                <div
                  style={{ background: `${color}` }}
                  className="rounded-2xl p-2 m-3 p-5"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setBackIsShowing(false);
                      setFrontIsShowing(true);
                    }}
                  >
                    <h1 className="pt-3 mb-2 font-sans text-black text-2xl font-bold">
                      {flashCard.flashCardTitle}
                    </h1>
                    <p className="font-bold text-black pt-10">Answer</p>
                  </div>
                  <textarea
                    className=" p-2 mt-2 border-2  border-transparent placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 outline-none focus:outline-none focus:ring ring-pink-900 w-full"
                    rows={10}
                    // onChange={(e) => setAnswer4(e.target.value)}
                    placeholder="Enter Answer."
                    style={{ background: "#ffd3f2" }}
                    // value={Answer4}
                  />
                  <button
                    type="button"
                    className=" inline-flex justify-center px-4 py-2 text-sm font-medium text-pink-900 bg-pink-100 border border-transparent rounded-md hover:bg-pink-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500"
                    onClick={closeDeleteModal}
                  >
                    edit
                  </button>
                </div>
              </div>
            </div>{" "}
          </Transition>
        </div>
      </div>
    </>
  );
};

export default FlashCard;