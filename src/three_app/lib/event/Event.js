import { EventDispatcher } from "three";

class Event extends EventDispatcher {}

let event = null;

const make_new_if_necessary = () => {
  if (event === null) {
    event = new Event();
  }
};

const ev = {
  add_listener: (key, callback) => {
    make_new_if_necessary();
    event.addEventListener(key, callback);
  },
  remove_listener: (key, callback) => {
    make_new_if_necessary();
    event.removeEventListener(key, callback);
  },
  has_listener: (key, callback) => {
    make_new_if_necessary();
    event.hasEventListener(key, callback);
  },
  notify: (key, val) => {
    make_new_if_necessary();
    event.dispatchEvent({ type: key, val });
  },
};

export default ev;
