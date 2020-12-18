import * as THREE from "three";
import Globals from "../Globals";

const map_device_to_canvas = (x, y) => {
  // on device scale
  const dx = x - Globals.APP_X;
  const dy = y - Globals.APP_Y;
  // map to app scale
  return new THREE.Vector2(
    Math.round(map(dx, 0, Globals.APP_DEVICE_W, 0, Globals.APP_W, true)),
    Math.round(map(dy, 0, Globals.APP_DEVICE_H, 0, Globals.APP_H, true))
  );
};

// https://blog.blakesimpson.co.uk/page.php?id=58&title=fastest-alternative-to-math-floor-in-javascript
const fast_floor = (x) => {
  return x << 0;
};

const map = (val, in_min, in_max, out_min, out_max, b_clamp = true) => {
  if (Math.abs(in_min - in_max) < Number.EPSILON) {
    return out_min;
  } else {
    let out =
      ((val - in_min) / (in_max - in_min)) * (out_max - out_min) + out_min;
    if (b_clamp) {
      if (out_max < out_min) {
        if (out < out_max) out = out_max;
        else if (out > out_min) out = out_min;
      } else {
        if (out > out_max) out = out_max;
        else if (out < out_min) out = out_min;
      }
    }
    return out;
  }
};

const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export { map_device_to_canvas, fast_floor, map, debounce };
