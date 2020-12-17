import ev from "./Event";
import Constants from "../Constants";

const register_key_event = (dom_elm) => {
  dom_elm.addEventListener("keydown", (e) => {
    ev.notify(Constants.EVENT.KEY.PRESSED, e.key);
  });
  dom_elm.addEventListener("keyup", (e) => {
    ev.notify(Constants.EVENT.KEY.RELEASED, e.key);
  });
};

export default register_key_event;
