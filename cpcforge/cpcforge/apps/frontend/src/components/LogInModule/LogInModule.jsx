import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { api, getTokenStatus, navigateAndRefresh } from "../../utils";
import styles from './LogInModule.module.scss';

function LogInModule() {
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    
	useEffect(async () => {
        const tokenStatus = await getTokenStatus();
		if (tokenStatus?.['verified']) navigate("/");
	}, []);

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
        navigateAndRefresh('/');
    };

    return (
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
                        <label htmlFor="identifier">Username / Email</label>
                        <div className={styles['field-container']}>
                            <Field id="identifier" name="identifier" />
                            <span><ErrorMessage name="identifier" /></span>
                        </div>

                        <label htmlFor="password">Password </label>
                        <div className={styles['field-container']}>
                            <Field id="password" name="password" type="password" />
                            <span><ErrorMessage name="password" /></span>
                        </div>

                        <div className={styles['form-bottom']}>
                            <button type="submit">Submit</button>
                            <a href="/signup">Sign Up</a>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default LogInModule;