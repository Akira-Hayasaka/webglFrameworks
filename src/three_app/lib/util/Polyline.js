import { CatmullRomCurve3 } from "three";
// https://threejs.org/docs/#api/en/math/Line3

class Polyline {
  constructor() {
    this.points = [];
  }

  add_vertex = (v) => {
    this.points.push(v);
  };

  add_vertices = (vs) => {
    this.points.push(...vs);
  };

  get_vertices = () => {
    return this.points;
  };

  size = () => {
    return this.points.length;
  };

  line_to = (v) => {
    this.add_vertex(v);
  };

  curve_to = (to, curve_res = 15) => {
    if (this.points.length < 2) {
      console.log("Polyline curve_to needs at least 2 existing points");
      return;
    }
    const one = this.points.pop();
    const two = this.points.pop();
    const curve = new CatmullRomCurve3([two, one, to]);
    this.points.push(...curve.getPoints(curve_res));
  };

  points = null;
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
