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

export { map };
