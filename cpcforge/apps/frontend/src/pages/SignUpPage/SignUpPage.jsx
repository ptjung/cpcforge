import React from 'react';
import { Formik, Form } from 'formik';
import { InputField, Page } from '../../common';
import { api, validator } from '../../utils';
import styles from './SignUpPage.module.scss';

function SignUpPage() {
    
    const signupValidate = async (values) => {
        const errors = {};

        /* This block validates the first name field */
        const inFirstName = values.first_name.trim();
        if (!inFirstName) {
            errors.first_name = 'Required';
        }

        /* This block validates the last name field */
        const inLastName = values.last_name.trim();
        if (!inLastName) {
            errors.last_name = 'Required';
        }
    
        /* This block validates the username field */
        const inUsername = values.username.trim();
        if (!inUsername) {
            errors.username = 'Required';
        }
        else if (!validator['USERNAME'].test(inUsername)) {
            errors.username = 'Invalid username: must consist of 3 to 16 alphanumeric characters';
        }
        else {
            // Check if username is already taken
            await api.post('/api/check_identifier', { identifier: inUsername }).catch(() => {
                errors.username = 'This username has already been taken';
            });
        }
    
        /* This block validates the email field */
        const inEmail = values.email.trim();
        if (!inEmail) {
            errors.email = 'Required';
        }
        else if (!validator['EMAIL'].test(inEmail)) {
            errors.email = 'Invalid email address: must be a valid email address';
        }
        else {
            // Check if email is already taken
            await api.post('/api/check_identifier', { identifier: inEmail }).catch(() => {
                errors.email = 'This email has already been taken';
            });
        }
    
        /* This block validates the password field */
        const inPassword = values.password;
        const inConfirmPassword = values.confirm_password;
        if (!inPassword) {
            errors.password = 'Required';
        }
        else if (!validator['PASSWORD'].test(inPassword)) {
            errors.password = 'Invalid password: must consist of at least 8 alphanumerical characters';
        }
    
        /* This block validates the confirm password field */
        if (!inConfirmPassword) {
            errors.confirm_password = 'Required';
        }
        else if (inPassword !== inConfirmPassword) {
            errors.confirm_password = 'Invalid: password fields do not match'
        }
    
        // For form errors
        return errors;
    };
    
    const signupSubmitEvent = async (values, actions) => {
        /* This block registers the new user's data via the API */
        const user_vals = {
            first_name: values.first_name.trim(),
            last_name: values.last_name.trim(),
            username: values.username.trim(),
            email: values.email.trim(),
            password: values.password
        };
        await api.post('/api/users/create', user_vals);
        // proceed to be authed and return to homepage
    };

    return (
        <Page showNav={false}>
            <div className={styles['signup-box-wrapper']}>
                <div className={styles['signup-box']}>
                    <img src="static/images/logo_full.png" alt="Logo Full" />
                    <div className={styles['site-label']}>Sign Up</div>
                    <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        username: '',
                        email: '',
                        password: '',
                        confirm_password: '',
                    }}
                    validate={signupValidate}
                    validateOnChange={false}
                    onSubmit={signupSubmitEvent}
                    >
                        <Form className={styles['form-container']}>
                            <div className={styles['two-div-row']}>
                                <div>
                                    <InputField field="first_name" label="First Name *" />
                                </div>
                                <div>
                                    <InputField field="last_name" label="Last Name *" />
                                </div>
                            </div>

                            <InputField field="username" label="Username *" />
                            <InputField field="email" label="Email *" type="email" />
                            <InputField field="password" label="Password *" type="password" />
                            <InputField field="confirm_password" label="Confirm Password *" type="password" />

                            <div className={styles['form-bottom']}>
                                <button type="submit">Submit</button>
                                <a href="/login">Log In</a>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Page>
    );
}

export default SignUpPage;