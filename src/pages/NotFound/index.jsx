import React from 'react';
import img from '../../assets/images/notFound.jpg';

const NotFound = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <img src={img} alt="Not Found" className="w-full h-full"/>
        </div>
    );
}

export default NotFound;
