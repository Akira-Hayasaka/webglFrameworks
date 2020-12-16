const Constants = {
  // event names
  WINDOW_RESIZED_EVENT: "windworesized",
  KEY_PRESSED_EVENT: "keypressed",
  KEY_RELEASED_EVENT: "keyreleased",
  MOUSE_CLICK_EVENT: "mouseclick",
  MOUSE_DBLCLICK_EVENT: "mousedblclick",
  MOUSE_DOWN_EVENT: "mousedown",
  MOUSE_MOVE_EVENT: "mousemove",
  MOUSE_UP_EVENT: "mouseup",
  TOUCH_TAP_EVENT: "touchtap",
  TOUCH_DBLTAP_EVENT: "touchdbltap",
  TOUCH_PAN_EVENT: "touchpan",
  TOUCH_SWIPE_EVENT: "touchswipe",
  TOUCH_PRESS_EVENT: "touchpress",
  TOUCH_PINCH_EVENT: "touchpinch",
  TOUCH_ROTATE_EVENT: "touchrotate",
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
