class ServerInternalError extends Error{
    constructor(message = "Erro interno do servidor", statusCode = 500, name) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
    }

    sendResponse(res) {
        return res.status(this.statusCode).json({
            name: this.name,
            message: this.message,
            status: this.statusCode
        });
    }
}

export default ServerInternalError;