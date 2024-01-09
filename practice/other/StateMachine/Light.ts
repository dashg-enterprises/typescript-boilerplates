import { Switch } from "./Switch";

export class Light {
    switch: Switch;
    constructor(lightswitch: Switch) {
        this.switch = lightswitch;
    }
    get state() {
        return this.switch.state;
    }
}

