import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { api, getTokenStatus, navigateAndRefresh, isPathFrom } from '../../utils';
import styles from './Navbar.module.scss';

function Navbar() {
    const [online, setOnline] = useState(false);
    const [colorMode, setColorMode] = useState(0);
    const [username, setUsername] = useState('');
    const params = useParams();

    const navStyling = useMemo(() => {
        return {
            'backgroundColor': [
                '#FFFFFF',
                '#A8D9FF',
                '#AFB5FF',
                '#FFA793',
                '#FFF19B',
                '#D1FFD7',
                '#B5F7FF',
            ][colorMode]
        };
    }, [colorMode]);

    const handleSignOut = () => {
        window.sessionStorage.clear();
        navigateAndRefresh('/');
    };
    
	useEffect(async () => {
        const tokenStatus = await getTokenStatus();
        const onlineStatus = !!tokenStatus?.['verified'];
		setOnline(onlineStatus);
        if (onlineStatus) {
            setUsername(tokenStatus?.['payload']['username']);
        }
        if (isPathFrom('/platform/')) {
            await api.post('/api/platforms/retrieve', { handle: params?.handle ?? '' })
                .then(res => {
                    const { status: statusFound, result: platformInfo } = res.data;
                    if ( statusFound === 'fail' ) {
                        navigateAndRefresh('/');
                    }
                    else {
                        setColorMode(platformInfo?.['mode'] ?? 0);
                    }
                })
                .catch(err => {});
        }
	}, []);

    return (
        <div className={styles['navbar-wrapper']} style={navStyling}>
            <nav className={styles['navbar']}>
                <a href='/' className={styles['navbar-logo']} />
                <ul className={styles['nav-item-coll']}>
                    <li><a href='/list'>Platforms</a></li>
                    {isPathFrom('/platform/') ? null : <li><a href='/create'>Create</a></li>}
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