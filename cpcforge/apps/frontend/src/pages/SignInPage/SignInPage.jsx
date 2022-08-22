import React, { useState } from 'react';
import { Navigate, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, Form, FormikProvider } from 'formik';
import { InputField, Page } from '../../common';
import { api, usePageContext } from '../../utils';
import styles from './SignInPage.module.scss';

const LOGIN_INIT_VALUES = {
    identifier: '',
    password: '',
};

function SignInPage() {

    const pageContext = usePageContext();
    const loginSubmit = () => {};

    console.log(pageContext);

    return (
        <Page showNav={false}>
            <div className={styles['login-box-wrapper']}>
                <div className={styles['login-box']}>
                    <img src="static/images/logo_full.png" alt="Logo Full" />
                    <div className={styles['site-label']}>Log In</div>
                    <Formik
                    initialValues={LOGIN_INIT_VALUES}
                    onSubmit={loginSubmit}
                    >
                        <div className={styles['form-container']}>
                            <InputField field="identifier" label="Username / Email" />
                            <InputField field="password" label="Password" type="password" />
                            <div className={styles['form-bottom']}>
                                <button type="submit">Submit</button>
                                <a href="/signup">Sign Up</a>
                            </div>
                        </div>
                    </Formik>
                </div>
            </div>
        </Page>
    );
}

export default SignInPage;