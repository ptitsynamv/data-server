import {ErrorResponse} from "../interfaces/interfaces";
import {Response} from "express";

module.exports = (res: Response, error) => {
    const errorResponse: ErrorResponse = {
        success: false,
        message: error.message ? error.message : error
    };
    res.status(500).json(errorResponse)
};
