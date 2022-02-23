import axios from 'axios';

const api = axios.create({ baseUrl: process.env.BASE_URL });

async function getTokenStatus() {
    return (
        await api.post('/api/users/verify', { token: window.sessionStorage.getItem('token') })
			.then(res => res.data)
			.catch(err => {})
    );
}
async function getPlatformTokenStatus(platformHandle) {
    const reqBody = { token: window.sessionStorage.getItem('platform_token'), handle: platformHandle };
    return (
        await api.post('/api/platforms/verify', reqBody)
			.then(res => res.data)
			.catch(err => {})
    );
}

function navigateAndRefresh(urlPath) {
    window.location.href = urlPath;
}
function isPathFrom(urlPath) {
    return window.location.pathname.startsWith(urlPath);
}

export { api, getTokenStatus, getPlatformTokenStatus, navigateAndRefresh, isPathFrom };
