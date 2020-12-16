import Hammer from "hammerjs";
import s_log from "../util/Screen_Logger";

let mc = null;

const register_touch_event = (dom_elm) => {
  mc = new Hammer.Manager(dom_elm);

  mc.on("tap", (ev) => {
    s_log.push("tap " + ev.scale);
  });
  mc.on("doubletap", (ev) => {
    s_log.push("doubletap " + ev.scale);
  });
  mc.on("pan", (ev) => {
    s_log.push("pan " + ev.scale);
  });
  mc.on("swipe", (ev) => {
    s_log.push("swipe " + ev.scale);
  });
  mc.on("press", (ev) => {
    s_log.push("press " + ev.scale);
  });
  mc.on("pinch", (ev) => {
    s_log.push("pinch " + ev.scale);
  });
  mc.on("rotate ", (ev) => {
    s_log.push("rotate " + ev.scale);
  });
};

export default register_touch_event;
