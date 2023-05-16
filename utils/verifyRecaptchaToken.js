const axios = require('axios');
//sitekey = 6LdhDxMmAAAAAACA0Qg7pS1zoN4a-qbF3NJHVwXv
const recaptchaSecretKey = '6LdhDxMmAAAAAIOjui66DrgRjQciEPHpiZ7grvuR';

async function verifyRecaptchaToken(token) {
    try {

        if (!token) {
            console.error('token is empty!');
            return false;
        }

        //? send request to google recatcha
        const response = await axios({
            method: 'post',
            url: 'https://www.google.com/recaptcha/api/siteverify',
            params: {
                secret: recaptchaSecretKey,
                response: token
            }
        });

        //?log
        console.error(response.data);

        //? get response
        return response.data.success;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = verifyRecaptchaToken;