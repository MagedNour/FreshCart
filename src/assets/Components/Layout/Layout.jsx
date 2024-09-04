import React from 'react';
import Navbar from '../NavBar/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer.jsx';

export default function Layout(props) {
    return (
        <>
            <Navbar />
            <div className='py-24'>
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
