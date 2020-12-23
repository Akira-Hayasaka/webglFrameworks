import { CatmullRomCurve3, Object3D, Euler, NormalBlending } from "three";
// https://threejs.org/docs/#api/en/math/Line3
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

import Constants from "../Constants";
import Globals from "../Globals";
import ev from "../event/Event";
import RGBA from "../util/RGBA";
import { draw_line } from "../graphic/Easy_Draw";

class Polyline extends Object3D {
  constructor() {
    super();
    this.clear();
    this.mat.resolution.set(Globals.APP_W, Globals.APP_H);

    this.line_mesh = new Line2(this.line_geom, this.mat);
    this.line_mesh.scale.set(1, 1, 1);

    this.add(this.line_mesh);

    ev.add_listener(Constants.EVENT.WINDOW_RESIZED_EVENT, () => {
      this.mat.resolution.set(Globals.APP_W, Globals.APP_H);
    });
  }

  // calc for geometry can be slow. consider using worker, texture gpgpu or webgl 2.0 transform feedback.
  draw = ({
    x = 0,
    y = 0,
    z = 0,
    sx = 1,
    sy = 1,
    rot = new Euler(0, 0, 0, "XYZ"),
    cols = new RGBA(255, 255, 255, 255),
    blending = NormalBlending,
  } = {}) => {
    let b_col_array = false;
    if (cols instanceof Array && cols.length === this.vertices.length) {
      b_col_array = true;
    }

    if (this.b_need_update) {
      this.line_points = [];
      this.line_colors = [];
      if (b_col_array) {
        this.line_colors = cols;
      }
      this.line_points = this.vertices.reduce((acc, v, i) => {
        if (!b_col_array) {
          this.line_colors.push(cols.r, cols.g, cols.b);
        }
        acc.push(v.x, v.y, v.z);
        return acc;
      }, []);
      this.line_geom.dispose();
      this.line_geom.setPositions(this.line_points);
      this.line_geom.setColors(this.line_colors);
      this.line_mesh.computeLineDistances();
      this.b_need_update = false;
    }

    let opacity = 1.0;
    if (!b_col_array && cols instanceof RGBA) {
      opacity = cols.get_opacity();
    }
    draw_line(this, x, y, z, sx, sy, { rot, opacity, blending });
  };

  mark_as_changed = () => {
    this.b_need_update = true;
  };

  set_anchor = (x, y) => {
    if (this.line_mesh) this.line_mesh.position.set(x, y);
  };

  get_mesh = () => {
    return this.line_mesh;
  };

  add_vertex = (v) => {
    this.vertices.push(v);
    this.b_need_update = true;
  };

  add_vertices = (vs) => {
    this.vertices.push(...vs);
    this.b_need_update = true;
  };

  get_vertices = () => {
    return this.vertices;
  };

  size = () => {
    return this.vertices.length;
  };

  clear = () => {
    this.vertices = [];
  };

  line_to = (v) => {
    this.add_vertex(v);
    this.b_need_update = true;
  };

  curve_to = (to, curve_res = 15) => {
    if (this.vertices.length < 2) {
      console.log("Polyline curve_to needs at least 2 existing points");
      return;
    }
    const one = this.vertices.pop();
    const two = this.vertices.pop();
    const curve = new CatmullRomCurve3([two, one, to]);
    this.vertices.push(...curve.getPoints(curve_res));
    this.b_need_update = true;
  };

  vertices = [];
  line_points = [];
  line_colors = [];
  mat = new LineMaterial({
    color: 0xffffff,
    linewidth: 5, // in pixels
    vertexColors: true,
    dashed: false,
  });
  line_geom = new LineGeometry();
  line_mesh = null;
  b_need_update = false;
}

export default Polyline;

// ArcCurve
// CatmullRomCurve3
// CubicBezierCurve3
// LineCurve3
// QuadraticBezierCurve3

// addVertex
// addVertices
// getVertices
// size

// lineTo
// curveTo(Vector3 to, int curveResolution)
// arc(Vector3 center,
//             float radiusX, float radiusY,
//             float angleBegin, float angleEnd,
//             bool clockwise, int circleResolution = 20)

// bezierTo(Vector3 cp1, Vector3 cp2, Vector3 to, int curveResolution)

// getSmoothed(int smoothingSize, float smoothingShape)
// getResampledBySpacing(float spacing)
// getResampledByCount(int count)

// rotateDeg(float degrees, Vector3 axis)
// rotateRad(float radians, Vector3 axis)
// translate(Vector3 p)
// scale(Vector3 s)

// getPointAtPercent(float f)

// getPerimeter()
// getCentroid2D()
// getArea()

// close()

// getBoundingBox()
// isInside(float x, float y)
