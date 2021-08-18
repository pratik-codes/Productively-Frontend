import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import JournalCard, { journal } from "../Components/Journaling/JournalCards";
import JournalList from "../Components/Journaling/JournalList";
import Loader from "../Components/loader";
import TaskGroupCard from "../Components/TaskList/TaskGroupCard";
import TaskListView, {
  TaskListViewProps,
} from "../Components/TaskList/TaskListView";
import { JournalReduxState } from "../Interfaces/Interfaces";
import { JournalingGroupData } from "../MockData/JournalingData";
import {
  addJournalGroup,
  getJournalGroupList,
} from "../Redux/Actions/JournalActions";
import { RootStore } from "../Redux/Store";

const Journaling = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [JournalTitle, setJournalTitle] = useState("");
  const [JournalDescription, setJournalDescription] = useState("");
  const [journalListIsOpen, setJournalListIsOpen] = useState("");
  const [journalListData, setJournalListData] = useState<any | undefined>([]);

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const JournalGroups: JournalReduxState = useSelector(
    (state: RootStore) => state.journalGroups
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addJournal = async () => {
    if (JournalTitle || JournalDescription) {
      await dispatch(addJournalGroup(JournalTitle, JournalDescription));
      addToast("Journal Group addded", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(getJournalGroupList());
    } else {
      addToast("Title, description cant be empty.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (journalListIsOpen !== "") {
      const journalId = journalListIsOpen;

      const groupdata = JournalGroups.data.find(
        (journal) => journal._id === journalId
      );
      setJournalListData(groupdata);
    }
  }, [journalListIsOpen]);

  useEffect(() => {
    if (!JournalGroups.data) dispatch(getJournalGroupList());
  }, []);

  return (
    <div className="h-full overflow-y-auto">
      {journalListIsOpen !== "" && (
        <JournalList
          GroupId={journalListData._id}
          title={journalListData.groupName}
          description={journalListData.groupDescription}
          journals={journalListData.Journals}
          color="#556052"
          Back={() => setJournalListIsOpen("")}
        />
      )}
      {journalListIsOpen === "" && (
        <div className="">
          <div className="flex justify-between w-5/6 mx-auto pt-10 mt-10">
            <h1
              style={{ color: "#6EB448" }}
              className="text-2xl font-sans font-bold  ml-4 mb-4"
            >
              Journal Groups 💭
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
                        Add Journal Group
                      </Dialog.Title>
                      <div className="mt-2">
                        <input
                          type="text"
                          maxLength={50}
                          value={JournalTitle}
                          onChange={(e) => setJournalTitle(e.target.value)}
                          placeholder="Flashcard Title"
                          className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        />
                        <div className="flex justify-end">
                          <p style={{ fontSize: "0.8rem" }}>
                            {JournalTitle.length}/50
                          </p>
                        </div>
                        <input
                          type="text"
                          placeholder="Description"
                          maxLength={150}
                          onChange={(e) =>
                            setJournalDescription(e.target.value)
                          }
                          value={JournalDescription}
                          className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        />
                        <div className="flex justify-end">
                          <p style={{ fontSize: "0.8rem" }}>
                            {JournalDescription.length}/150
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={() => {
                            addJournal();
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
          </div>
          <div className="p-10 h-full w-full grid grid-cols-3 gap-2  overflow-y-auto">
            {!JournalGroups.data ? (
              <Loader />
            ) : JournalGroups.data.length === 0 ? (
              <div className="">
                <br />
                <h1 className="text-l ml-5 ">No upcoming remainders</h1>
                <br />
              </div>
            ) : (
              JournalGroups.data.map((journalGroup) => {
                return (
                  <div style={{ marginBottom: "2rem" }}>
                    <TaskGroupCard
                      id={journalGroup._id}
                      title={journalGroup.groupName}
                      description={journalGroup.groupDescription}
                      color="#E6EE96"
                      Open={() => setJournalListIsOpen(journalGroup._id)}
                      type="Journals"
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

export default Journaling;
