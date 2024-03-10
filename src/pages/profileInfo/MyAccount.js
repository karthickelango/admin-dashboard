import React, { useContext } from 'react'
import UploadImage from './uploadImage'
import { BASE_URL } from '../../constant/apiurl'
import InfoUpdate from './InfoUpdate'
import defaultAvatar from '../../assets/images/defaultAvatar.svg'
import DataContext from '../../context/DataContext'


const MyAccount = () => {
    const { userDetail } = useContext(DataContext)
    return (
        <div>
            <div className="min-h-screen flex flex-col justify-center items-center">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm" style={{ width: '500px' }}>
                    <div className="mb-4 text-center position-relative">
                        <img
                            className="w-32 h-32 rounded-full mx-auto"
                            src={userDetail.avatar === null ? defaultAvatar : `${BASE_URL}/${userDetail.avatar}`}
                            alt="Profile"
                        />
                        <UploadImage />
                        <h1 className="text-xl font-bold mt-4">{userDetail.username}</h1>
                        <p className="text-gray-600 text-sm">
                            {
                                userDetail.role === null ? 'Add role' :
                                    <>{userDetail.role}</>
                            }
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2 fjsb">About Me <InfoUpdate /></h2>
                        <p className="text-gray-600">
                            {
                                userDetail.about === null ? 'Add about' :
                                    <>{userDetail.about}</>
                            }
                        </p>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Contact</h2>
                        <p className="text-gray-600">
                            Email: {
                                userDetail.email === null ? 'Add about' :
                                    <>{userDetail.email}</>
                            }<br />
                            Phone: {
                                userDetail.contact === null ? 'Add about' :
                                    <>{userDetail.contact}</>
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MyAccount
