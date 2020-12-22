import * as THREE from "three";
import * as AA from "../lib/Includer";

class Line_Tweak {
  constructor() {
    this.polyline = new AA.Polyline();
    // this.polyline.set_anchor(0, 0);
    this.gen_line();
  }

  update = () => {
    this.update_points();
    this.rot.set(this.rot.x, this.rot.y, this.rot.z - 0.01, this.rot.order);
  };

  gen_line = () => {
    const gen_line = (base_y) => {
      const num = 100;
      const freq = 1.0;
      const mag = 30.0;
      for (let i = 0; i < num; i++) {
        const x = (AA.Globals.APP_W / num) * i;
        const y =
          base_y +
          AA.signed_noise(AA.Globals.ELAPSED_TIME * freq, i, Math.PI) * mag;
        if (i < 2) {
          this.polyline.add_vertex(new THREE.Vector3(x, y, 0));
        } else {
          this.polyline.curve_to(new THREE.Vector3(x, y, 0));
        }
      }
    };

    const base_y = 500;
    gen_line(base_y);
  };

  update_points = () => {
    let vertices = this.polyline.vertices;
    const freq = 1.0;
    const mag = 1.0;
    for (let i = 0; i < vertices.length; i++) {
      const the_point = vertices[i];
      const x = the_point.x;
      const y = the_point.y;
      // the_point.y +
      // AA.signed_noise(AA.Globals.ELAPSED_TIME * freq, i, Math.PI) * mag;
      vertices[i] = new THREE.Vector3(x, y, 0);
    }
    this.polyline.mark_as_changed();
  };

  draw = () => {
    this.polyline.draw({
      x: 300,
      sx: 0.5,
      // rot: this.rot,
      cols: new AA.RGBA(100, 0, 0, 100),
      blending: AA.Constants.BLEND.ADD,
    });
  };

  get_scene_and_cam = () => {
    const sc = {
      scene: this.scene,
      camera: this.camera_2d,
    };
    return sc;
  };

  polyline;
  rot = new THREE.Euler(0, 0, 0, "XYZ");
}

export default Line_Tweak;
