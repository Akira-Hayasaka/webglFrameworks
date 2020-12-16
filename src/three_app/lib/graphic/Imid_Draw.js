import * as THREE from "three";
import Globals from "../Globals";
import { Camera2d, Camera3d } from "./Camera";

import ant_img from "../../data/img/ant.png";
import { Image } from "../graphic/Image";

const circle_geom = new THREE.CircleBufferGeometry(1, 32);
const circle_mat = new THREE.MeshBasicMaterial();

class Circle extends THREE.Mesh {
  constructor(geom = circle_geom, mat = circle_mat) {
    super(geom, mat);
    this.mat = mat;
  }
  mat;
}

class Circle_Manager {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new Camera2d();

    this.scene.background = new THREE.Color("rgb(255, 0, 0)");
    this.ant = new Image();
    this.ant.load(ant_img).then((img) => {
      img.position.set(
        Globals.APP_W - img.get_width(),
        Globals.APP_H - img.get_height(),
        0
      );
    });
    this.scene.add(this.ant);

    // 3d
    // const geometry = new THREE.CircleBufferGeometry(1, 32);
    // const material = new THREE.MeshBasicMaterial();
    // const circle = new THREE.Mesh(geometry, material);
    // circle.scale.set(1.5, 1, 0);
    // material.color = new THREE.Color(THREE.Color.NAMES.magenta);
    // this.scene.add(circle);

    // 2d
    const geometry = new THREE.CircleBufferGeometry(1, 32);
    const material = new THREE.MeshBasicMaterial({
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const circle = new THREE.Mesh(geometry, material);
    circle.position.set(300, 500, 0);
    const s = 10;
    circle.scale.set(s, s, 0);
    material.color = new THREE.Color(THREE.Color.NAMES.cyan);
    this.scene.add(circle);
  }

  ant;

  draw_circle(x, y, z, rad, col) {
    if (!this.circles[this.counter]) {
      const circle = new Circle();
      this.circles.push(circle);
      this.scene.add(circle);
      console.log("added");
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
      console.log("removed", diff);
    }
    this.counter = 0;
  }

  scene;
  camera;
  circles = [];
  counter = 0;
}

let circle_mgr = null;

const init_imid_draw_env = () => {
  circle_mgr = new Circle_Manager();
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
