import { SwitchOn } from "./SwitchOn";
import { SwitchState } from "./SwitchState";
import { OnOrOff } from "./OnOrOff";

export class SwitchOff extends SwitchState {
    constructor() {
        super(OnOrOff.Off);
    }
    get state(): OnOrOff {
        return this.state;
    }
    switch() {
        return new SwitchOn();
    }
}
