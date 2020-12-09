import * as THREE from "three";
import * as AA from "./lib/Includer";

import Test from "./src/Test";

class App {
  constructor() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("rgb(255, 0, 0)");
    this.scene.add(this.cube);
    this.camera_3d = new AA.Camera3d();

    this.rbo = new AA.RBO(AA.Globals.APP_W, AA.Globals.APP_H);
  }

  update = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  };

  draw = () => {
    this.rbo.feed(this.scene, this.camera_3d);
    this.rbo.draw();
  };

  keypressed = (key) => {};
  keyreleased = (key) => {};

  rbo;

  cube;
  scene;
  camera_3d;
}

export default App;
