const express = require('express');
const appRouter = require('./appRouter');

const app = express();

//? access the req.body
app.use(express.json());

//? serve static files from the "public" directory
app.use(express.static('public'));

//? config router 
//? appRoter
app.use('/', appRouter);

//! another route
app.use('/*', (req,res)=>{
    res.status(400).json({ status: 'fail', message: 'this route does not exist!' });
});

//? run server
app.listen(2023, () => {
    console.log('hi recaptcha!');
});




