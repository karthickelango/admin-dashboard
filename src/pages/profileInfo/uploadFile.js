import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Upload from "../../assets/images/upload.svg";
import DataContext from "../../context/DataContext";
import { ADD_DB_FILE } from "../../constant/apiurl";
import { Button, useTheme } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { tokens } from "../../theme";

const UploadFile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userDetail } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [file, setFile] = useState();
  const [message, setMessage] = useState('');

  // handel profile image
  const handelUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(ADD_DB_FILE, formData);
      if (response.status >= 200 && response.status <= 299) {
        setOpen(false);
        setFile('')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelClose = () => {
    setOpen(false);
    setFile("");
  };
  useEffect(() => {}, []);

  return (
    <>
      <span onClick={() => setOpen(!open)}>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.gray[100],
            fontSize: "10px",
            fontWeight: "bold",
            padding: "5px 10px",
            border: `1px solid ${colors.primary[900]}`,
            textTransform: "capitalize",
          }}
        >
          <CloudUploadIcon sx={{ mr: "10px" }} />
          Upload file
        </Button>
      </span>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg profile-model">
                  <div className="bg-white">
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400 image-container">
                        <label htmlFor="upload">
                          {file ? (
                            <p>{file?.name}</p>
                          ) : (
                            <img src={Upload} />
                          )}
                          <input
                            type="file"
                            id="upload"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                          />
                        </label>
                      </h3>
                      <div className="justify-content-end">
                        <button
                          onClick={() => handelClose()}
                          data-modal-hide="popup-modal"
                          type="button"
                          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-2 btn secondary-btn"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handelUpload()}
                          data-modal-hide="popup-modal"
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg inline-flex items-center px-5 py-2.5 text-center btn primary-btn"
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UploadFile;
