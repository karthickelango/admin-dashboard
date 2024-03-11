import axios from 'axios';
import React from 'react'
import { createContext, useEffect, useState } from "react";
import { BASE_URL, USER_LIST } from '../constant/apiurl';


const DataContext = createContext({})
export const DataProvider = ({ children }) => {
  const userToken = localStorage.getItem('token')
  const token = userToken;
  const user = parseJwt(token)

  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  const [activeUser, setActiveUser] = useState(user?.userId)
  const [userDetail, setUserDetail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [allUser, setAllUser] = useState([])

  const processedData = allUser.map((item) => {
    const id = item._id.toString();
    return { ...item, id };
  });




  // get user detail
  const getUserDetails = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/${activeUser}`)
      if (response.status >= 200 && response.status <= 299) {
        setUserDetail(response.data)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  // get all user
  const getAllUserDetails = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(USER_LIST)
      if (response.status >= 200 && response.status <= 299) {
        setAllUser(response.data.auth)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getUserDetails()
    getAllUserDetails()
  }, [activeUser])


  return (
    <DataContext.Provider value={{ userDetail, getUserDetails, processedData, isLoading, setIsLoading, allUser, setAllUser }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext