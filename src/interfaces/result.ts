export enum ActionStatus {
    Success,
    Error
}
export interface Result {
    status: ActionStatus;
    message: string;
    errorName?: string
}