require('dotenv').config({path: `${process.cwd()}/.env`});
const express = require('express');

const authRouter = require('./routes/authRouter');

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "REST API is working"
    });
});

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
