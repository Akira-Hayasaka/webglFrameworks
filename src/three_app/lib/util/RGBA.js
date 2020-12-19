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

  get = () => {
    return {
      rgb: `rgb(${this.r},${this.g},${this.b})`,
      opacity: this.a / 255.0,
    };
  };

  get_style = () => {
    return `rgb(${this.r},${this.g},${this.b})`;
  };

  get_opacity = () => {
    return this.a / 255.0;
  };

  to3 = () => {
    return new Color(this.get().rgb);
  };

  r;
  g;
  b;
  a;
}

export default RGBA;
