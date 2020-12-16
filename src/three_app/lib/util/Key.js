import ev from "./Event";
import Constants from "../Constants";

const register_key_event = (dom_elm) => {
  const notify_keypressed = () => {
    dom_elm.addEventListener("keydown", (e) => {
      ev.notify(Constants.KEY_PRESSED_EVENT, e.key);
    });
  };
  const notify_keyreleased = () => {
    dom_elm.addEventListener("keyup", (e) => {
      ev.notify(Constants.KEY_RELEASED_EVENT, e.key);
    });
  };
  notify_keypressed();
  notify_keyreleased();
};

export default register_key_event;
