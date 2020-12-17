import * as THREE from "three";
import * as AA from "../lib/Includer";

import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

class Line_Tweak {
  constructor() {
    this.rbo = new AA.RBO(AA.Globals.APP_W, AA.Globals.APP_H);
    this.camera_2d = new AA.Camera_Orho();
    this.scene = new THREE.Scene();

    this.polyline = new AA.Polyline();

    this.polyline.add_vertex(new THREE.Vector3(0, 0, 0));
    this.polyline.add_vertex(new THREE.Vector3(20, 20, 0));
    // this.polyline.curve_to(new THREE.Vector3(20, 200, 0));
    this.polyline.curve_to(new THREE.Vector3(50, 400, 0));
    this.polyline.curve_to(new THREE.Vector3(200, 450, 0));
    this.polyline.curve_to(new THREE.Vector3(300, 350, 0));
    this.polyline.curve_to(new THREE.Vector3(400, 350, 0));

    const vs = this.polyline.get_vertices();

    const c = new THREE.Color();
    const cs = [];
    const ps = vs.reduce((acc, v, i) => {
      c.setHSL(i / vs.length, 1.0, 0.5);
      cs.push(c.r, c.g, c.b);
      acc.push(v.x, v.y, v.z);
      return acc;
    }, []);

    const geom = new LineGeometry();
    geom.setPositions(ps);
    geom.setColors(cs);

    const mat = new LineMaterial({
      color: 0xffffff,
      linewidth: 5, // in pixels
      vertexColors: true,
      dashed: false,
    });
    mat.resolution.set(AA.Globals.APP_W, AA.Globals.APP_H);

    const line = new Line2(geom, mat);
    line.computeLineDistances();
    line.scale.set(1, 1, 1);
    this.scene.add(line);
  }

  update = () => {};

  draw = () => {
    this.rbo.feed(this.scene, this.camera_2d);
    this.rbo.draw();
    // AA.Globals.RENDERER.render(this.scene, this.camera_2d);
  };

  get_scene_and_cam = () => {
    const sc = {
      scene: this.scene,
      camera: this.camera_2d,
    };
    return sc;
  };

  rbo;
  camera_2d;
  scene;

  polyline;
}

export default Line_Tweak;
