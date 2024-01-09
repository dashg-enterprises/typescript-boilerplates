import { SwitchOff } from "./SwitchOff";
import { SwitchState } from "./SwitchState";


export class Switch {
    private _state: SwitchState;
    get state() {
        return this._state.value;
    }
    constructor() {
        this._state = new SwitchOff();
    }
    flip() {
        this._state = this._state.switch();
        return this._state.value;
    }
}
