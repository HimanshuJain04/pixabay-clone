import React, { useState } from 'react'
import { FaImage } from "react-icons/fa6";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FaMusic } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";
import { PiVideoCameraFill } from "react-icons/pi";
import { categories } from '../utils/supports';
import { Loader } from "../components";
import { MdDelete } from "react-icons/md";

// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../assets/css/swipercss.css';
import 'swiper/css/bundle';
import { deleteAssets, uploadAssets } from '../sanity';


const NewPost = () => {

    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);


    const isAllowed = (file1) => {
        const allowedTypes = [
            "audio/mp3",
            "audio/wav",
            "video/mp4",
            "video/avi",
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/jpg",
        ];
        return allowedTypes.includes(file1.type);
    }

    async function imageHandler(e) {

        const file1 = e.target.files[0];

        if (file1) {

            setLoading(true);
            if (isAllowed(file1)) {

                await uploadAssets(file1).then((data) => {
                    setFile(data)
                })

            } else {
                setFile(null);
                alert("Invalid File Type");
            }

            setLoading(false);
        }
    }

    async function deleteHandler(id) {
        setLoading(true);
        await deleteAssets(id).then(() => {
            setFile(null);
        });
        setLoading(false);
    }

    return (
        <div className='flex w-full mt-8 min-h-screen justify-center items-center'>
            <div className='flex flex-col w-10/12 gap-10 h-full justify-start items-center'>

                {
                    loading ? (<Loader />) : (
                        <>
                            {
                                file ? (
                                    <>
                                        <div className='flex w-full  border-2 h-full border-[black]/[0.2] gap-2 rounded-lg justify-between items-start'>

                                            {/* image */}
                                            <div className='w-full flex justify-center items-center relative h-full p-2'>

                                                <>
                                                    {/* video */}
                                                    {
                                                        [
                                                            "video/mp4",
                                                            "video/avi",
                                                            "video/mov",
                                                            "video/wav",
                                                        ].includes(file.mimeType) && (

                                                            <video src={file?.url} className='w-full h-full object-cover' alt="user-file" />
                                                        )
                                                    }

                                                    {/* image */}
                                                    {
                                                        [
                                                            "image/jpeg",
                                                            "image/png",
                                                            "image/gif",
                                                            "image/jpg",
                                                        ].includes(file.mimeType) && (

                                                            <img src={file?.url} className=' bg-black w-full h-full object-cover' alt="user-file" />
                                                        )
                                                    }
                                                </>

                                                <div onClick={() => {
                                                    deleteHandler(file?._id)
                                                }} className='text-3xl cursor-pointer z-10 p-2 rounded-full absolute top-3 right-2 hover:bg-[white]/[0.5]'>
                                                    <MdDelete />
                                                </div>

                                            </div>

                                            {/* details */}
                                            <div className='flex h-full w-[800px] p-5 flex-col gap-5 justify-start items-center'>
                                                {/* title */}
                                                <div className='w-full'>
                                                    <input
                                                        type="text"
                                                        className=' rounded-md font-semibold text-[black]/[0.8] w-full border-2 border-[black]/[0.1] py-2 px-2 outline-none'
                                                        required
                                                        placeholder='Your post title here'
                                                    />
                                                </div>

                                                {/* categories */}
                                                <Swiper
                                                    slidesPerView={6}
                                                    centeredSlides={false}
                                                    className='mySwiper'
                                                    spaceBetween={10}
                                                    grabCursor={true}
                                                >
                                                    {
                                                        categories?.map((value) => (
                                                            <SwiperSlide key={value.id} className='py-1'>
                                                                <div
                                                                    className={`px-2 py-1 ${category === value.name && "bg-gray-200"} flex justify-center items-center rounded-md border-2 border-gray-200 hover:shadow-md shadow-inner`}
                                                                    onClick={() => {
                                                                        setCategory(value.name)
                                                                    }}
                                                                >
                                                                    <p className='text-base text-[black]/[0.8] cursor-pointer'>{value.name}</p>
                                                                </div>
                                                            </SwiperSlide>
                                                        ))
                                                    }

                                                </Swiper>

                                                {/* tags or keywords */}
                                                <div className='w-full'>
                                                    <input
                                                        type="text"
                                                        className=' rounded-md text-[black]/[0.8] font-semibold w-full border-2 border-[black]/[0.1] py-2 px-2 outline-none'
                                                        required
                                                        placeholder='Types you tags here seperated by comma'
                                                    />
                                                </div>

                                                {/* description */}
                                                <div className='w-full'>
                                                    <textarea
                                                        className=' rounded-md h-[200px] resize-none text-[black]/[0.8] font-semibold w-full border-2 border-[black]/[0.1] py-2 px-2 outline-none'
                                                        required
                                                        placeholder='Description'
                                                    />
                                                </div>

                                            </div>

                                        </div>
                                    </>

                                ) : (

                                    <>
                                        {/* heading */}
                                        <div className='flex-col w-full flex justify-start items-center'>
                                            <p className='text-4xl font-bold'>Upload your media</p>
                                            <p className='text-[black]/[0.7] mt-3'>Join our community of creators and showcase your talent by uploading your media!</p>
                                            <p className='text-[black]/[0.7]'>Learn more about the Pixabay <span className='underline cursor-pointer'>Content license.</span></p>
                                        </div>

                                        {/* upload section */}
                                        <div className='bg-[black]/[0.04] gap-4 flex-col h-[300px] flex justify-center items-center w-[900px] rounded-lg border-dashed border-2 border-[black]/[0.1]'>
                                            {/* icons */}
                                            <div className='flex justify-center items-center w-full'>
                                                <div className='relative w-[150px] h-[50px]'>
                                                    <div className='text-2xl absolute z-[10] shadow-md left-0 top-0 -rotate-12 text-blue-400 rounded-full bg-white p-4'>
                                                        <PiVideoCameraFill />
                                                    </div>
                                                    <div className='text-xl absolute shadow-md z-[5] left-[27%] -top-5 text-orange-400 rounded-full bg-white p-4'>
                                                        <FaImage />
                                                    </div>
                                                    <div className='text-xl absolute shadow-md left-[52%] rotate-12 top-0 text-green-600 rounded-full bg-white p-4'>
                                                        <FaMusic />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* input */}
                                            <div className='flex justify-center items-center gap-5'>
                                                <p className='font-bold text-lg'>Drag and drop or</p>

                                                <label class="">
                                                    <input onChange={imageHandler} onClick={imageHandler} hidden type="file" name="fileToUpload" id="fileToUpload" />
                                                    <p
                                                        className='bg-green-600  hover:bg-green-500 cursor-pointer transition-all duration-300 ease-in-out text-white font-semibold px-4 rounded-full py-2'
                                                    >Browse Files</p>
                                                </label>

                                            </div>

                                        </div>

                                        <div className='grid gap-5 w-[900px] text-sm text-[black]/[0.7] grid-cols-3'>

                                            <div className='flex justify-center items-start gap-2'>
                                                <FaImage className='text-3xl' />
                                                <p>JPG, PNG, PSD, AI, and SVG images up to 40MB with at least 3000px on one side</p>
                                            </div>

                                            <div className='flex justify-center items-start gap-2'>
                                                <BsFillCameraVideoFill className='text-3xl' />
                                                <p>MPEG, MOV, and AVI videos up to 300MB and larger than 1920x800px</p>
                                            </div>

                                            <div className='flex justify-center items-start gap-2'>
                                                <FaMusic className='text-3xl' />
                                                <p>MP3, WAV, AAC,FLAC, AIF and M4A up to 100MB and {"<"} 15 minutes</p>
                                            </div>

                                            <div className='flex justify-center items-start gap-2'>
                                                <FaFire className='text-2xl' />
                                                <p>GIFs up to 25MB with at least 64px along one side and {"<"} 20 seconds</p>
                                            </div>

                                            <div className='flex justify-center items-start gap-2'>
                                                <FaFlag className='text-xl' />
                                                <p>Excludes graphic nudity, violence or hate</p>
                                            </div>

                                            <div className='flex justify-center items-start gap-2'>
                                                <LuListTodo className='text-3xl' />
                                                <p>Only upload original media that you own the rights to</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </>
                    )
                }

            </div>
        </div >
    )
}

export default NewPost;