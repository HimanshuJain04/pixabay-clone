import React from 'react';
import Masonary from "react-masonry-css";
import { Feed } from "../components"

const breakPointObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1
}

const MisonaryLayout = ({ feeds }) => {

    return (
        <Masonary
            className='flex'
            breakPointCols={breakPointObj}
        >
            {
                feeds?.map((feed, i) => (
                    <div key={i}>
                        <Feed feed={feed} />
                    </div>
                ))
            }

        </Masonary>
    )
}

export default MisonaryLayout