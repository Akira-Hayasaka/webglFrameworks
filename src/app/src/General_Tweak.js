import * as THREE from "three";
import * as aa from "../lib/Includer";
import ant_img from "../data/img/ant.png";
import tree_img from "../data/img/tree.png";
import test_vid from "../data/mov/big_buck_bunny.mp4";
import Line_Tweak from "./Line_Tweak";

class General_Tweak {
  constructor() {
    this.tree = new aa.Image();
    this.tree.load(tree_img).then((img) => {
      img.set_anchor(0, 0);
    });

    this.vid = new aa.Video_Player();
    this.vid.load(test_vid, 640, 360).then((vid) => {
      // vid.play();
      // vid.resize(100, 500);
      vid.set_anchor(0, 0);
    });

    this.flower = new aa.Image();
    this.flower
      .load(
        "https://64.media.tumblr.com/ff478aa90a3dcbd9ab7a1b2954c26874/tumblr_mvrmrt3FYH1qeffsuo1_1280.jpg"
      )
      .then((img) => {
        img.resize(img.get_width() * 0.5, img.get_height() * 0.5);
        img.position.set(20, 20, 0);
      });
    this.ant = new aa.Image();
    this.ant.load(ant_img).then((img) => {
      img.position.set(
        aa.Globals.APP_W - img.get_width(),
        aa.Globals.APP_H - img.get_height(),
        0
      );
    });

    this.scene2d = new THREE.Scene();
    this.scene2d.add(this.flower);
    this.scene2d.add(this.ant);

    this.camera_2d = new aa.Camera_Orho();

    this.line = new Line_Tweak();
  }

  update = () => {
    this.line.update();
  };

  draw = () => {
    aa.Globals.RENDERER.render(this.scene2d, this.camera_2d);

    this.line.draw();
    // const { scene, camera } = this.line.get_scene_and_cam();
    // aa.Globals.RENDERER.clearDepth();
    // aa.Globals.RENDERER.render(scene, camera);

    aa.draw_circle(0, 0, 0, 200, { col: new aa.RGBA(0, 0, 255, 100) });

    aa.draw_circle(aa.Globals.APP_W, 0, 0, 100, {
      col: new THREE.Color(THREE.Color.NAMES.darkorchid),
      opacity: 0.25,
      blending: aa.Constants.BLEND.ADD,
    });

    aa.draw_circle(aa.Globals.APP_W, 0, 0, 200, {
      col: new THREE.Color(THREE.Color.NAMES.darkorchid),
      opacity: 0.25,
    });

    aa.draw_circle(aa.Globals.APP_W, aa.Globals.APP_H, 0, 200, {
      col: new THREE.Color(THREE.Color.NAMES.chartreuse),
      blending: aa.Constants.BLEND.ADD,
    });

    aa.draw_circle(0, aa.Globals.APP_H, 0, 200, {
      col: new THREE.Color(THREE.Color.NAMES.gold),
    });

    aa.draw_circle(aa.Globals.APP_W / 2, aa.Globals.APP_H / 2, 0, 10);

    if (this.to_draw) {
      aa.draw_circle(
        aa.Globals.APP_W / 2 + 100,
        aa.Globals.APP_H / 2 + 100,
        0,
        10,
        { col: new THREE.Color(THREE.Color.NAMES.cyan) }
      );
    }

    aa.draw_rect(300, 200, 0, 50, 50);
    aa.draw_rect(300, 400, 0, 150, 50, {
      col: new THREE.Color(THREE.Color.NAMES.deepskyblue),
      rot: this.rot,
    });
    this.rot.set(this.rot.x, this.rot.y, this.rot.z + 0.01, this.rot.order);

    this.tree.draw(200, 400, 0, 1.0, 1.0, {
      opacity: 0.9,
      rot: this.rot,
      blending: aa.Constants.BLEND.ADD,
    });

    this.vid.draw(350, 650, 0, 0.5, 0.5, {
      opacity: 0.8,
      // rot: this.rot,
      blending: aa.Constants.BLEND.NORMAL,
    });

    let freq = 1.0;
    let mag = 100.0;
    let nx = aa.signed_noise(aa.Globals.ELAPSED_TIME * freq, Math.PI) * mag;
    let ny = aa.signed_noise(aa.Globals.ELAPSED_TIME * freq, Math.PI * 2) * mag;
    aa.draw_circle(this.x + nx, this.y + ny, 0, 20, {
      col: new THREE.Color(aa.Constants.COLOR.slateblue),
    });

    freq = 0.5;
    let col_idx = 0;
    const cols = Object.values(aa.Constants.COLOR);
    for (let i = 0; i < 200; i++) {
      // around 2000 is the limit on iphone11pro;
      let nx = aa.map(
        aa.noise(aa.Globals.ELAPSED_TIME * freq, i, Math.PI),
        0.0,
        1.0,
        0,
        aa.Globals.APP_W,
        true
      );
      let ny = aa.map(
        aa.noise(aa.Globals.ELAPSED_TIME * freq, i, Math.PI * 2),
        0.0,
        1.0,
        0,
        aa.Globals.APP_H,
        true
      );
      // let nx = 100;
      // let ny = 100;
      aa.draw_circle(nx, ny, 0, 5, {
        col: new THREE.Color(cols[col_idx]),
      });
      col_idx++;
      if (col_idx > cols.length) col_idx = 0;
    }
  };

  on_keypressed = (arg) => {
    if (arg.val === "a") this.to_draw = !this.to_draw;
    if (arg.val === " ") this.vid.play();
  };

  x = aa.Globals.APP_W / 2;
  y = 750;
  rot = new THREE.Euler(0, 0, 0, "XYZ");

  vid;
  tree;
  flower;
  ant;
  line;
  scene2d;
  camera_2d;

  to_draw = false;
}

export default General_Tweak;
