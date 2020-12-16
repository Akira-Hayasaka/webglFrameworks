import { OrthographicCamera, PerspectiveCamera } from "three";
import Constants from "../Constants";
import Globals from "../Globals";
import ev from "../event/Event";
import { debounce } from "../util/Util";

class Camera2d extends OrthographicCamera {
  constructor(
    left = 0,
    right = Globals.APP_W,
    top = 0,
    bottom = Globals.APP_H,
    near = -1,
    far = 1000
  ) {
    super(left, right, top, bottom, near, far);

    ev.add_listener(
      Constants.WINDOW_RESIZED_EVENT,
      debounce(() => {
        this.left = 0;
        this.right = Globals.APP_W;
        this.top = 0;
        this.bottom = Globals.APP_H;
        this.near = -1;
        this.far = 1000;
        this.updateProjectionMatrix();
      }, Constants.DEFAULT_WINDOW_RESIZE_DEBOUNCE_MSEC)
    );
  }
}

class Camera3d extends PerspectiveCamera {
  constructor(
    fov = 75,
    aspect = Globals.APP_W / Globals.APP_H,
    near = 0.1,
    far = 1000
  ) {
    super(fov, aspect, near, far);
    this.position.z = 5;

    ev.add_listener(
      Constants.WINDOW_RESIZED_EVENT,
      debounce(() => {
        this.aspect = Globals.APP_W / Globals.APP_H;
        this.updateProjectionMatrix();
      }, Constants.DEFAULT_WINDOW_RESIZE_DEBOUNCE_MSEC)
    );
  }
}

export { Camera2d, Camera3d };
