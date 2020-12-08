import { OrthographicCamera, PerspectiveCamera } from "three";
import Globals from "../Globals";

class Camera2d extends OrthographicCamera {
  constructor(
    left = 0,
    right = Globals.APP_W,
    top = 0,
    bottom = Globals.APP_H,
    near = -1,
    far = 1
  ) {
    super(left, right, top, bottom, near, far);
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
  }
}

export { Camera2d, Camera3d };
