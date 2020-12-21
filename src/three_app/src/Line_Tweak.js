import * as THREE from "three";
import * as AA from "../lib/Includer";

import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

class Line_Tweak {
  constructor() {
    this.camera_2d = new AA.Camera_Orho();
    this.scene = new THREE.Scene();

    this.line_mat = new LineMaterial({
      color: 0xffffff,
      linewidth: 5, // in pixels
      vertexColors: true,
      dashed: false,
    });
    this.line_mat.resolution.set(AA.Globals.APP_W, AA.Globals.APP_H);

    this.gen_line();

    AA.ev.add_listener(AA.Constants.EVENT.WINDOW_RESIZED_EVENT, () => {
      AA.s_log.push("scene.remove(line_mesh)");
      this.line_mat.resolution.set(AA.Globals.APP_W, AA.Globals.APP_H);
    });
  }

  update = () => {
    // this.scene.clear();
    // this.gen_lines();
    this.update_points();
  };

  gen_line = () => {
    const gen_line = (base_y) => {
      const polyline = new AA.Polyline();
      const num = 100;
      const freq = 1.0;
      const mag = 30.0;
      for (let i = 0; i < num; i++) {
        const x = (AA.Globals.APP_W / num) * i;
        const y =
          base_y +
          AA.signed_noise(AA.Globals.ELAPSED_TIME * freq, i, Math.PI) * mag;
        if (i < 2) {
          polyline.add_vertex(new THREE.Vector3(x, y, 0));
        } else {
          polyline.curve_to(new THREE.Vector3(x, y, 0));
        }
      }
      return polyline;
    };

    const base_y = 500;
    const polyline = gen_line(base_y);
    this.vertices = polyline.get_vertices();

    const c = new THREE.Color();
    this.line_colors = [];
    this.line_points = this.vertices.reduce((acc, v, i) => {
      c.setHSL(i / this.vertices.length, 1.0, 0.5);
      this.line_colors.push(c.r, c.g, c.b);
      acc.push(v.x, v.y, v.z);
      return acc;
    }, []);

    this.line_geom = new LineGeometry();
    this.line_geom.setPositions(this.line_points);
    this.line_geom.setColors(this.line_colors);

    this.line_mesh = new Line2(this.line_geom, this.line_mat);
    this.line_mesh.computeLineDistances();
    this.line_mesh.scale.set(1, 1, 1);
    this.scene.add(this.line_mesh);
  };

  update_points = () => {
    const freq = 1.0;
    const mag = 1.0;
    for (let i = 0; i < this.vertices.length; i++) {
      const the_point = this.vertices[i];
      const x = the_point.x;
      const y = the_point.y;
      // the_point.y +
      // AA.signed_noise(AA.Globals.ELAPSED_TIME * freq, i, Math.PI) * mag;
      this.vertices[i] = new THREE.Vector3(x, y, 0);
    }

    this.line_points = this.vertices.reduce((acc, v, i) => {
      acc.push(v.x, v.y, v.z);
      return acc;
    }, []);

    this.line_geom.dispose();
    // this.line_geom = new LineGeometry();
    this.line_geom.setPositions(this.line_points);
    this.line_geom.setColors(this.line_colors);

    // this.line_geom.attributes.position.needsUpdate = true;
    // this.line_geom.computeBoundingBox();
    // this.line_geom.computeBoundingSphere();
    // this.line_mesh.computeLineDistances();
  };

  draw = () => {
    AA.Globals.RENDERER.render(this.scene, this.camera_2d);
  };

  get_scene_and_cam = () => {
    const sc = {
      scene: this.scene,
      camera: this.camera_2d,
    };
    return sc;
  };

  camera_2d;
  scene;

  vertices;
  line_points;
  line_colors;
  line_mat;
  line_geom;
  line_mesh;
}

export default Line_Tweak;
