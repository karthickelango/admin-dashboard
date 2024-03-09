import React, { useContext, useState } from 'react'
import UploadImage from './uploadImage'
import { BASE_URL, UPDATE_INFO, UPLOAD_URI } from '../constant/apiurl'
import DataContext from '../context/DataContext'
import axios from 'axios'
import InfoUpdate from './InfoUpdate'

const MyAccount = () => {
    const { userDetail } = useContext(DataContext)

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm">
                    <div className="mb-4 text-center position-relative">
                        <img
                            className="w-32 h-32 rounded-full mx-auto"
                            src={`${BASE_URL}/${userDetail.avatar}`}
                            alt="Profile"
                        />
                        <UploadImage />
                        <h1 className="text-xl font-bold mt-4">{userDetail.username}</h1>
                        <p className="text-gray-600 text-sm">Frontend developer</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">About Me <InfoUpdate /></h2>
                        <p className="text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                        </p>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Contact</h2>
                        <p className="text-gray-600">
                            Email: {userDetail.email}<br />
                            Phone: 123-456-7890
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MyAccount
