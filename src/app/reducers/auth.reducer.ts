import * as AUTH from "../actions/auth.action";
export interface State {
    isAuth: boolean
}
const defaultState = {
    isAuth: false
}
export const authReducer = (state: State = defaultState, action: AUTH.authActions) => {
    switch (action.type) {
        case AUTH.LOGIN:
            return { isAuth: true };
        case AUTH.LOGOUT:
            return { isAuth: false };
        default:
            return state;
    }
}