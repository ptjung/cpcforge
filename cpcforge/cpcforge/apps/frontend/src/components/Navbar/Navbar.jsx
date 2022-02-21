import React from 'react';
import styles from './Navbar.module.scss';

function Navbar() {
    return (
        <div className={styles['navbar-wrapper']}>
            <nav className={styles['navbar']}>
                <a href='/' className={styles['navbar-logo']} />
                <ul className={styles['nav-item-coll']}>
                    <li><a href='/list'>Platforms</a></li>
                    <li><a href='/create'>Create</a></li>
                </ul>
                <ul className={styles['nav-item-coll']}>
                    <li><a href='/login'>Log In</a></li>
                    <li><a href='/signup'>Sign Up</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;