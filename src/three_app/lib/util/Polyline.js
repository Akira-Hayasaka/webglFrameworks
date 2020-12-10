// https://threejs.org/docs/#api/en/math/Line3

class Polyline {
  constructor() {
    this.points = [];
  }

  add_vertex(v) {
    this.points.push(v);
  }

  add_vertices(vs) {
    this.points.push(...vs);
  }

  get_vertices() {
    return this.points;
  }

  points = null;
}

export default Polyline;

// ArcCurve
// CatmullRomCurve3
// CubicBezierCurve
// CubicBezierCurve3
// EllipseCurve
// LineCurve
// LineCurve3
// QuadraticBezierCurve
// QuadraticBezierCurve3
// SplineCurve

// addVertex
// addVertices
// getVertices
// size

// lineTo
// arc(Vector3 center,
//             float radiusX, float radiusY,
//             float angleBegin, float angleEnd,
//             bool clockwise, int circleResolution = 20)

// curveTo(Vector3 to, int curveResolution)
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
