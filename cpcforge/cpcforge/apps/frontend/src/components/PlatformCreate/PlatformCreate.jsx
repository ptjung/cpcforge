import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenStatus } from '../../utils';

function PlatformCreate() {
    const navigate = useNavigate();

	useEffect(async () => {
        const tokenStatus = await getTokenStatus();
		if (!tokenStatus?.['alive']) navigate("/login");
	}, []);

    return (<div>platform create</div>);
}

export default PlatformCreate;