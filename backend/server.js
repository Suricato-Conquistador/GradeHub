require('./backup/scheduler');
require('dotenv').config({path: `${process.cwd()}/.env`});
const express = require('express');
const cors = require("cors");

const authRouter = require('./routes/authRouter');
const gradeRouter = require('./routes/gradeRouter');
const userRouter = require('./routes/userRouter');
const subjectRouter = require('./routes/subjectRouter');
const SubjectStudentsRouter = require('./routes/subjectStudentsRouter');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userPreferenceRouter = require('./routes/userPreferenceRouter');
const preferenceRouter = require('./routes/preferenceRouter');
const preferenceVersionRouter = require('./routes/preferenceVersionRouter');


const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/auth', authRouter);
app.use('/grade', gradeRouter);
app.use('/user', userRouter);
app.use('/subject', subjectRouter);
app.use('/subjectStudents', SubjectStudentsRouter);
app.use('/userPreference', userPreferenceRouter);
app.use('/preference', preferenceRouter);
app.use('/preferenceVersion', preferenceVersionRouter);


app.use(catchAsync(async (req, res, next) => {
        throw new AppError('Route does not exist', 404);
    })
);

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
