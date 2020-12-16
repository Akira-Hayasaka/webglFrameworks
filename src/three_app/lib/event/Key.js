import ev from "./Event";
import Constants from "../Constants";

const register_key_event = (dom_elm) => {
  dom_elm.addEventListener("keydown", (e) => {
    ev.notify(Constants.KEY_PRESSED_EVENT, e.key);
  });
  dom_elm.addEventListener("keyup", (e) => {
    ev.notify(Constants.KEY_RELEASED_EVENT, e.key);
  });
};

export default register_key_event;
