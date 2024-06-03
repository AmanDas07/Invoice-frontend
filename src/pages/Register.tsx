import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../tailwind.css';
import Layout from './Layout/layout';

interface RegisterFormData {
    name: string;
    email: string;
    password: string;

}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
        password: "",

    });
    const { name, email, password } = formData;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
            toast.success("User Registered Successfully");
            setLoading(false);
            navigate("/login");
        } catch (error: any) {
            toast.error(error);
            setLoading(false);
        }
    };

    /* if (user) {
         navigate("/");
     }*/

    return (
        <Layout>
            <div className='flex justify-center items-center min-h-screen bg-gray-100'>
                <div className='w-full max-w-2xl p-6 bg-white rounded-lg shadow-md'>
                    <h1 className='text-center text-3xl font-semibold mb-6'>Register</h1>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <ToastContainer position="top-center" autoClose={5000} />
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex justify-between items-center mt-6'>
                            <button
                                type="submit"
                                className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} disabled:bg-blue-300`}
                                disabled={!name || !email || !password}
                            >
                                {loading ? "Loading..." : "Register"}
                            </button>
                            <p className='text-sm text-gray-600'>
                                Already Registered? <Link to="/login" className="text-blue-500 hover:text-blue-600">Click here...</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </Layout>

    );
}

export default Register;
