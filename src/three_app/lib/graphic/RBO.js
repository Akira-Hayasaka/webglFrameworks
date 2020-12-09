// https://threejs.org/examples/?q=render#webgl_rtt
// https://stackoverflow.com/questions/21533757/three-js-use-framebuffer-as-texture

import * as THREE from "three";
import Globals from "../Globals";
import { Camera2d } from "./Camera";

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
const RT_Settings = {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.NearestFilter,
  format: THREE.RGBAFormat,
};
class RBO {
  constructor(
    _width,
    _height,
    rt_settings = RT_Settings,
    _renderer = Globals.RENDERER
  ) {
    this.width = _width;
    this.height = _height;
    this.renderer = _renderer;

    this.offscreen_tex = new THREE.WebGLRenderTarget(this.width, this.height, {
      ...rt_settings,
    });

    const geom_for_quad_mesh = new THREE.PlaneBufferGeometry(
      this.width,
      this.height
    );
    const mat_for_quad_mesh = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: this.offscreen_tex.texture } },
      vertexShader: vert,
      fragmentShader: frag,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.quad_mesh = new THREE.Mesh(geom_for_quad_mesh, mat_for_quad_mesh);
    this.quad_mesh.position.set(this.width / 2, this.height / 2, 0);

    this.screen_quad_scene = new THREE.Scene();
    this.screen_quad_scene.add(this.quad_mesh);
    this.camera_2d = new Camera2d();
  }

  feed = (scene, camera) => {
    this.renderer.setRenderTarget(this.offscreen_tex);
    this.renderer.clear();
    this.renderer.render(scene, camera);
    this.renderer.setRenderTarget(null);
  };

  draw = (x, y, w, h, to_canvas = true) => {
    if (to_canvas) {
      this.renderer.setRenderTarget(null);
    }
    this.renderer.render(this.screen_quad_scene, this.camera_2d);
  };

  get_tex = () => {};

  swap_renderer = (_renderer) => {
    this.renderer = _renderer;
  };

  width;
  height;
  renderer;
  offscreen_tex;
  quad_mesh;
  screen_quad_scene;
  camera_2d;
}

export { RBO, RT_Settings };
