import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { InputField, Page } from '../../common';
import { api } from '../../utils';
import styles from './SignInPage.module.scss';

function SignInPage() {
    const [token, setToken] = useState('');

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
        const retrieveBody = { identifier: {'$regex': `^${inIdentifier}$`, $options: 'i' }, password: inPassword };
        const res = await api.post('/api/users/retrieve', retrieveBody);
        if (!inIdentifier || (Object.keys(res.data).length <= 1)) {
            errors.identifier = 'Enter an existing username or email';
        }
        else if (!inPassword || !(res.data.hasOwnProperty('token'))) {
            errors.password = 'The provided password is incorrect';
        }
        else {
            setToken(res.data['token']);
        }
    
        // For form errors
        return errors;
    };
    
    const loginSubmitEvent = async (values, actions) => {
        window.sessionStorage.setItem('token', token);

        // Navigate
        actions.resetForm(loginInitValues);
        // proceed to be authed and return to page from before
    };

    return (
        <Page>
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