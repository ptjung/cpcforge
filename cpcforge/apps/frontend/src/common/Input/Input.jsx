import React from 'react';
import { usePageContext } from '../../utils';
import styles from './Input.module.scss';

function Input({
    field,
    type,
    label,
}) {
    const pageContext = usePageContext();
    const fieldErrors = pageContext?.errors?.[field] ?? [];
    const displayError = fieldErrors.length > 0;

    return (
        <label htmlFor={field} className={styles['field-container']}>
            <span>{label}</span>
            <input
            id={field}
            name={field}
            type={type}
            className={displayError ? styles['error-label'] : ''}
            />
            <span className={styles['error-span']}>
                {displayError ? fieldErrors[0].message : ''}
            </span>
        </label>
    );
}

export default Input;