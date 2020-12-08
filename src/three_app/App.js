import * as THREE from "three";
import * as AA from "./lib/Includer";

import Test from "./src/Test";

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
   //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

class App {
  constructor() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    AA.Globals.SCENE.add(this.cube);

    this.offscreen_tex = new THREE.WebGLRenderTarget(
      AA.Globals.APP_W,
      AA.Globals.APP_H,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
      }
    );

    this.mat_screen_quad_to_draw = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: this.offscreen_tex.texture } },
      vertexShader: vert,
      fragmentShader: frag,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const geom_quad = new THREE.PlaneBufferGeometry(
      AA.Globals.APP_W,
      AA.Globals.APP_H
    );
    this.screen_quad_to_draw = new THREE.Mesh(
      geom_quad,
      this.mat_screen_quad_to_draw
    );
    this.screen_quad_to_draw.position.set(
      AA.Globals.APP_W / 2,
      AA.Globals.APP_H / 2,
      0
    );
    this.scene_to_hold_screen_quad = new THREE.Scene();
    this.scene_to_hold_screen_quad.add(this.screen_quad_to_draw);

    this.camera_2d = new AA.Camera2d();
    this.camera_3d = new AA.Camera3d();
  }

  update = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.screen_quad_to_draw.rotation.z += 0.04;
  };

  draw = () => {
    AA.Globals.RENDERER.setRenderTarget(this.offscreen_tex);
    AA.Globals.RENDERER.clear();
    AA.Globals.RENDERER.render(AA.Globals.SCENE, this.camera_3d);
    AA.Globals.RENDERER.setRenderTarget(null);
    AA.Globals.RENDERER.clear();

    AA.Globals.RENDERER.render(this.scene_to_hold_screen_quad, this.camera_2d);
  };

  keypressed = (key) => {};
  keyreleased = (key) => {};

  cube;

  offscreen_tex;
  mat_screen_quad_to_draw;
  screen_quad_to_draw;
  scene_to_hold_screen_quad;

  camera_2d;
  camera_3d;
}

export default App;
