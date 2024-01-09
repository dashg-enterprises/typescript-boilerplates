import { Light } from "./other/StateMachine/Light";
import { Switch } from "./other/StateMachine/Switch";

const lightswitch = new Switch();
const light = new Light(lightswitch);
lightswitch.flip();
console.log(`We've flipped the switch to ${lightswitch.state}, so the light is also ${light.state}`);