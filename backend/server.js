require('dotenv').config({path: `${process.cwd()}/.env`});
const express = require('express');

const authRouter = require('./routes/authRouter');
const gradeRouter = require('./routes/gradeRouter');
const userRouter = require('./routes/userRouter');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/auth', authRouter);
app.use('/grade', gradeRouter);
app.use('/user', userRouter);

app.use(catchAsync(async (req, res, next) => {
        throw new AppError('Route does not exist', 404);
    })
);

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
