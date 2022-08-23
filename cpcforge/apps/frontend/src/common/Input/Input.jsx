import React, { useEffect, useState } from 'react';
import { usePageContext } from '../../utils';
import styles from './Input.module.scss';

function Input({
    field,
    type,
    label,
    error,
    callback = () => {}
}) {
    const [input, setInput] = useState('')
    const pageContext = usePageContext();
    const displayError = (pageContext?.errors ?? []).includes(field);

    useEffect(() => {
        callback(input);
    }, [input]);

    return (
        <label htmlFor={field} className={styles['field-container']}>
            <span>{label}</span>
            <input
            id={field}
            name={field}
            type={type}
            value={input}
            onChange={(evt) => setInput(evt.target.value)}
            className={displayError ? styles['error-label'] : ''}
            />
            <span className={styles['error-span']}>
                {displayError ? error : ''}
            </span>
        </label>
    );
}

export default Input;