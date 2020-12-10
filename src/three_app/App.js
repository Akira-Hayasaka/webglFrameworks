import * as THREE from "three";
import * as AA from "./lib/Includer";
import test_img from "./data/img/test.png";

class App {
  constructor() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene3d = new THREE.Scene();
    this.scene3d.add(this.cube);
    this.camera_3d = new AA.Camera3d();

    this.img = new AA.Image(
      // "https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg"
      test_img
    );
    this.img.position.set(20, 20, 0);
    this.scene2d = new THREE.Scene();
    this.scene2d.add(this.img);

    this.camera_2d = new AA.Camera2d();

    this.rbo0 = new AA.RBO(AA.Globals.APP_W, AA.Globals.APP_H);
    this.rbo1 = new AA.RBO(AA.Globals.APP_W, AA.Globals.APP_H);
  }

  update = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  };

  draw = () => {
    this.rbo1.feed(this.scene2d, this.camera_2d);
    this.rbo1.draw();
    this.rbo0.feed(this.scene3d, this.camera_3d);
    this.rbo0.draw();
  };

  keypressed = (key) => {};
  keyreleased = (key) => {};

  rbo0;
  rbo1;

  cube;
  scene3d;
  camera_3d;

  img;
  scene2d;
  camera_2d;
}

export default App;
