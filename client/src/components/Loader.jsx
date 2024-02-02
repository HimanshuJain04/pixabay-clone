import React from 'react'
import loader from "../assets/Running deer.gif"

const Loader = () => {
    return (
        <div className='w-screen h-screen justify-center items-center flex'>
            <img src={loader} alt="loader" />
        </div>
    )
}

export default Loader;