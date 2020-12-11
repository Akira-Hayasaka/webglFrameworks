import * as THREE from "three";
import ev from "./Event";
import Constants from "../Constants";
import Globals from "../Globals";

const notify_mouse_event = () => {
  const notify_click = () => {
    document.addEventListener("click", (e) => {
      // const v = {
      //     e,
      //     p: THREE.Vector2(e.clientx)
      // }
      ev.notify(Constants.MOUSE_CLICK, e.key);
    });
  };
  const notify_dblclick = () => {
    document.addEventListener("dblclick", (e) => {
      ev.notify(Constants.MOUSE_DBLCLICK, e.key);
    });
  };
  const notify_mousedown = () => {
    document.addEventListener("mousedown", (e) => {
      ev.notify(Constants.MOUSE_DOWN, e.key);
    });
  };
  const notify_mousemove = () => {
    document.addEventListener("mousemove", (e) => {
      //   console.log("click", e);
      ev.notify(Constants.MOUSE_MOVE, e.key);
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
