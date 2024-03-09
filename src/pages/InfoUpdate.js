import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DataContext from '../context/DataContext'
import { UPDATE_INFO } from '../constant/apiurl'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const InfoUpdate = () => {
    const { userDetail } = useContext(DataContext)
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [about, setAbout] = useState('')
    const [role, setRole] = useState('')
    const [contact, setContact] = useState('')

    const handelUpdateInfo = async () => {
        const info = {
            about: about,
            role: role,
            contact: contact
        }
        try {
            const response = await axios.put(`${UPDATE_INFO}/${userDetail._id}`, info)
            console.log(response.data)
            if (response.status >= 200 && response.status <= 299) {
                setOpen(false)
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handelClose = () => {
        setOpen(false)
    }
    useEffect(() => {
    }, [])

    return (
        <>
            <span className='edit-info text-end' onClick={() => setOpen(!open)} >
                Edit info
            </span>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                        <div className="p-6 text-center" >
                                            <h3 className="image-container" >

                                                <div className='my-4'>
                                                    <textarea type='text' placeholder='tweet...' value={about} onChange={(e) => setAbout(e.target.value)} style={{ height: "150px" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                </div>
                                                <div className='my-4'>
                                                    <input type='text' placeholder='role' value={role} onChange={(e) => setRole(e.target.value)} />
                                                </div>
                                                <div className='my-4'>
                                                    <input type='text' placeholder='Contact num' value={contact} onChange={(e) => setContact(e.target.value)} />
                                                </div>
                                            </h3>
                                            <div className='justify-content-sp'>
                                                <button onClick={() => handelClose()} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-2 btn secondary-btn">Cancel</button>
                                                <button onClick={() => handelUpdateInfo()} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg inline-flex items-center px-5 py-2.5 text-center btn primary-btn">
                                                    Update
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

    )
}

export default InfoUpdate