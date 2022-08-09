import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { InputField, Page } from '../../common';
import { api } from '../../utils';
import styles from './SignInPage.module.scss';

function SignInPage() {
    const [usernameToAuth, setUsernameToAuth] = useState('');
    const [passwordToAuth, setPasswordToAuth] = useState('');

    const loginInitValues = {
        identifier: '',
        password: ''
    };
    
    const loginValidate = async (values) => {
        const errors = {};
    
        /* This block checks for wrong credentials */
        const inIdentifier = values.identifier.trim();
        const inPassword = values.password.trim();
    
        /* Check whether account exists by the identifier */
        const retrieveBody = { identifier: inIdentifier, password: inPassword };
        await api.post('/api/users', retrieveBody)
            .then(res => {
                setUsernameToAuth(res.data['username']);
                setPasswordToAuth(inPassword);
            }).catch(() => {
                errors.identifier = 'Enter an existing username or email';
            });
    
        // For form errors
        return errors;
    };
    
    const loginSubmitEvent = async (values, actions) => {
        const authBody = { username: usernameToAuth, password: passwordToAuth };
        await api.post('/api/users/authin', authBody);
    };

    return (
        <Page showNav={false}>
            <div className={styles['login-box-wrapper']}>
                <div className={styles['login-box']}>
                    <img src="static/images/logo_full.png" alt="Logo Full" />
                    <div className={styles['site-label']}>Log In</div>
                    <Formik
                    initialValues={loginInitValues}
                    validate={loginValidate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={loginSubmitEvent}
                    >
                        <Form className={styles['form-container']}>
                        
                            <InputField field="identifier" label="Username / Email" />
                            <InputField field="password" label="Password" type="password" />

                            <div className={styles['form-bottom']}>
                                <button type="submit">Submit</button>
                                <a href="/signup">Sign Up</a>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Page>
    );
}

export default SignInPage;