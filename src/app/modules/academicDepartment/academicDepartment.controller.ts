import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import {
  academicDepartmentFilterableFields,
  academicDepartmentSearchableFields,
} from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';

const createDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicDepartment } = req.body;
  const result =
    await AcademicDepartmentService.createDepartmentToDB(academicDepartment);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Department Create Successful!',
    data: result,
  });
});

const updateDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicDepartment } = req.body;
  const id = req.params.id;
  const result = await AcademicDepartmentService.updateDepartmentToDB(
    id,
    academicDepartment,
  );

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Department Create Successful!',
    data: result,
  });
});

const getDepartments: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, academicDepartmentSearchableFields);

  const result = await AcademicDepartmentService.getDepartmentsFromDB(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Department retrieved successful!',
    meta: result.meta,
    data: result.data,
  });
});

const deleteDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.deleteDepartmentFromDB(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Department Deleted Successful!',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Department retrieve Successful!',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  getSingleDepartment,
};
