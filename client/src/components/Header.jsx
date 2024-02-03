import React from 'react';
import { Link, useNavigate } from "react-router-dom"
import MainLogo from "../assets/MainLogo.svg";
import { BiUpload } from "react-icons/bi";
import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from '../config/firebase.config';
import { createNewUser } from '../sanity';
import { SET_USER, SET_USER_NULL } from '../context/actions/userAction';
import { useDispatch, useSelector } from "react-redux";
import { mainMenu } from "../utils/supports";


const Header = () => {

    const [color, setColor] = useState(false);
    const [isMenu, setIsMenu] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const provider = new GoogleAuthProvider();

    async function signInWithGmail() {
        await signInWithPopup(firebaseAuth, provider)
            .then((result) => {
                createNewUser(result?.user?.providerData?.[0])
                    .then(() => {
                        dispatch(SET_USER(result?.user?.providerData[0]));
                    });
            })
    }

    async function logout() {
        await firebaseAuth.signOut()
            .then(() => {
                dispatch(SET_USER_NULL());
                navigate("/", { replace: true })
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
        <header className={`w-full fixed border-b-2 border-[white]/[0.1] inset-x-0 z-50 transition-all duration-300 ease-in-out  flex justify-center  items-center ${color ? "bg-white" : "bg-transparent"}`}>

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
                                    referrerPolicy='no-referrer'
                                    onClick={() => {
                                        setIsMenu(!isMenu)
                                    }}
                                />

                                {
                                    isMenu && (
                                        <div className='absolute right-0 top-12 rounded-md shadow-md w-64 py-3 px-4 bg-[#191B26] flex flex-col items-start justify-center'>
                                            <p className='text-gray-50 w-full overflow-hidden text-center py-1 font-semibold'>{user?.displayName}</p>
                                            {
                                                mainMenu && mainMenu.map((menu) => (
                                                    <Link
                                                        key={menu.id}
                                                        to={`/newPost/${menu.slug}`}
                                                        className='text-gray-300 hover:bg-[#2b2e41] w-full rounded-full px-2 py-2 pl-3 transition-all duration-200 ease-in-out'
                                                    >{menu.name}</Link>
                                                ))
                                            }

                                            <div className='w-full h-[1px] bg-gray-600 '></div>
                                            <div
                                                className='text-gray-300 text-lg w-full rounded-full px-2 py-1 pl-3'
                                                onClick={logout}>
                                                Logout
                                            </div>
                                        </div>
                                    )
                                }

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
                    <Link to="/post/upload">
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