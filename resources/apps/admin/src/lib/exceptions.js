// @ts-nocheck
export class GenericException extends Error {}


export class ApiException extends GenericException {
    constructor(message, status = 500) {
        super()
        this.status = status
        this.message = message
    }
}
