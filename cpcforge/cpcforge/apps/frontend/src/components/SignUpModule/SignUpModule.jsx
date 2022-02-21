import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './SignUpModule.module.scss';

const signupInitValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const signupValidate = values => {
    const errors = {};

    /* This block validates the username field */
    const inUsername = values.username.trim();
    if (!inUsername) {
        errors.username = 'Required';
    }
    else if (!/^[A-Za-z0-9_]{3,16}$/i.test(inUsername)) {
        errors.username = 'Invalid username: must consist of 3 to 16 alphanumeric characters or \'_\'';
    }

    /* This block validates the email field */
    const inEmail = values.email.trim();
    if (!inEmail) {
        errors.email = 'Required';
    }
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i.test(inEmail)) {
        errors.email = 'Invalid email address: must be a valid email address consisting of \'@\' and \'.\'';
    }

    /* This block validates the password field */
    const inPassword = values.password;
    const inConfirmPassword = values.confirmPassword;
    if (!inPassword) {
        errors.password = 'Required';
    }
    else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(inPassword)) {
        errors.password = 'Invalid password: must consist of at least 8 characters with both a letter and number';
    }

    /* This block validates the confirm password field */
    if (!inConfirmPassword) {
        errors.confirmPassword = 'Required';
    }
    else if (inPassword !== inConfirmPassword) {
        errors.confirmPassword = 'Invalid: password fields do not match'
    }

    return errors;
};

const signupSubmitEvent = async (values, actions) => {
    await new Promise((r) => setTimeout(r, 500));
    alert(JSON.stringify(values, null, 2));
    actions.resetForm(signupInitValues);
};

function SignUpModule() {
    return (
        <div className={styles['signup-box-wrapper']}>
            <div className={styles['signup-box']}>
                <img src="static/images/logo_full.png" alt="Logo Full" />
                <div className={styles['site-label']}>Sign Up</div>
                <Formik
                initialValues={signupInitValues}
                validate={signupValidate}
                validateOnChange={false}
                onSubmit={signupSubmitEvent}
                >
                    <Form className={styles['form-container']}>
                        <label htmlFor="username">Username *</label>
                        <div class={styles['field-container']}>
                            <Field id="username" name="username" />
                            <span><ErrorMessage name="username" /></span>
                        </div>

                        <label htmlFor="email">Email *</label>
                        <div class={styles['field-container']}>
                            <Field
                            id="email"
                            name="email"
                            placeholder="jane@acme.com"
                            type="email"
                            />
                            <span><ErrorMessage name="email" /></span>
                        </div>

                        <label htmlFor="password">Password *</label>
                        <div class={styles['field-container']}>
                            <Field id="password" name="password" type="password" />
                            <span><ErrorMessage name="password" /></span>
                        </div>

                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <div class={styles['field-container']}>
                            <Field id="confirmPassword" name="confirmPassword" type="password" />
                            <span><ErrorMessage name="confirmPassword" /></span>
                        </div>

                        <div className={styles['form-bottom']}>
                            <button type="submit">Submit</button>
                            <a href="/login">Log In</a>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default SignUpModule;