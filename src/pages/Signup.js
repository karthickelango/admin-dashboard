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

    const navigate = useNavigate()
    const handelSignup = async () => {
        const newUser = {
            email: email,
            username: name,
            password: password
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
            <div className='container mt-30'>
                <div className="" style={{ maxWidth: '35%', margin: '0 auto', border: 'none' }}>
                    <div className="row g-0">
                        <h2 className='b-logo'>Dashboard</h2>
                        <div className='my-3 label-item'>
                            <Link to="/" className='btn secondary-btn p-30'>Login</Link>
                        </div>
                        <div className="col-md-12 align-content-center" style={{}}>
                            <div className="card-body">
                                <h3 className='my-3 title'>Create Account</h3>
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
                                <div className='text-end'>
                                    <button className='btn primary-btn' onClick={() => handelSignup()}>Sign up</button>
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