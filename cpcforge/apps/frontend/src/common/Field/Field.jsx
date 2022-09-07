import React, { useEffect, useState } from 'react';
import { usePageContext } from '../../utils';
import styles from './Field.module.scss';

function Field({
    name,
    type,
    label,
    addon = null,
    required = false,
    populateOnError = true,
}) {
    const [content, setContent] = useState("");

    const pageContext = usePageContext();
    const errors = pageContext?.errors?.[name] ?? [];
    const displayError = errors.length > 0;

    useEffect(() => {
        if (populateOnError) setContent(pageContext?.fields?.[name] ?? "");
    }, [pageContext]);

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
                value={content}
                onChange={evt => setContent(evt.target.value)}
                className={displayError ? styles['error-label'] : ''}
                autoComplete={`current-${name}`}
                />
                {addon ? (
                <span className={styles['addon-wrapper']}>
                    {addon}
                </span>
                ) : null}
            </span>
            <span className={styles['error-span']}>
                {displayError ? errors[0].message : ''}
            </span>
        </label>
    );
}

export default Field;