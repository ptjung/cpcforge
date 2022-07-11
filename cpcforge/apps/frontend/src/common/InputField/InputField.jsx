import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './InputField.module.scss';

function InputField({ label, field, type }) {
    return (
        <label htmlFor={field} className={styles['field-container']}>
            <span>{label}</span>
            <Field id={field} name={field} type={type} />
            <span className={styles['error_span']}>
                <ErrorMessage name={field} />
            </span>
        </label>
    );
}

export default InputField;