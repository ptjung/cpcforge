import React from 'react';
import { usePageContext } from '../../utils';
import styles from './Field.module.scss';

function Field({
    name,
    type,
    label,
    addon = null,
    required = false,
}) {
    const pageContext = usePageContext();
    const fieldErrors = pageContext?.errors?.[name] ?? [];
    const displayError = fieldErrors.length > 0;

    return (
        <label htmlFor={name} className={styles['field-container']}>
            <span>
                {label}
                {required ? (<span className={styles['required']}> *</span>) : ""}
            </span>
            <span className={styles['input-wrapper']}>
                <input
                id={name}
                name={name}
                type={type}
                className={displayError ? styles['error-label'] : ''}
                />
                {addon ? (
                <span className={styles['addon-wrapper']}>
                    {addon}
                </span>
                ) : null}
            </span>
            <span className={styles['error-span']}>
                {displayError ? fieldErrors[0].message : ''}
            </span>
        </label>
    );
}

export default Field;