// translate scale scaleFromCenter growToInclude getIntersection getUnion getArea
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  is_inside = (x, y) => {
    return (
      x > this.get_minx() &&
      y > this.get_miny() &&
      x < this.get_maxx() &&
      y < this.get_maxy()
    );
  };

  get_minx = () => {
    return Math.min(this.x, this.x + this.width);
  };

  get_maxx = () => {
    return Math.max(this.x, this.x + this.width);
  };

  get_miny = () => {
    return Math.min(this.y, this.y + this.height);
  };

  get_maxy = () => {
    return Math.max(this.y, this.y + this.height);
  };

  x;
  y;
  width;
  height;
}

export default Rectangle;
