import * as THREE from "three";
import * as AA from "./lib/Includer";
import ant_img from "./data/img/ant.png";

class App {
  constructor() {
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
      });
    this.ant = new AA.Image();
    this.ant.load(ant_img).then((img) => {
      img.position.set(
        AA.Globals.APP_W - img.get_width(),
        AA.Globals.APP_H - img.get_height(),
        0
      );
    });

    this.scene2d = new THREE.Scene();
    this.scene2d.background = new THREE.Color("rgb(150, 150, 150)");
    this.scene2d.add(this.tree);
    this.scene2d.add(this.ant);

    this.camera_2d = new AA.Camera2d();
  }

  update = () => {};

  draw = () => {
    // AA.Globals.RENDERER.clearDepth();
    // AA.Globals.RENDERER.render(this.scene2d, this.camera_2d);

    AA.draw_circle(0, 0, 0, 1, new THREE.Color(THREE.Color.NAMES.cyan));

    if (this.to_draw) {
      AA.draw_circle(2, 2, 0, 1, new THREE.Color(THREE.Color.NAMES.cyan));
    }

    // AA.draw_circle(
    //   AA.Globals.APP_W / 2,
    //   AA.Globals.APP_H / 2,
    //   0,
    //   10,
    //   new THREE.Color(THREE.Color.NAMES.cyan)
    // );

    // if (this.to_draw) {
    //   AA.draw_circle(
    //     AA.Globals.APP_W / 2 + 100,
    //     AA.Globals.APP_H / 2 + 100,
    //     0,
    //     10,
    //     new THREE.Color(THREE.Color.NAMES.cyan)
    //   );
    // }
  };

  on_keypressed = (arg) => {
    this.to_draw = !this.to_draw;
  };
  on_keyreleased = (arg) => {};
  on_mouseclick = (arg) => {};
  on_mousedblclick = (arg) => {};
  on_mousedown = (arg) => {};
  on_mousemove = (arg) => {};
  on_mouseup = (arg) => {};
  on_tap = (arg) => {};
  on_dbltap = (arg) => {};
  on_pan = (arg) => {};
  on_swipe = (arg) => {};
  on_press = (arg) => {};
  on_pinch = (arg) => {};
  on_rotate = (arg) => {};

  tree;
  ant;
  scene2d;
  camera_2d;

  to_draw = false;
}

export default App;
