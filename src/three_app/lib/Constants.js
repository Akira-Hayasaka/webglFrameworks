const Constants = {
  // event names
  KEY_PRESSED: "keypressed",
  KEY_RELEASED: "keyreleased",
  MINIMUM_VERT: `			
  varying vec2 v_uv;
  void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  MINIMUM_FRAG: `
  varying vec2 v_uv;
  uniform sampler2D tex;
  void main() {
     gl_FragColor = texture2D(tex, v_uv);
  }
  `,
  MINIMUM_FRAG_VFLIP: `
  varying vec2 v_uv;
  uniform sampler2D tex;
  void main() {
    vec2 uv = v_uv;
    uv.y = 1.0 - uv.y;
    gl_FragColor = texture2D(tex, uv);
  }
  `,
};

export default Constants;
