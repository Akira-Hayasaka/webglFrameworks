// https://threejs.org/examples/?q=render#webgl_rtt
// https://stackoverflow.com/questions/21533757/three-js-use-framebuffer-as-texture

import * as THREE from "three";
import Globals from "../Globals";

const vert = `			
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const frag = `
varying vec2 vUv;
uniform sampler2D tDiffuse;
void main() {
   gl_FragColor = texture2D( tDiffuse, vUv );
}
`;

class RTT {
  constructor(width, height) {
    this.renderer = Globals.RENDERER;
  }

  feed = (scene, camera) => {};

  draw = (x, y, w, h) => {};

  get_tex = () => {};

  swap_renderer = (_renderer) => {
    this.renderer = _renderer;
  };
  renderer;
}

// allocate, begin(), end(), draw(0, 0), get_quad(for further translation)

export default RTT;
