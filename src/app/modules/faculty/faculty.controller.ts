import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { RequestHandler } from 'express';
import paginationKey from '../../../constants/constants';
import pick from '../../../shared/pick';
import { IFaculty } from './faculty.Interface';
import httpStatus from 'http-status';
import { facultyFilterableFields } from './faculty.constants';
import { FacultyService } from './faculty.service';

const getAllFaculty: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationKey);

  const result = await FacultyService.getAllFacultyFromDB(
    filters,
    paginationOptions,
  );

  sendResponse<IFaculty[]>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Faculty retried successful.',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const FacultyID = req.params.id;
  const result = await FacultyService.getSingleFacultyFromDB(FacultyID);

  sendResponse<IFaculty>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Faculty retried successful.',
    data: result,
  });
});

const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await FacultyService.deleteFacultyFromDB(id);

  sendResponse<IFaculty>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Faculty Deleted successful!',
    data: result,
  });
});

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const result = await FacultyService.updateFacultyToDB(id, body);

  sendResponse<IFaculty>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successful.',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
