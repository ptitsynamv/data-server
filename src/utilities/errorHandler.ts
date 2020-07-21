import {ErrorResponse} from "../interfaces/interfaces";
import {Response} from "express";

module.exports = (res: Response, error) => {
    const errorResponse: ErrorResponse = {
        status: 500,
        message: error.message ? error.message : error
    };
    res.status(500).json(errorResponse)
};
