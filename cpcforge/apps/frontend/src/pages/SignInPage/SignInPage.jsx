import React from 'react';
import { Input, Page } from '../../common';
import styles from './SignInPage.module.scss';

function SignInPage() {
    return (
        <Page showNav={false}>
            <div className={styles['login-box-wrapper']}>
                <div className={styles['login-box']}>
                    <img src="static/images/logo_full.png" alt="Logo Full" />
                    <div className={styles['site-label']}>Log In</div>
                    <div className={styles['form-container']}>
                        <Input
                        field="identifier"
                        label="Username / Email"
                        error="Enter an existing username or email"
                        />
                        <Input
                        field="password"
                        label="Password"
                        type="password"
                        error="The provided password is incorrect"
                        />
                        <div className={styles['form-bottom']}>
                            <button type="submit">Submit</button>
                            <a href="/signup">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default SignInPage;