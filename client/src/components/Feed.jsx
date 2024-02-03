import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdBookmark, MdDelete } from "react-icons/md";
import { MdBookmarkBorder } from "react-icons/md";
import { useSelector } from "react-redux";
import { addToCollection, deletePost } from '../sanity';

const Feed = ({ feed }) => {

    const [alreadySaved, setAlreadySaved] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const user = useSelector(state => state.user);

    async function deleteFeed() {
        await deletePost(feed?._id)
            .then(() => {
                window.location.reload();
            })
    }

    async function collectionHandler() {
        if (!alreadySaved) {
            await addToCollection(feed?._id, user?.uid).then(() => {
                window.location.reload();
            });
        }
    }

    useEffect(() => {
        setAlreadySaved(
            !!(feed?.collections?.filter((item) => item?._id === user?.uid).length)
        );
    }, [feed]);


    return (
        <div className='m-2 relative'>
            <div
                onMouseEnter={() =>
                    setIsHover(true)
                }

                onMouseLeave={() =>
                    setIsHover(false)
                }

                className='relative cursor-pointer w-auto rounded-lg shadow-md overflow-hidden'>
                {
                    feed?.mainImage && (
                        <Link to={`/post-details/${feed?._id}`}>
                            <img
                                src={feed.mainImage?.assets?.url}
                                className='w-full h-full object-cover'
                                alt={feed.title}
                            />
                        </Link>
                    )
                }

                {
                    feed?.otherMedia && (
                        <Link to={`/post-details/${feed?._id}`}>
                            <video
                                src={feed.otherMedia?.assets?.url}
                                className='w-full h-full object-cover'
                                alt="video"
                                autoPlay
                                loop
                                muted
                            />
                        </Link>
                    )
                }

                {
                    isHover && (
                        <>
                            {/* saved */}
                            <div onClick={collectionHandler} className='absolute z-10 inset-x-0 top-0 px-3 py-2 flex items-center'>
                                <div className={` w-8 h-8 rounded-md flex text-2xl justify-center items-center border  ${alreadySaved ? "border-emerald-400 text-emerald-400 " : "border-gray-100 text-gray-100 "}`}>
                                    {
                                        alreadySaved ? (<MdBookmark />) : (<MdBookmarkBorder />)
                                    }
                                </div>
                            </div>

                            {/* tags name */}
                            <div
                                className='absolute inset-x-0 bottom-0 flex items-center flex-wrap backdrop-blur-md gap-1 bg-gradient-to-bl from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.8)] px-3 py-2'
                            >
                                {
                                    feed?.keywords?.slice(0, 3).map((tag, i) => (
                                        <p
                                            className='text-sm text-gray-50 font-semibold'
                                            key={i}
                                        >{tag.length > 10 ? `${tag.slice(0, 10)}...` : `${tag}`}</p>
                                    ))
                                }
                            </div>
                        </>
                    )
                }

                {
                    user?.uid === feed?.user?._id && (
                        <div onClick={deleteFeed} className='z-10 text-2xl p-2 absolute top-2 right-2 flex justify-center items-center hover:bg-white cursor-pointer  rounded-full bg-[rgba(256,256,256,0.6)]'>
                            <MdDelete />
                        </div>
                    )
                }

            </div>
        </div >
    )
}

export default Feed