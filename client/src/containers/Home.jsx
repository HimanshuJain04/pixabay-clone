import React from 'react';
import bannerImg from "../assets/banner.jpg"
import { FiSearch } from "react-icons/fi";

const Home = () => {
    return (
        <div className='h-[200vh] w-full'>

            {/* image */}
            <div className='relative '>

                <div>
                    <img
                        src={bannerImg}
                        alt="Banner"
                        className='w-full h-auto object-contain'
                    />
                </div>

                <div className='absolute top-0 w-full h-full bg-[black]/[0.4] flex justify-center items-center'>
                    <div className='flex flex-col gap-3 justify-start items-start'>
                        <p className='text-white text-4xl font-bold'>Stunning royalty-free images & royalty-free stock</p>
                        <p className='text-white text-base'>Over 4.3 million+ high quality stock images, videos and music shared by our talented community.</p>
                        {/* searchbar */}
                        <div className='px-5 flex w-full  gap-3 justify-center items-center py-2 rounded-full bg-white'>

                            <FiSearch
                                fontSize={25}
                                className='text-[black]/[0.5] cursor-pointer'
                            />

                            <input
                                type="text"
                                placeholder='Search for all images on Pixabay'
                                className='w-full outline-none py-2 placeholder:text-[black]/[0.6]'
                            />

                            <select
                                name=""
                                id=""
                                className='outline-none cursor-pointer'
                            >
                                <option value="all-images">All images</option>
                            </select>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;