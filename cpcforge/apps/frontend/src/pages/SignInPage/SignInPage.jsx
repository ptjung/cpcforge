import React from 'react';
import { Field, Page } from '../../common';
import styles from './SignInPage.module.scss';

function SignInPage() {
    return (
        <Page showNav={false}>
            <div className={styles['login-box-wrapper']}>
                <div className={styles['login-box']}>
                    <img src="static/images/logo_full.png" alt="Logo Full" />
                    <div className={styles['site-label']}>Log In</div>
                    <div className={styles['form-container']}>
                        <Field name="identifier" label="Username / Email" />
                        <Field name="password" label="Password" type="password" />
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