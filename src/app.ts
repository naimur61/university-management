import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import httpStatus from 'http-status';
// import {
//   generateFacultyId,
//   generateStudentId,
// } from './app/modules/user/user.utils';

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', router);

app.use(globalErrorHandler);

// Api Error Route Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;

// const academicSemester = {
//   code: '02',
//   year: '2023',
// };

// const testId = async () => {
//   // const id = await generateStudentId(academicSemester);
//   const id = await generateFacultyId();
//   console.log(id);
// };

// console.log(testId());
