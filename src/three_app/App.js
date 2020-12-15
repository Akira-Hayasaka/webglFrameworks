import * as THREE from "three";
import * as AA from "./lib/Includer";
import tree_img from "./data/img/tree.png";
import ant_img from "./data/img/ant.png";
import test_vid from "./data/mov/big_buck_bunny.mp4";

import Line_Tweak from "./src/Line_Tweak";

class App {
  constructor() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene3d = new THREE.Scene();
    this.scene3d.add(this.cube);
    this.camera_3d = new AA.Camera3d();

    this.tree = new AA.Image();
    this.tree.load(tree_img).then((img) => {
      img.set_anchor(0, 0);
      img.position.set(img.get_width() / 2 + 20, img.get_height() / 2 + 20, 0);
    });
    this.ant = new AA.Image();
    this.ant.load(ant_img).then((img) => {
      img.position.set(
        AA.Globals.APP_W - img.get_width(),
        AA.Globals.APP_H - img.get_height(),
        0
      );
    });

    this.ant.position.set(20, 300, 0);
    this.scene2d = new THREE.Scene();
    this.scene2d.background = new THREE.Color("rgb(240, 240, 240)");
    this.scene2d.add(this.tree);
    this.scene2d.add(this.ant);

    this.vid = new AA.Video_Player();
    this.vid.load(test_vid, 640 * 0.5, 360 * 0.5).then((vid) => {
      vid.position.set(50, 300, 0);
    });
    this.scene2d.add(this.vid);

    this.camera_2d = new AA.Camera2d();

    this.rbo = new AA.RBO(AA.Globals.APP_W, AA.Globals.APP_H);

    this.line_tweak = new Line_Tweak();

    this.post_process = new AA.Post_Process(this.rbo.get_postprocess_params());
    // this.post_process.add_fxaa();
  }

  update = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.tree.rotation.z += 0.01;
    this.line_tweak.update();
  };

  draw = () => {
    this.rbo.feed(this.scene2d, this.camera_2d, false);
    // this.rbo.feed(this.scene3d, this.camera_3d, false);

    const { scene, camera } = this.line_tweak.get_scene_and_cam();
    this.rbo.feed(scene, camera, false);

    this.post_process.render();
    // this.rbo.draw(0, 0);

    AA.Globals.RENDERER.clearDepth();
    AA.Globals.RENDERER.render(this.scene3d, this.camera_3d);
    // AA.Globals.RENDERER.render(scene, camera);

    this.vid.debug_draw();
  };

  on_keypressed = (arg) => {};
  on_keyreleased = (arg) => {
    if (arg.val === " ") this.vid.play();
    if (arg.val === "p") this.vid.pause();
  };

  on_mouseclick = (arg) => {};
  on_mousedblclick = (arg) => {};
  on_mousedown = (arg) => {};
  on_mousemove = (arg) => {};
  on_mouseup = (arg) => {};

  rbo;

  cube;
  scene3d;
  camera_3d;

  tree;
  ant;
  vid;
  scene2d;
  camera_2d;

  line_tweak;

  post_process;
}

export default App;
