import {ErrorResponse} from "../interfaces/interfaces";

module.exports = (res, error) => {
    const errorResponse: ErrorResponse = {
        success: false,
        message: error.message ? error.message : error
    };
    res.status(500).json(errorResponse)
};
