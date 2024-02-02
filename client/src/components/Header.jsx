import React from 'react';
import { Link } from "react-router-dom"
import MainLogo from "../assets/MainLogo.svg"

const Header = () => {
    return (
        <header className='w-full flex justify-center items-center'>

            <div className='flex py-2 justify-between items-center w-11/12'>


                {/* image section */}
                <Link to="/">
                    <img
                        src={MainLogo}
                        alt="Main-Logo"
                        className='w-24 h-auto object-contain'
                    />
                </Link>

                {/* user profile section */}

                <div className=' flex gap-5 justify-center items-center'>
                    {/* login */}
                    <Link to="/login">
                        <p>Login</p>
                    </Link>

                    {/* upload */}
                    <Link to="/">
                        <div
                            className='bg-green-600 hover:bg-green-500 transition-all duration-200 ease-in-out text-white font-semibold px-5 rounded-full py-2'
                        >
                            Upload
                        </div>
                    </Link>
                </div>

            </div>


        </header>
    )
}

export default Header