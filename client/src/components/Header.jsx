import React from 'react';
import { Link } from "react-router-dom"
import MainLogo from "../assets/MainLogo.svg";
import { BiUpload } from "react-icons/bi";
import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from '../config/firebase.config';
import { createNewUser } from '../sanity';
import { SET_USER } from '../context/actions/userAction';
import { useDispatch, useSelector } from "react-redux";


const Header = () => {

    const [color, setColor] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    console.log("user: ", user);

    const provider = new GoogleAuthProvider();

    async function signInWithGmail() {
        await signInWithPopup(firebaseAuth, provider)
            .then((result) => {

                console.log(result)
                createNewUser(result?.user?.providerData?.[0])
                    .then(() => {
                        dispatch(SET_USER(result?.providerData[0]));
                    });
            })
    }


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

                    {
                        user ? (
                            // user profile
                            <div className='relative cursor-pointer'>
                                <img
                                    src={user?.photoURL}
                                    alt="profile"
                                    className='h-10 w-10 object-cover rounded-full'
                                />
                            </div>

                        ) : (
                            // login 
                            <button
                                onClick={signInWithGmail}
                            >
                                <p className={` ${color ? "text-black hover:bg-[black]/[0.05]" : "text-white hover:bg-[white]/[0.15]"} transition-all ease-in-out duration-300 font-semibold px-4 rounded-full py-2 `}>Login</p>
                            </button>
                        )
                    }

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

        </header >
    )
}

export default Header