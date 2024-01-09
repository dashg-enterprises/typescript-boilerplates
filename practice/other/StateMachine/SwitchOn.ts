import { SwitchState } from "./SwitchState";
import { OnOrOff } from "./OnOrOff";
import { SwitchOff } from "./SwitchOff";

export class SwitchOn extends SwitchState {
    constructor() {
        super(OnOrOff.On);
    }
    get state(): OnOrOff {
        return this.state;
    }
    switch(): SwitchState {
        return new SwitchOff();
    }
}
