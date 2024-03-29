import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_URI } from '../constant/apiurl';

const Signup = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [userType, setUserType] = useState('User')
    const [secretKey, setSecretKey] = useState('')

    const navigate = useNavigate()
    const handelSignup = async () => {
        if(userType == 'Admin' && secretKey!='Karthick') {
            alert('Invalid Admin')
            return
        }
        const newUser = {
            email: email,
            username: name,
            password: password,
            userType: userType
        }
        if (password === confirmPassword) {
            try {
                const response = await axios.post(REGISTER_URI, newUser)
                if (response.status >= 200 && response.status <= 299) {
                    setEmail('')
                    setName('')
                    setPassword('')
                    navigate('/')
                }
            }
            catch (error) {
                console.log(error)
            }
        } else {
            setPasswordMatch(true)
        }
    }
    return (
        <>
            <div className='container mt-30 login-page'>
                <div className="" style={{ maxWidth: '35%', margin: '0 auto', border: 'none' }}>
                    <div className="row g-0">
                        <h2 className='b-logo'>Dashboard</h2>
                        <div className="col-md-12 align-content-center" style={{}}>
                            <div className="card-body">
                                <h3 className='my-3 title'>Create Account</h3>
                                <div className="mb-4">
                                    Register as:
                                    <input type="radio" name="userType" className='ms-3 me-1' value="User" onChange={(e) => setUserType(e.target.value)} />User
                                    <input type="radio" name="userType" className='ms-3 me-1' value="Admin" onChange={(e) => setUserType(e.target.value)} />Admin
                                </div>
                                {
                                    userType === 'Admin' ?
                                        <div className="mb-4">
                                            <input type="text" placeholder='Secret key' className="form-control" id="key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
                                        </div> : ''
                                }
                                <div className="mb-4">
                                    <input type="text" placeholder='Name' className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <input type="text" placeholder='Email' className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <input type="text" placeholder='Password' className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-4 position-relative">
                                    <input type="text" placeholder='confirm password' className="form-control" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    {
                                        passwordMatch ? <h1 className="text-color-primary error-msg">Password doesn't match</h1> : <h1 className='py-4'></h1>
                                    }
                                </div>
                                <div className='text-center'>
                                    <button className='btn primary-btn' onClick={() => handelSignup()}>Sign up</button>
                                </div>
                                <div className='my-3 label-item text-center'>
                                    Have an account?
                                    <Link to="/" className='text-color-primary ps-2'>Login</Link>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-8 align-content-center1">
                            <img src={LogInImg} className="img-fluid rounded-start" alt="..." />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup