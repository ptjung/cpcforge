import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { api, getTokenStatus } from '../../utils';
import styles from './PlatformCreate.module.scss';

function PlatformCreate() {
    const [navmode, setNavmode] = useState(0);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

	useEffect(async () => {
        const tokenStatus = await getTokenStatus();
		if (!tokenStatus?.['alive']) navigate("/login");
        setUsername(tokenStatus?.['payload']['username']);
	}, []);

    const platcreateInitValues = {
        name: '',
        handle: '',
        contributors: '',
        password: ''
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
                errors.handle = 'This handle has already been taken'
            }
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
            mode: navmode
        };
        await api.post('/api/platforms/create', platform_vals)
            .then(res => {})
            .catch(err => {});

        // Navigate
        actions.resetForm(platcreateInitValues);
    };

    return (
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
    );
}

export default PlatformCreate;