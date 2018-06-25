export const START = "Start";
export const END = "End";
export class Start {
    readonly type = START;
}
export class End {
    readonly type = END;
}
export type uiActions = Start | End;