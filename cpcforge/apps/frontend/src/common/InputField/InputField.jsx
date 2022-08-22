import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './InputField.module.scss';

function InputField({
    field,
    type,
    label = '',
    value = '',
    hidden = false,
    callback = () => {}
}) {
    const [input, setInput] = useState(value)

    useEffect(() => {
        callback(input);
    }, [input]);

    return (
        hidden ?
        <Field
        id={field}
        name={field}
        value={input}
        />
        :
        <label htmlFor={field} className={styles['field-container']}>
            <span>{label}</span>
            <Field
            id={field}
            name={field}
            type={type}
            value={input}
            onChange={(evt) => setInput(evt.target.value)}
            />
            <span className={styles['error_span']}>
                <ErrorMessage name={field} />
            </span>
        </label>
    );
}

export default InputField;