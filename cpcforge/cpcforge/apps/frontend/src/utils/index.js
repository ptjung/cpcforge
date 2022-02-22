import axios from 'axios';

const api = axios.create({ baseUrl: process.env.BASE_URL });
async function getTokenStatus() {
    return (
        await api.post('/api/users/verify', { token: window.sessionStorage.getItem('token') })
			.then(res => res.data)
			.catch(err => {})
    );
}

export { api, getTokenStatus };
