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

    this.tex = new THREE.WebGLRenderTarget(AA.Globals.APP_W, AA.Globals.APP_H, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBFormat,
    });
    this.mat_quad = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: this.tex.texture } },
      vertexShader: vert,
      fragmentShader: frag,
      depthWrite: false,
    });
    const geom_quad = new THREE.PlaneBufferGeometry(
      AA.Globals.APP_W,
      AA.Globals.APP_H
    );
    this.quad = new THREE.Mesh(geom_quad, this.mat_quad);
    this.quad.position.z = -300;
    this.scene = new THREE.Scene();
    this.scene.add(this.quad);
  }

  update = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  };

  draw = () => {
    // AA.Globals.RENDERER.render(AA.Globals.SCENE, AA.Globals.CAMERA);
    AA.Globals.RENDERER.setRenderTarget(this.tex);
    AA.Globals.RENDERER.clear();
    AA.Globals.RENDERER.render(AA.Globals.SCENE, AA.Globals.CAMERA);
    AA.Globals.RENDERER.setRenderTarget(null);
    AA.Globals.RENDERER.clear();

    AA.Globals.RENDERER.render(this.scene, AA.Globals.CAMERA);
  };

  keypressed = (key) => {};
  keyreleased = (key) => {};

  cube;

  tex;
  mat_quad;
  quad;
  scene;
}

export default App;
