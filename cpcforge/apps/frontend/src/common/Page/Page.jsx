import React from 'react';
import Navbar from '../Navbar/Navbar';

function Page({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
        
    );
}

export default Page;