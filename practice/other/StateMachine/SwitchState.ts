import { OnOrOff } from "./OnOrOff";

export abstract class SwitchState {
    private _value: OnOrOff;
    constructor(state: OnOrOff) {
        this._value = state;
    }
    get value(): OnOrOff {
        return this._value;
    }
    abstract switch(): SwitchState;
}
