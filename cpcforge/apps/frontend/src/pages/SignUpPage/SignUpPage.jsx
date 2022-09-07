import React, { useState } from 'react';
import { Field, Page, PasswordToggler } from '../../common';
import styles from './SignUpPage.module.scss';

function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Page showNav={false}>
            <div className={styles['signup-box-wrapper']}>
                <div className={styles['signup-box']}>
                    <img src="static/images/logo_full.png" alt="Logo Full" />
                    <div className={styles['site-label']}>Sign Up</div>
                    <div className={styles['form-container']}>
                        <div className={styles['two-div-row']}>
                            <div>
                                <Field name="first_name" label="First Name" required />
                            </div>
                            <div>
                                <Field name="last_name" label="Last Name" required />
                            </div>
                        </div>

                        <Field name="username" label="Username" required />
                        <Field name="email" label="Email" type="email" required />
                        <Field
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        addon={<PasswordToggler handler={setShowPassword} />}
                        required
                        />

                        <div className={styles['form-bottom']}>
                            <button type="submit">Submit</button>
                            <a href="/login">Log In</a>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default SignUpPage;