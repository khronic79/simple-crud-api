class ControllerError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = 'CTRLERR'
    }
}

module.exports = {
    ControllerError
}