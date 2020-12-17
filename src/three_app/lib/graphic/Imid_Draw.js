import * as THREE from "three";
import Globals from "../Globals";
import { Camera_Orho } from "./Camera";

const circle_geom = new THREE.CircleBufferGeometry(1, 32);

class Circle extends THREE.Mesh {
  constructor(
    geom = circle_geom,
    mat = new THREE.MeshBasicMaterial({
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
    }) // <= should reuse same material??
  ) {
    super(geom, mat);
    this.mat = mat;
  }
  mat;
}

class Circle_Manager {
  constructor(camera) {
    this.scene = new THREE.Scene();
    this.camera = camera;
  }

  draw_circle(x, y, z, rad, col) {
    if (!this.circles[this.counter]) {
      const circle = new Circle();
      this.circles.push(circle);
      this.scene.add(circle);
    }
    const to_draw = this.circles[this.counter];
    to_draw.position.set(x, y, z);
    to_draw.scale.set(rad, rad, 0);
    to_draw.mat.color = col;
    Globals.RENDERER.render(this.scene, this.camera);
    this.counter++;
  }

  reset_counter() {
    if (this.circles.length > this.counter) {
      const diff = this.circles.length - this.counter;
      for (let i = 0; i < diff; i++) {
        this.scene.remove(this.circles.pop());
      }
    }
    this.counter = 0;
  }

  scene;
  camera;
  circles = [];
  counter = 0;
}

let circle_mgr = null;

const init_imid_draw_env = (camera = new Camera_Orho()) => {
  circle_mgr = new Circle_Manager(camera);
};

const draw_circle = (
  x,
  y,
  z,
  rad,
  col = new THREE.Color(THREE.Color.NAMES.ghostwhite)
) => {
  circle_mgr.draw_circle(x, y, z, rad, col);
};

const reset_imid_draw_loop = () => {
  circle_mgr.reset_counter();
};

export { init_imid_draw_env, draw_circle, reset_imid_draw_loop };
