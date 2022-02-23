import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, getTokenStatus, getPlatformTokenStatus } from '../../utils';
import styles from './ProblemBox.module.scss';

function ProblemBox() {
    const [username, setUsername] = useState('');
    const { handle: pltHandle, probHandle } = useParams();

	useEffect(async () => {
        const tokenStatus = await getTokenStatus();
		if (!tokenStatus?.['verified']) navigate("/login");
        const pltTokenStatus = await getPlatformTokenStatus(pltHandle);
        if (!pltTokenStatus?.['verified']) navigate("/list");
        setUsername(tokenStatus?.['payload']['username']);
	}, []);

    return (
        <div>{pltHandle}, {probHandle}</div>
    );
}

export default ProblemBox;