import ServerInternalError from "../errors/ServerInternalError.js";

function errorHandler(error, req, res, next) {
    new ServerInternalError().sendResponse(res);
}

export default errorHandler;