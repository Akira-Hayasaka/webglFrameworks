import { Color } from "three";

class RGBA {
  constructor(...args) {
    if (args.length === 3) {
      this.r = args[0];
      this.g = args[1];
      this.b = args[2];
      this.a = 255;
    } else if (args.length === 4) {
      this.r = args[0];
      this.g = args[1];
      this.b = args[2];
      this.a = args[3];
    }
  }

  get_style = () => {
    return `rgb(${this.r},${this.g},${this.b})`;
  };

  get_opacity = () => {
    return this.a / 255.0;
  };

  to3 = () => {
    return {
      col: new Color(this.get_style()),
      opacity: this.get_opacity(),
    };
  };

  r;
  g;
  b;
  a;
}

export default RGBA;
