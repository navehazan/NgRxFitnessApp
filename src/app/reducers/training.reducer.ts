import { Exercise } from './../models/exercise.model';
import * as TRAINING from "../actions/training.action";

export interface State {
    pastExercices: Exercise[];
    availableExercise: Exercise[];
    currentExersice: Exercise;
}
const defaultState = {
    pastExercices: [],
    availableExercise: [],
    currentExersice: null
}
export const trainingReducer = (state: State = defaultState, action: TRAINING.trainingActions) => {
    switch (action.type) {
        case TRAINING.SET_AVIABLE_EXERSICES:
            return { ...state, availableExercise: action.payload }
        case TRAINING.SET_PAST_EXERSICES:
            return { ...state, pastExercices: action.payload }
        case TRAINING.SET_CURRENT_EXERSICES:
            return { ...state, currentExersice: action.payload }
        default:
            return state;
    }
}