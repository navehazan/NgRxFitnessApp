import { Exercise } from "../models/exercise.model";

export const SET_PAST_EXERSICES = "Set past exersices";
export const SET_AVIABLE_EXERSICES = "Set aviable exersices";
export const SET_CURRENT_EXERSICES = "Set current exersices";
export const STOP_CURRENT_EXERSICES = "Stop current exersices";
export class SetPastExersices {
    readonly type = SET_PAST_EXERSICES;
    constructor(public payload: Exercise[]) { }

}
export class SetAviableExersices {
    readonly type = SET_AVIABLE_EXERSICES;
    constructor(public payload: Exercise[]) { }
}
export class SetCurrentExersice {
    readonly type = SET_CURRENT_EXERSICES;
    constructor(public payload: string) { }
}
export class StopCurrentExersice {
    readonly type = STOP_CURRENT_EXERSICES;
}
export type trainingActions = SetPastExersices | SetAviableExersices | SetCurrentExersice | StopCurrentExersice;