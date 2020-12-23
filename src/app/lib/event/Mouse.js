import * as THREE from "three";
import ev from "./Event";
import Constants from "../Constants";
import Globals from "../Globals";
import { map_device_to_canvas } from "../util/Util";

const get_arg = (e) => {
  const arg = {
    e,
    device: new THREE.Vector2(e.clientX, e.clientY),
    is_inside_canvas: false,
    canvas: new THREE.Vector2(0, 0),
  };
  if (Globals.APP_DEVICE_RECT) {
    if (Globals.APP_DEVICE_RECT.is_inside(e.clientX, e.clientY)) {
      arg.is_inside_canvas = true;
      arg.canvas = map_device_to_canvas(e.clientX, e.clientY);
    }
  }
  return arg;
};

const register_mouse_event = (dom_elm) => {
  dom_elm.addEventListener("click", (e) => {
    ev.notify(Constants.EVENT.MOUSE.CLICK, get_arg(e));
  });
  dom_elm.addEventListener("dblclick", (e) => {
    ev.notify(Constants.EVENT.MOUSE.DBLCLICK, get_arg(e));
  });
  dom_elm.addEventListener("mousedown", (e) => {
    ev.notify(Constants.EVENT.MOUSE.DOWN, get_arg(e));
  });
  dom_elm.addEventListener("mousemove", (e) => {
    ev.notify(Constants.EVENT.MOUSE.MOVE, get_arg(e));
  });
  dom_elm.addEventListener("mouseup", (e) => {
    ev.notify(Constants.EVENT.MOUSE.UP, get_arg(e));
  });
};

export default register_mouse_event;
