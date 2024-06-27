import { Request } from "express";
import { EmployeePayload } from "./employePayLoad";
import { UserPayload } from "./userPayLoad";

export interface AuthRequestEmployee extends Request {
    employeeData?: EmployeePayload;
}

export interface AuthRequestUser extends Request {
    userData?: UserPayload;
}