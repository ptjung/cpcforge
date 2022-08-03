import React from 'react';
import { usePageContext } from '../../utils';
import Navbar from '../Navbar/Navbar';

function Page({ showNav = true, children }) {
    const pageContext = usePageContext();

    return (
        <>
            {showNav ? <Navbar /> : null}
            {children}
        </>
        
    );
}

export default Page;