import * as THREE from "three";
import * as AA from "./lib/Includer";
import ant_img from "./data/img/ant.png";

class App {
  constructor() {
    this.error = "shokichi";
    this.tree = new AA.Image();
    this.tree
      .load(
        "https://threejsfundamentals.org/threejs/resources/images/flower-6.jpg"
      )
      .then((img) => {
        img.set_anchor(0, 0);
        img.position.set(
          img.get_width() / 2 + 20,
          img.get_height() / 2 + 20,
          0
        );
      })
      .catch((img, err) => {
        this.error = err;
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
    // this.scene2d.background = new THREE.Color("rgb(240, 240, 240)");
    this.scene2d.add(this.tree);
    this.scene2d.add(this.ant);

    this.camera_2d = new AA.Camera2d();
  }

  update = () => {};

  draw = () => {
    // AA.Globals.RENDERER.clearDepth();
    AA.Globals.RENDERER.render(this.scene2d, this.camera_2d);
  };
  on_keypressed = (arg) => {
    AA.s_log.push("key " + arg.val);
  };
  on_keyreleased = (arg) => {};
  on_mouseclick = (arg) => {
    AA.s_log.push("scnx " + arg.val.screen.x);
    AA.s_log.push("scny " + arg.val.screen.y);
    AA.s_log.push("cvsx " + arg.val.canvas.x);
    AA.s_log.push("cvsy " + arg.val.canvas.y);
  };
  on_mousedblclick = (arg) => {};
  on_mousedown = (arg) => {};
  on_mousemove = (arg) => {};
  on_mouseup = (arg) => {};

  tree;
  ant;
  scene2d;
  camera_2d;

  error;
}

export default App;
