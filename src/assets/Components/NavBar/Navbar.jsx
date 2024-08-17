import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar(props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-gray-800 fixed inset-x-0 z-50">
            <nav className={`container mx-auto px-6 py-3 flex justify-between flex-col ${isOpen ? `flex-col` : `flex-row`}`}>
                <div className="flex justify-between w-full">

                    <div className="flex">
                        <div className="text-white font-bold text-xl me-24 brand">
                            <NavLink to={"/"}>FreshCart</NavLink>
                        </div>

                        <div className="hidden lg:block">
                            <ul className="flex items-center space-x-8">
                                <li><NavLink to={"/"} className="text-white">Home</NavLink></li>
                                <li><NavLink to={"/products"} className="text-white">Products</NavLink></li>
                                <li><NavLink to={"/categories"} className="text-white">Categories</NavLink></li>
                                <li><NavLink to={"/brands"} className="text-white">Brands</NavLink></li>
                                <li><NavLink to={"/cart"} className="text-white">Cart</NavLink></li>
                            </ul>
                        </div>

                    </div>

                    <div className='flex'>
                        <div className="lg:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="outline-none mobile-menu-button">
                                <svg
                                    className="w-6 h-6 text-white transition-transform duration-300"
                                    style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} // Optional rotation animation
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="social-media text-white hidden lg:block space-x-2">
                            <i className="hover:text-yellow-600 fa-brands fa-facebook-f"></i>
                            <i className="hover:text-yellow-600 fa-brands fa-twitter"></i>
                            <i className="hover:text-yellow-600 fa-brands fa-linkedin"></i>
                            <i className="hover:text-yellow-600 fa-brands fa-youtube"></i>
                            <i className="hover:text-yellow-600 fa-brands fa-tiktok"></i>

                        </div>

                        <div className='hidden lg:flex'>
                            <li><NavLink to={"/login"} className="text-white">Login</NavLink></li>
                            <li><NavLink to={"/register"} className="text-white">Register</NavLink></li>
                            <li><Link className="text-white">SignOut</Link></li>
                        </div>

                    </div>
                </div>

                <div className={`mobile-menu lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'
                    }`}
                >
                    <ul className="mt-4 space-y-4">
                        <li><NavLink to={"/"} className="block px-4 py-2 text-white bg-gray-900 rounded">Home</NavLink></li>
                        <li><NavLink to={"/products"} className="block px-4 py-2 text-white bg-gray-900 rounded">Products</NavLink></li>
                        <li><NavLink to={"/categories"} className="block px-4 py-2 text-white bg-gray-900 rounded">Categories</NavLink></li>
                        <li><NavLink to={"/brands"} className="block px-4 py-2 text-white bg-gray-900 rounded">Brands</NavLink></li>
                        <li><NavLink to={"/cart"} className="block px-4 py-2 text-white bg-gray-900 rounded">Cart</NavLink></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
