import * as THREE from "three";

const Constants = {
  // event names
  EVENT: {
    WINDOW_RESIZED: "windworesized",
    KEY: {
      PRESSED: "keypressed",
      RELEASED: "keyreleased",
    },
    MOUSE: {
      CLICK: "mouseclick",
      DBLCLICK: "mousedblclick",
      DOWN: "mousedown",
      MOVE: "mousemove",
      UP: "mouseup",
    },
    TOUCH: {
      TAP: "touchtap",
      DBLTAP: "touchdbltap",
      PAN: "touchpan",
      SWIPE: "touchswipe",
      PRESS: "touchpress",
      PINCH: "touchpinch",
      ROTATE: "touchrotate",
    },
  },
  // blending
  BLEND: {
    NO: THREE.NoBlending,
    NORMAL: THREE.NormalBlending,
    ADD: THREE.AdditiveBlending,
    SUBTRACT: THREE.SubtractiveBlending,
    MULTIPLY: THREE.MultiplyBlending,
  },
  // shader string
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
  // misc
  DEFAULT_WINDOW_RESIZE_DEBOUNCE_MSEC: 100,
};

export default Constants;
