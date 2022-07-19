import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Page } from '../../common';
import { api } from '../../utils';
import styles from './PlatformCreatePage.module.scss';

function PlatformCreatePage() {
    const [navmode, setNavmode] = useState(0);
    const [username, setUsername] = useState('');

	useEffect(async () => {
        // navigate to /login if not authed
        setUsername(tokenStatus?.['payload']['username']);
	}, []);

    const platcreateInitValues = {
        name: '',
        handle: '',
        contributors: '',
        password: '',
        description: ''
    };
    
    const platcreateValidate = async (values) => {
        const errors = {};
    
        /* This block validates the platform name field */
        const inName = values.name.trim();
        if (!inName) {
            errors.name = 'Required';
        }
        else if (!/^[\x00-\x7F]{1,100}$/i.test(inName)) {
            errors.name = 'Invalid platform name: must consist of 1 to 100 ASCII characters';
        }

        /* This block validates the platform handle field */
        const inHandle = values.handle.trim();
        if (!inHandle) {
            errors.handle = 'Required';
        }
        else if (!/^[A-Za-z0-9]{1,36}$/i.test(inHandle)) {
            errors.handle = 'Invalid handle: must consist of 1 to 36 alphanumerical characters';
        }
        else {
            // Check if platform handle is already taken
            const res = await api.post('/api/platforms/retrieve', { handle: inHandle });
            if (Object.keys(res.data).length > 1) {
                errors.handle = 'This handle has already been taken';
            }
        }
        
        /* This block validates the description field */
        const inDescription = values.description;
        if (inDescription && !/^[\x00-\x7F]{1,500}$/i.test(inDescription)) {
            errors.description = 'Invalid description: can contain only up to 500 ASCII characters';
        }
        
        /* This block validates the password field */
        const inPassword = values.password;
        if (inPassword && !/^[\x00-\x7F]{1,255}$/i.test(inPassword)) {
            errors.password = 'Invalid password: can contain only up to 255 ASCII characters';
        }
    
        // For form errors
        return errors;
    };
    
    const platcreateSubmitEvent = async (values, actions) => {
        /* This block registers the new platforms's data via the API */
        const platform_vals = {
            username: username,
            name: values.name.trim(),
            handle: values.handle.trim(),
            contributors: values.contributors.trim(),
            password: values.password,
            description: values.description.trim(),
            mode: navmode
        };
        await api.post('/api/platforms/create', platform_vals)
            .then(res => {})
            .catch(err => {});

        // Navigate
        actions.resetForm(platcreateInitValues);
        // navigate to /list
    };

    return (
        <Page>
            <div className={styles['platcreate-box-wrapper']}>
                <Formik
                initialValues={platcreateInitValues}
                validate={platcreateValidate}
                validateOnChange={false}
                onSubmit={platcreateSubmitEvent}
                >
                    <>
                        <div className={styles['platcreate-box']}>
                            <div className={styles['site-label']}>Create a Platform</div>
                            <Form className={styles['form-container']}>
                                <label htmlFor="name">Platform Name *</label>
                                <div className={styles['field-container']}>
                                    <Field id="name" name="name" />
                                    <span><ErrorMessage name="name" /></span>
                                </div>

                                <label htmlFor="handle">Handle *</label>
                                <div className={styles['field-container']}>
                                    <Field id="handle" name="handle" />
                                    <span><ErrorMessage name="handle" /></span>
                                </div>

                                <label htmlFor="contributors">Contributors</label>
                                <div className={styles['field-container']}>
                                    <Field id="contributors" name="contributors" />
                                    <div className={styles['note']}>
                                        Note: any contributors to list must have their usernames separated by commas (',')
                                    </div>
                                </div>

                                <label htmlFor="password">Password</label>
                                <div className={styles['field-container']}>
                                    <Field id="password" name="password" />
                                    <span><ErrorMessage name="password" /></span>
                                </div>

                                <label htmlFor="description">Description</label>
                                <div className={styles['field-container']}>
                                    <Field id="description" name="description" component="textarea" />
                                    <span><ErrorMessage name="description" /></span>
                                </div>

                                <div className={styles['form-bottom']}>
                                    <button type="submit">Create</button>
                                </div>
                            </Form>
                        </div>
                        <div className={styles['platcreate-box']}>
                            <div className={styles['site-label']}>Customization</div>
                            <Form className={styles['form-container']}>
                                <label htmlFor="navbar-optn">Navigation Bar Modes</label>
                                <div className={styles['field-container']}>
                                    <div className={styles['customizer']}>
                                        <label>
                                            <input type="radio" name="navmode" onClick={() => setNavmode(0)} />
                                            <img src="static/images/cstm_nav/mode0.png" />
                                        </label>
                                        <label>
                                            <input type="radio" name="navmode" onClick={() => setNavmode(1)} />
                                            <img src="static/images/cstm_nav/mode1.png" />
                                        </label>
                                        <label>
                                            <input type="radio" name="navmode" onClick={() => setNavmode(2)} />
                                            <img src="static/images/cstm_nav/mode2.png" />
                                        </label>
                                        <label>
                                            <input type="radio" name="navmode" onClick={() => setNavmode(3)} />
                                            <img src="static/images/cstm_nav/mode3.png" />
                                        </label>
                                        <label>
                                            <input type="radio" name="navmode" onClick={() => setNavmode(4)} />
                                            <img src="static/images/cstm_nav/mode4.png" />
                                        </label>
                                        <label>
                                            <input type="radio" name="navmode" onClick={() => setNavmode(5)} />
                                            <img src="static/images/cstm_nav/mode5.png" />
                                        </label>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </>
                </Formik>
            </div>
        </Page>
    );
}

export default PlatformCreatePage;