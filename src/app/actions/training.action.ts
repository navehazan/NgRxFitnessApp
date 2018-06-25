import { Exercise } from "../models/exercise.model";

export const SET_PAST_EXERSICES = "Set past exersices";
export const SET_AVIABLE_EXERSICES = "Set aviable exersices";
export class SetPastExersices {
    readonly type = SET_PAST_EXERSICES;
    constructor(public payload: Exercise[]) { }

}
export class SetAviableExersices {
    readonly type = SET_AVIABLE_EXERSICES;
    constructor(public payload: Exercise[]) { }
}
export type trainingActions = SetPastExersices | SetAviableExersices;