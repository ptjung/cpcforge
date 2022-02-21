import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import api from "../../utils";
import styles from './LogInModule.module.scss';

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
    const res = await api.post('/api/users/retrieve', { identifier: {'$regex': inIdentifier, '$options': 'i'}, password: inPassword });

    if (!inIdentifier || (Object.keys(res.data).length <= 1)) {
        errors.identifier = 'Enter an existing username or email';
    }
    else if (!inPassword || !res.data['pwd_check']) {
        errors.password = 'The provided password is incorrect';
    }

    return errors;
};

const loginSubmitEvent = async (values, actions) => {
    await new Promise((r) => setTimeout(r, 500));
    alert(JSON.stringify(values, null, 2));
    actions.resetForm(loginInitValues);
};

function LogInModule() {
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