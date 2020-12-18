import * as THREE from "three";
import * as AA from "./lib/Includer";
import ant_img from "./data/img/ant.png";
import tree_img from "./data/img/tree.png";
import test_vid from "./data/mov/big_buck_bunny.mp4";
import { Object3D } from "three";
import frag from "./data/shader/simple.frag";

class App {
  constructor() {
    this.tree = new AA.Image();
    this.tree.load(tree_img).then((img) => {
      img.set_anchor(0, 0);
    });

    this.vid = new AA.Video_Player();
    this.vid.load(test_vid, 640, 360).then((vid) => {
      // vid.play();
      vid.set_anchor(0, 0);
    });

    console.log("frag", JSON.stringify(frag));
    this.flower = new AA.Image();
    this.flower
      .load(
        "https://threejsfundamentals.org/threejs/resources/images/flower-6.jpg",
        { fragmentShader: AA.Constants.MINIMUM_FRAG }
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
    this.scene2d.add(this.flower);
    this.scene2d.add(this.ant);

    this.camera_2d = new AA.Camera_Orho();

    // let myFunc = ({ x = 5, y = 8, z = 13 } = {}) => {
    //   console.log(x, y, z);
    // };

    // myFunc({ y: 15, x: 10, a: 1 });
    // myFunc();

    // let myFunc = (b, a = { x: 5, y: 8, z: 13 }) => {
    //   console.log(b);
    //   console.log(a);
    // };

    // myFunc("hey", { y: 15, x: 10 });
    // myFunc("ho");

    // let myFunc = (a = ({ x = 5, y = 8, z = 13 } = {})) => {
    //   // console.log(x, y, z);
    // };

    // myFunc({ y: 15, x: 10, a: 1 });
    // myFunc();
  }

  update = () => {};

  draw = () => {
    AA.Globals.RENDERER.render(this.scene2d, this.camera_2d);

    const col = new THREE.Color("rgb(255, 0, 0)");
    AA.draw_circle(0, 0, 0, 200, { col, opacity: 0.5 });

    AA.draw_circle(AA.Globals.APP_W, 0, 0, 100, {
      col: new THREE.Color(THREE.Color.NAMES.darkorchid),
      opacity: 0.25,
      blending: AA.Constants.BLEND.ADD,
    });

    AA.draw_circle(AA.Globals.APP_W, 0, 0, 200, {
      col: new THREE.Color(THREE.Color.NAMES.darkorchid),
      opacity: 0.25,
    });

    AA.draw_circle(AA.Globals.APP_W, AA.Globals.APP_H, 0, 200, {
      col: new THREE.Color(THREE.Color.NAMES.chartreuse),
      blending: AA.Constants.BLEND.ADD,
    });

    AA.draw_circle(0, AA.Globals.APP_H, 0, 200, {
      col: new THREE.Color(THREE.Color.NAMES.gold),
    });

    AA.draw_circle(AA.Globals.APP_W / 2, AA.Globals.APP_H / 2, 0, 10);

    if (this.to_draw) {
      AA.draw_circle(
        AA.Globals.APP_W / 2 + 100,
        AA.Globals.APP_H / 2 + 100,
        0,
        10,
        { col: new THREE.Color(THREE.Color.NAMES.cyan) }
      );
    }

    AA.draw_rect(300, 200, 0, 50, 50);
    AA.draw_rect(300, 400, 0, 150, 50, {
      col: new THREE.Color(THREE.Color.NAMES.deepskyblue),
      rot: this.rot,
    });
    this.rot.set(this.rot.x, this.rot.y, this.rot.z + 0.01, this.rot.order);

    this.tree.draw(200, 400, 0, 1.0, 1.0, {
      opacity: 1.0,
      rot: this.rot,
      blending: AA.Constants.BLEND.ADD,
    });

    this.vid.draw(300, 500, 0, 0.5, 0.5, {
      opacity: 0.8,
      // rot: this.rot,
      blending: AA.Constants.BLEND.NORMAL,
    });

    let freq = 1.0;
    let mag = 100.0;
    let nx = AA.signed_noise(AA.Globals.ELAPSED_TIME * freq, Math.PI) * mag;
    let ny = AA.signed_noise(AA.Globals.ELAPSED_TIME * freq, Math.PI * 2) * mag;
    AA.draw_circle(this.x + nx, this.y + ny, 0, 20, {
      col: new THREE.Color(AA.Constants.COLOR.slateblue),
    });

    freq = 0.5;
    let col_idx = 0;
    const cols = Object.values(AA.Constants.COLOR);
    for (let i = 0; i < 200; i++) {
      // around 2000 is the limit on iphone11pro;
      let nx = AA.map(
        AA.noise(AA.Globals.ELAPSED_TIME * freq, i, Math.PI),
        0.0,
        1.0,
        0,
        AA.Globals.APP_W,
        true
      );
      let ny = AA.map(
        AA.noise(AA.Globals.ELAPSED_TIME * freq, i, Math.PI * 2),
        0.0,
        1.0,
        0,
        AA.Globals.APP_H,
        true
      );
      // let nx = 100;
      // let ny = 100;
      AA.draw_circle(nx, ny, 0, 5, {
        col: new THREE.Color(cols[col_idx]),
      });
      col_idx++;
      if (col_idx > cols.length) col_idx = 0;
    }
  };

  x = AA.Globals.APP_W / 2;
  y = 750;
  rot = new THREE.Euler(0, 0, 0, "XYZ");

  on_keypressed = (arg) => {
    if (arg.val === "a") this.to_draw = !this.to_draw;
    if (arg.val === " ") this.vid.play();
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

  vid;
  tree;
  flower;
  ant;
  scene2d;
  camera_2d;

  to_draw = false;
}

export default App;
