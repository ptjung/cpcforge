import React from 'react';
import { usePageContext } from '../../utils';
import styles from './Field.module.scss';

function Field({
    name,
    type,
    label,
}) {
    const pageContext = usePageContext();
    const fieldErrors = pageContext?.errors?.[name] ?? [];
    const displayError = fieldErrors.length > 0;

    return (
        <label htmlFor={name} className={styles['field-container']}>
            <span>{label}</span>
            <input
            id={name}
            name={name}
            type={type}
            className={displayError ? styles['error-label'] : ''}
            />
            <span className={styles['error-span']}>
                {displayError ? fieldErrors[0].message : ''}
            </span>
        </label>
    );
}

export default Field;