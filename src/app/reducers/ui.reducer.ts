import * as UI from "../actions/ui.action";

export interface State {
    isLoading: boolean
}
const defaultState = {
    isLoading: false
}
export const uiReducer = (state: State = defaultState, action: UI.uiActions) => {
    switch (action.type) {
        case UI.START:
            return { isLoading: true }
        case UI.END:
            return { isLoading: false }
        default:
            return state;

    }
}