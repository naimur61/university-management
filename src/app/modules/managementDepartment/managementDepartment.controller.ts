import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ManagementDepartmentService } from './managementDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import {
  managementDepartmentFilterableFields,
  managementDepartmentSearchableFields,
} from './managementDepartment.constant';
import { IManagementDepartment } from './managementDepartment.interface';

const createDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { ...ManagementDepartment } = req.body;
  const result =
    await ManagementDepartmentService.createDepartmentToDB(
      ManagementDepartment,
    );

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Department Create Successful!',
    data: result,
  });
});

const updateDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { ...ManagementDepartment } = req.body;
  const id = req.params.id;
  const result = await ManagementDepartmentService.updateDepartmentToDB(
    id,
    ManagementDepartment,
  );

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Department Create Successful!',
    data: result,
  });
});

const getDepartments: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, managementDepartmentFilterableFields);
  const paginationOptions = pick(
    req.query,
    managementDepartmentSearchableFields,
  );

  const result = await ManagementDepartmentService.getDepartmentsFromDB(
    filters,
    paginationOptions,
  );

  sendResponse<IManagementDepartment[]>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Department retrieved successful!',
    meta: result.meta,
    data: result.data,
  });
});

const deleteDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ManagementDepartmentService.deleteDepartmentFromDB(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Department Deleted Successful!',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ManagementDepartmentService.getSingleDepartment(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Department retrieve Successful!',
    data: result,
  });
});

export const ManagementDepartmentController = {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  getSingleDepartment,
};
