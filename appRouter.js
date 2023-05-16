const express = require('express');
const verifyRecaptchaToken = require('./utils/verifyRecaptchaToken');

//? create a new router
const router = express.Router();

//? define a route for submit form
router.post('/submit-form', async (req, res) => {
    try {

        const userToken = req.body.recaptchaToken;
        if (!userToken) {
            //? return error message the token is empty
            return res.status(400).json({ status: 'fail', message: 'please enter a token!' });
        }

        //? verify recaptcha token
        const isHuman = await verifyRecaptchaToken(userToken);

        if (isHuman) {
            //? handle form submission for legitimate user
            return res.status(200).json({ status: 'success', message: 'you are human!' });
        } else {
            //? return error message or do something else to prevent spam submissions
            return res.status(400).json({ status: 'fail', message: 'you are bot!' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'error!' });
    }
});

//? define a route for index.html
router.get('/form', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});

module.exports = router;

