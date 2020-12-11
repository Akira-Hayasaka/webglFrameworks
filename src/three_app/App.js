import * as THREE from "three";
import * as AA from "./lib/Includer";
import test_img from "./data/img/test.png";

import Line_Tweak from "./src/Line_Tweak";

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
    this.scene2d.background = new THREE.Color("rgb(240, 240, 240)");
    this.scene2d.add(this.img);

    this.camera_2d = new AA.Camera2d();

    this.rbo = new AA.RBO(AA.Globals.APP_W, AA.Globals.APP_H);

    this.line_tweak = new Line_Tweak();

    this.post_process = new AA.Post_Process(this.rbo.get_postprocess_params());
    this.post_process.add_fxaa();
  }

  update = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.line_tweak.update();
  };

  draw = () => {
    this.rbo.feed(this.scene2d, this.camera_2d, false);
    this.rbo.feed(this.scene3d, this.camera_3d, false);

    const { scene, camera } = this.line_tweak.get_scene_and_cam();
    this.rbo.feed(scene, camera, false);

    // this.rbo.draw();
    this.post_process.render();
  };

  keypressed = (key) => {};
  keyreleased = (key) => {};

  rbo;

  cube;
  scene3d;
  camera_3d;

  img;
  scene2d;
  camera_2d;

  line_tweak;

  post_process;
}

export default App;
