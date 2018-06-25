import * as fromAuth from "./reducers/auth.reducer";
import * as fromTraining from "./reducers/training.reducer";
import * as fromUi from "./reducers/ui.reducer";
export interface State {
    ui: fromUi.State;
    training: fromTraining.State;
    auth: fromAuth.State;
}
export const reducers = {
    ui: fromUi.uiReducer,
    training: fromTraining.trainingReducer,
    auth: fromAuth.authReducer
}