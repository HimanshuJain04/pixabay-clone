import React from 'react';
import { Link } from "react-router-dom"
import MainLogo from "../assets/MainLogo.svg";
import { BiUpload } from "react-icons/bi";
import { useState } from 'react';


const Header = () => {

    const [user, setUser] = useState(null);
    const [color, setColor] = useState(false);


    const changeColor = () => {
        if (typeof window !== "undefined") {

            if (window.scrollY >= 1) {
                setColor(true);
            } else {
                setColor(false);
            }
        }
    }

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", changeColor);
    }


    return (
        <header className={`w-full fixed inset-x-0 z-50 transition-all duration-300 ease-in-out  flex justify-center  items-center ${color ? "bg-white" : "bg-transparent"}`}>

            <div className='flex py-3 justify-between gap-10 items-center w-11/12'>


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
                        <p className={` ${color ? "text-black hover:bg-[black]/[0.05]" : "text-white hover:bg-[white]/[0.15]"} transition-all ease-in-out duration-300 font-semibold px-4 rounded-full py-2 `}>Login</p>
                    </Link>
                    {/* upload */}
                    <Link to="/">
                        <div
                            className='bg-green-600 flex gap-1 justify-center items-center hover:bg-green-500 transition-all duration-300 ease-in-out text-white font-semibold px-4 rounded-full py-2'
                        >
                            <BiUpload fontSize={22} />
                            <span>
                                Upload
                            </span>
                        </div>
                    </Link>
                </div>

            </div>

        </header>
    )
}

export default Header