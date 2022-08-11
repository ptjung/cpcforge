import React from 'react';
import Navbar from '../Navbar/Navbar';

function Page({ showNav = true, children }) {
    return (
        <>
            {showNav ? <Navbar /> : null}
            {children}
        </>
    );
}

export default Page;