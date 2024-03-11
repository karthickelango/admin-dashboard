import React from 'react'
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_URI, REGISTER_URI } from '../constant/apiurl';
import LogInImg from '../assets/images/dashboard.svg'

const Login = () => {
    const [email, setemail] = useState('')
    const [password, setPasword] = useState('')
    const [userMsg, setUserMsg] = useState(false)
    const [passwordMsg, setPasswordMsg] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchUrl()
    }, [])

    const fetchUrl = () => {
        axios.get(REGISTER_URI).then((res) => {
        })
    }

    const handelLogin = async () => {
        try {
            const user = {
                email: email,
                password: password
            }
            const response = await axios.post(LOGIN_URI, user)
            const token = response.data
            navigate('/')
            window.location.reload()
            localStorage.setItem('token', token)
        } catch (error) {
            console.log(error)
            if (error.response.data.error === "Invalid user name") {
                setUserMsg(true);
            } else if (error.response.data.error === "Invalid user password") {
                setPasswordMsg(true);
            }
        }
    }
    const toggleState = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <div className='w100 mt-30 login-page'>
                <div className="" style={{ maxWidth: '90%', margin: '0 auto', border: 'none' }}>
                    <div className="row g-0">
                        <h2 className='b-logo'>Dashboard</h2>
                        <div className="col-md-4 align-content-center aic" style={{}}>
                            <div className="card-body">
                                <h3 className='my-3 title mb-0'>Login</h3>
                                {
                                    userMsg ? <h1 className="py-4 text-color-primary text-center">User doesn't exist</h1> : <h1 className='py-4'></h1>
                                }
                                <div className="mb-4">
                                    <input type="email" placeholder='Email' className="form-control" id="email" value={email} onChange={(e) => setemail(e.target.value)} />
                                </div>
                                <div className="mb-4 position-relative">
                                    <input type={!showPassword ? "password" : "text"} placeholder='password' className="form-control" id="password" value={password} onChange={(e) => setPasword(e.target.value)} />
                                    {
                                        passwordMsg ? <h1 className="text-color-primary error-msg">Invalid password</h1> : ""
                                    }
                                    <img src='' onClick={() => toggleState()} className='eye-icon' />
                                </div>
                                <div className='jc-sb'>
                                    {/* <Link>Forgrt password?</Link> */}
                                    <button className='btn primary-btn text-center' onClick={() => handelLogin()}>Login</button>
                                </div>

                                <div className='my-3 label-item text-center'>
                                    Don't have an account ?
                                    <Link to="/signup" className='text-color-primary ps-2'>Create one</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 align-content-center flex-center">
                            <img src={LogInImg} className="img-fluid rounded-start" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login