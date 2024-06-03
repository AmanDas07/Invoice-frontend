import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../Reducers/app/store';
import { clearAuth } from '../../../Reducers/authSlice';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [currentTab, setTab] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.auth);

    const logoutController = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('record');
        dispatch(clearAuth());
        navigate('/login');
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTab(window.location.pathname);
        }
    }, []);

    useEffect(() => {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(innerLink => innerLink.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }, []);

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-white text-2xl font-bold">
                        INVOICE
                    </Link>
                    <div className="hidden lg:flex lg:flex-grow lg:justify-end">
                        <Link to="/" className="nav-link block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">
                            Home
                        </Link>
                        {auth.user ? (
                            <>
                                <button className="text-white bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md mr-4" onClick={logoutController}>
                                    {auth.user.name}
                                </button>
                                <Link to="/" className="nav-link block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4" onClick={logoutController}>
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="nav-link block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">
                                    Register
                                </Link>
                                <Link to="/login" className="nav-link block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="block lg:hidden">
                        <button className="navbar-toggler">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
