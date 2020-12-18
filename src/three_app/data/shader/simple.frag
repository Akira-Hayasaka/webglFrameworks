  varying vec2 v_uv;
  uniform sampler2D tex;
  uniform float opacity;
  void main() {
    vec2 uv = v_uv;
    uv.y = 1.0 - uv.y;
    vec4 col = texture2D(tex, uv);
    gl_FragColor = vec4(col.rgb, col.a * opacity);
  }