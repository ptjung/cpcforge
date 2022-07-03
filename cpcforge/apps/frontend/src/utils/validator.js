export default class Validator {
    static USERNAME = /^[A-Za-z0-9_]{3,16}$/i;
    static EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i;
    static PASSWORD = /^[A-Za-z\d]{8,}$/i;
};