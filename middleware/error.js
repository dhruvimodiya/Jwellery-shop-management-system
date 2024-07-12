const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong mongoDB Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    //mongoose duplicate key error
    if (err.statuscode === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }

    //wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is Invalid , Try again`
        err = new ErrorHandler(message, 400)
    }
    // JWT Expire Error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expire , Try again`
        err = new ErrorHandler(message, 400)
    }
    res.status(err.statuscode).json({
        success: false,
        message: err.message
    })
}