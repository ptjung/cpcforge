const TESTERS = {
    "sign_up_realname": [
        {
            message: "Required",
            test_fn: (expr) => expr.trim().length === 0,
        },
    ],
    "sign_up_username": [
        {
            message: "Required",
            test_fn: (expr) => expr.trim().length === 0,
        },
        {
            message: "Invalid username: must consist of 3 to 16 alphanumeric characters",
            test_fn: (expr) => !validator['USERNAME'].test(expr.trim()),
        },
        {
            message: "This username has already been taken",
            test_fn: async (expr) => {
                return await api.post('/api/check_identifier', { identifier: expr })
                .then(() => {
                    return false;
                })
                .catch(() => {
                    return true;
                })
            },
        },
    ],
    "sign_up_email": [
        {
            message: "Required",
            test_fn: (expr) => expr.trim().length === 0,
        },
        {
            message: "Invalid email address: must be a valid email address",
            test_fn: (expr) => !validator['EMAIL'].test(expr.trim()),
        },
        {
            message: "This username has already been taken",
            test_fn: async (expr) => {
                return await api.post('/api/check_identifier', { identifier: expr })
                .then(() => {
                    return false;
                })
                .catch(() => {
                    return true;
                })
            },
        },
    ],
};

const errors = (key) => TESTERS[key];

export default errors;