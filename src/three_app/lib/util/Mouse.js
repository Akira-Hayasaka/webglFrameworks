import * as THREE from "three";
import ev from "./Event";
import Constants from "../Constants";
import Globals from "../Globals";

const map_client_to_canvas = (cx, cy) => {
  return new THREE.Vector2(cx - Globals.APP_X, cy - Globals.APP_Y);
};

const get_arg = (e) => {
  const arg = {
    e,
    screen: new THREE.Vector2(e.clientX, e.clientY),
  };
  if (Globals.APP_RECT.is_inside(e.clientX, e.clientY)) {
    arg.canvas = map_client_to_canvas(e.clientX, e.clientY);
  }
  return arg;
};

const notify_mouse_event = () => {
  const notify_click = () => {
    document.addEventListener("click", (e) => {
      ev.notify(Constants.MOUSE_CLICK, get_arg(e));
    });
  };
  const notify_dblclick = () => {
    document.addEventListener("dblclick", (e) => {
      ev.notify(Constants.MOUSE_DBLCLICK, get_arg(e));
    });
  };
  const notify_mousedown = () => {
    document.addEventListener("mousedown", (e) => {
      ev.notify(Constants.MOUSE_DOWN, get_arg(e));
    });
  };
  const notify_mousemove = () => {
    document.addEventListener("mousemove", (e) => {
      //   console.log("click", e);
      ev.notify(Constants.MOUSE_MOVE, get_arg(e));
    });
  };
  const notify_mouseup = () => {
    document.addEventListener("mouseup", (e) => {
      ev.notify(Constants.MOUSE_UP, e.key);
    });
  };
  notify_click();
  notify_dblclick();
  notify_mousedown();
  notify_mousemove();
  notify_mouseup();
};

notify_mouse_event();
const mouse = 0;

export default mouse;
