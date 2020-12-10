import ev from "./Event";
import Constants from "../Constants";

const notify_key_event = () => {
  const notify_keypressed = () => {
    document.addEventListener("keydown", (e) => {
      ev.notify(Constants.KEY_PRESSED, e.key);
    });
  };
  const notify_keyreleased = () => {
    document.addEventListener("keyup", (e) => {
      ev.notify(Constants.KEY_RELEASED, e.key);
    });
  };
  notify_keypressed();
  notify_keyreleased();
};

notify_key_event();
const key = 0;

export default key;
