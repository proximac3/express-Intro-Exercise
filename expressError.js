// this is in a seperate js file.

class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;;
        this.status = status;
        console.error(this.stack)
    }
};

// export class
module.exports = ExpressError;