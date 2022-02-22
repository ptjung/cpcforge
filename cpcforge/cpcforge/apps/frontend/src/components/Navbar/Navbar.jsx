import React, { useEffect, useState } from 'react';
import { getTokenStatus } from '../../utils';
import styles from './Navbar.module.scss';

function Navbar() {
    const [online, setOnline] = useState(false);
    const [username, setUsername] = useState('');

    const capitalizeStr = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleSignOut = () => {
        window.sessionStorage.clear();
        window.location.href = '/';
    };
    
	useEffect(async () => {
        const tokenStatus = await getTokenStatus();
        const onlineStatus = !!tokenStatus?.['alive'];
		setOnline(onlineStatus);
        if (onlineStatus) setUsername(capitalizeStr(tokenStatus?.['payload']['username']));
	}, []);

    return (
        <div className={styles['navbar-wrapper']}>
            <nav className={styles['navbar']}>
                <a href='/' className={styles['navbar-logo']} />
                <ul className={styles['nav-item-coll']}>
                    <li><a href='/list'>Platforms</a></li>
                    <li><a href='/create'>Create</a></li>
                </ul>
                <ul className={styles['nav-item-coll']}>
                    {
                        online ? (
                            <li><a href='#' onClick={handleSignOut}>{username}</a></li>
                        ) : (
                        <> 
                            <li><a href='/login'>Log In</a></li>
                            <li><a href='/signup'>Sign Up</a></li>
                        </>
                        )
                    }
                    
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;