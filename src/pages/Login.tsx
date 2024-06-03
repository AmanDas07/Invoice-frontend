'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from './Layout/layout';
import { setAuth } from '../../Reducers/authSlice';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                email,
                password,
            });

            dispatch(setAuth({
                user: data.user,
                token: data.token,
            }));
            console.log(data.token);
            window.localStorage.setItem("auth", JSON.stringify(data));
            toast.success("User Logged in Successfully");
            setLoading(false);
            navigate("/");
        } catch (error: any) {
            toast.error(error.response.data.message || "Login failed");
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-center text-3xl font-semibold mb-6">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail" className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                type="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                id="exampleInputPassword1"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <button
                                type="submit"
                                className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} disabled:bg-blue-300`}
                                disabled={!email || !password}
                            >
                                {loading ? (
                                    <>
                                        <span>Loading&nbsp;</span>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    </>
                                ) : 'Login'}
                            </button>
                            <p className="text-sm text-gray-600">
                                New User? <Link to="/Register" className="text-blue-500 hover:text-blue-600">Click here...</Link>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
