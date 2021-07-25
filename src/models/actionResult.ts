import { ActionStatus, Result } from "../interfaces/result";

export class ActionResult implements Result {
    status: ActionStatus;
    message: string;
    errorName: string;

    constructor(status: ActionStatus, messsage: string, errorName?: string) {
        this.status = status;
        this.message = messsage;
        this.errorName = errorName;
    }
}