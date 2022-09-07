import React, { useEffect, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import styles from './PasswordToggler.module.scss';

function PasswordToggler({ handler = null }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        handler(show);
    }, [show]);

    const switchShowMode = () => {
        setShow(!show);
    };

    return (
        <span onClick={switchShowMode} className={styles['toggler-wrapper']}>
            {
            show
            ? <AiOutlineEyeInvisible size={24} />
            : <AiOutlineEye size={24} />
            }
        </span>
    );
};

export default PasswordToggler;