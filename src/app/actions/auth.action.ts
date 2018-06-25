export const LOGIN = "Login";
export const LOGOUT = "Logout";
export class Login {
    readonly type = LOGIN;
}
export class Logout {
    readonly type = LOGOUT;
}
export type authActions = Login | Logout;