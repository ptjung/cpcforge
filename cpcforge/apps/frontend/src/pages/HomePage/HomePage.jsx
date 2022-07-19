import React from 'react';
import { Page } from '../../common';
import styles from './HomePage.module.scss';

function HomePage() {
    return (
        <Page>
            <div className={styles['home-module-wrapper']}>
                <img src="static/images/logo_full.png" alt="Logo Full" />
                <div>
                    <p>
                        <b>CPCForge</b> is a web platform for end users to create and customize their own online judge platforms with ease.
                        Aimed at helping smaller competitive programming organizations fluorish, CPCForge allows creating problems,
                        constraints, and test cases so that competitive programmers alike can creatively expand on their own ideas and
                        share them with others. This application is built with React.js, Django, and MongoDB.
                    </p>
                </div>
            </div>
        </Page>
    );
}

export default HomePage;