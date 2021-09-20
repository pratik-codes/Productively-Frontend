import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import edit from "../../Assets/icons/EditButton.png";
import deleteIcon from "../../Assets/icons/Delete.png";
import Done from "../../Assets/icons/Done.png";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  deleteJournal,
  deleteJournalGroup,
  getJournalGroupList,
} from "../../Redux/Actions/JournalActions";

interface JournalingComponentProps {
  color: string;
  journalGroupId: string;
  journals: journal | undefined;
  selectJournal: any;
  back: any;
  multipleDelete: boolean;
  addMultipleDelete: any;
  removeMultipleDelete: any;
}
export interface journal {
  journalId: string;
  journalName: string;
  journalDescription: string;
  journalDate: string;
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
}

const JournalCard: React.FC<JournalingComponentProps> = ({
  color,
  journalGroupId,
  journals,
  selectJournal,
  back,
  multipleDelete,
  addMultipleDelete,
  removeMultipleDelete,
}) => {
  const [taskGroupTitle, settaskGroupTitle] = useState("");
  const [taskGroupDescription, settaskGroupDescription] = useState("");
  let [editIsOpen, setEditIsOpen] = useState(false);
  let [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [checkBoxIsChecked, setCheckBoxIsChecked] = useState<Boolean>(true);

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

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const deleteJournalcardHandler = async () => {
    await dispatch(deleteJournal(journalGroupId, journals?.journalId));
    addToast("flashcard deleted successfully.", {
      appearance: "error",
      autoDismiss: true,
    });
    dispatch(getJournalGroupList());
    back("");
  };

  const checkBoxHandler = () => {
    if (checkBoxIsChecked) {
      addMultipleDelete();
    }
    if (!checkBoxIsChecked) {
      removeMultipleDelete();
    }
  };

  return (
    <div className="w-6/6 mx-auto h-full">
      <div
        style={{ background: `${color}` }}
        className="rounded-2xl p-2 m-3 flex flex-col justify-between break-words h-full"
      >
        <div className="div flex justify-between">
          <div>
            <h1 className="ml-4 pt-3 mb-4 font-sans text-black text-2xl font-bold">
              {journals?.journalName}
            </h1>
            <h1 className="ml-4 mb-4 font-sans text-black text-l font-medium">
              {journals?.journalDescription}
            </h1>
            <h1 className="ml-4 mb-4 font-sans text-black text-l font-medium">
              {journals?.journalDate.toString().split("T")[0]}
            </h1>
          </div>
          <div>
            {multipleDelete ? (
              <div>
                <input
                  type="checkbox"
                  onChange={() => {
                    checkBoxHandler();
                    setCheckBoxIsChecked(!checkBoxIsChecked);
                  }}
                  className="mt-2 mr-2 "
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>

        <br></br>
        <div className="flex justify-between">
          <div>
            <button
              onClick={selectJournal}
              className="bg-black text-white font-bold mt-4 py-1 px-4 rounded ml-2 hover:bg-gray-700 transition duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </button>
          </div>
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
                          Are you sure you want to delete this remainder?
                        </Dialog.Description>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={() => {
                            closeDeleteModal();
                            deleteJournalcardHandler();
                          }}
                        >
                          delete
                        </button>
                        <button
                          type="button"
                          className=" inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={closeDeleteModal}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
