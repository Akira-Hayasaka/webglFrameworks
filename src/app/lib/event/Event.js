import { EventDispatcher } from "three";

const event = new EventDispatcher();

const ev = {
  add_listener: (key, callback) => {
    event.addEventListener(key, callback);
  },
  remove_listener: (key, callback) => {
    event.removeEventListener(key, callback);
  },
  has_listener: (key, callback) => {
    event.hasEventListener(key, callback);
  },
  notify: (key, val) => {
    event.dispatchEvent({ type: key, val });
  },
};

export default ev;
