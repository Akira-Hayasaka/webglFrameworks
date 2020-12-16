import Hammer from "hammerjs";
import Constants from "../Constants";
import ev from "./Event";
import { s_log } from "../util/Screen_Logger";

let mc = null;

const register_touch_event = (dom_elm) => {
  mc = new Hammer(dom_elm);

  const log = (e) => {
    // s_log.push("touch event " + JSON.stringify(e));
    console.log("touch event " + JSON.stringify(e, null, 2));
  };

  mc.on("tap", (e) => {
    ev.notify(Constants.TOUCH_TAP_EVENT, e);
    log(e);
  });
  mc.on("doubletap", (e) => {
    ev.notify(Constants.TOUCH_DBLTAP_EVENT, e);
    log(e);
  });
  mc.on("pan", (e) => {
    ev.notify(Constants.TOUCH_PAN_EVENT, e);
    log(e);
  });
  mc.on("swipe", (e) => {
    ev.notify(Constants.TOUCH_SWIPE_EVENT, e);
    log(e);
  });
  mc.on("press", (e) => {
    ev.notify(Constants.TOUCH_PRESS_EVENT, e);
    log(e);
  });
  mc.on("pinch", (e) => {
    ev.notify(Constants.TOUCH_PINCH_EVENT, e);
    log(e);
  });
  mc.on("rotate ", (e) => {
    ev.notify(Constants.TOUCH_ROTATE_EVENT, e);
    log(e);
  });
};

export default register_touch_event;
