import * as THREE from "three";
import * as AA from "./lib/Includer";
import tree_img from "./data/img/tree.png";
import ant_img from "./data/img/ant.png";

class App {
  constructor() {
    this.error = "shokichi";
    this.tree = new AA.Image();
    this.tree
      .load(tree_img)
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
    AA.s_log.draw_string(
      "tree w:" + this.tree.get_width() + " tree h:" + this.tree.get_height(),
      10,
      20
    );
    AA.s_log.draw_string("err:" + this.error, 10, 40);
    AA.s_log.draw_string("this.tree:" + this.tree.position.x, 10, 60);
    AA.s_log.draw_string("tree.tex:" + this.tree.get_tex(), 10, 80);
    AA.s_log.draw_string("tree.mesh:" + this.tree.mesh, 10, 100);
  };

  on_keypressed = (arg) => {};
  on_keyreleased = (arg) => {};
  on_mouseclick = (arg) => {};
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
