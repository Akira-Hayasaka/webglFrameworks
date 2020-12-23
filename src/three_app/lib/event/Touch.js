import * as THREE from "three";
import Hammer from "hammerjs";
import Constants from "../Constants";
import ev from "./Event";
import { map_device_to_canvas } from "../util/Util";
import { draw_canvas_string } from "../util/Screen_Logger";

const get_arg = (e) => {
  const x = e.center.x;
  const y = e.center.y;
  delete e.center;
  e.device_pos = new THREE.Vector2(x, y);
  e.canvas_pos = map_device_to_canvas(x, y);
  return e;
};

const register_touch_event = (dom_elm) => {
  const mc = new Hammer(dom_elm);

  const log = (e) => {
    // draw_canvas_string.push("touch event " + JSON.stringify(e));
    // console.log("touch event " + JSON.stringify(e, null, 2));
  };

  mc.on("tap", (e) => {
    ev.notify(Constants.EVENT.TOUCH.TAP, get_arg(e));
    log(e);
  });
  mc.on("doubletap", (e) => {
    ev.notify(Constants.EVENT.TOUCH.DBLTAP, get_arg(e));
    log(e);
  });
  mc.on("pan", (e) => {
    ev.notify(Constants.EVENT.TOUCH.PAN, get_arg(e));
    log(e);
  });
  mc.on("swipe", (e) => {
    ev.notify(Constants.EVENT.TOUCH.SWIPE, get_arg(e));
    log(e);
  });
  mc.on("press", (e) => {
    ev.notify(Constants.EVENT.TOUCH.PRESS, get_arg(e));
    log(e);
  });
  mc.on("pinch", (e) => {
    ev.notify(Constants.EVENT.TOUCH.PINCH, get_arg(e));
    log(e);
  });
  mc.on("rotate ", (e) => {
    ev.notify(Constants.EVENT.TOUCH.ROTATE, get_arg(e));
    log(e);
  });
};

export default register_touch_event;
