import * as THREE from "three";
import ev from "./Event";
import Constants from "../Constants";
import Globals from "../Globals";
import { map } from "../util/Util";

const map_client_to_canvas = (cx, cy) => {
  // on device scale
  const dx = cx - Globals.APP_X;
  const dy = cy - Globals.APP_Y;
  // map to app scale
  return new THREE.Vector2(
    Math.round(map(dx, 0, Globals.APP_DEVICE_W, 0, Globals.APP_W, true)),
    Math.round(map(dy, 0, Globals.APP_DEVICE_H, 0, Globals.APP_H, true))
  );
};

const get_arg = (e) => {
  const arg = {
    e,
    screen: new THREE.Vector2(e.clientX, e.clientY),
    is_inside_canvas: false,
    canvas: new THREE.Vector2(0, 0),
  };
  if (Globals.APP_DEVICE_RECT) {
    if (Globals.APP_DEVICE_RECT.is_inside(e.clientX, e.clientY)) {
      arg.is_inside_canvas = true;
      arg.canvas = map_client_to_canvas(e.clientX, e.clientY);
    }
  }
  return arg;
};

const register_mouse_event = (dom_elm) => {
  dom_elm.addEventListener("click", (e) => {
    ev.notify(Constants.MOUSE_CLICK_EVENT, get_arg(e));
  });
  dom_elm.addEventListener("dblclick", (e) => {
    ev.notify(Constants.MOUSE_DBLCLICK_EVENT, get_arg(e));
  });
  dom_elm.addEventListener("mousedown", (e) => {
    ev.notify(Constants.MOUSE_DOWN_EVENT, get_arg(e));
  });
  dom_elm.addEventListener("mousemove", (e) => {
    ev.notify(Constants.MOUSE_MOVE_EVENT, get_arg(e));
  });
  dom_elm.addEventListener("mouseup", (e) => {
    ev.notify(Constants.MOUSE_UP_EVENT, get_arg(e));
  });
};

export default register_mouse_event;
