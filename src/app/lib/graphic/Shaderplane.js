import * as THREE from "three";
import Disposable from "./Disposable";

class Shaderplane extends Disposable(THREE.Object3D) {
  constructor(w, h, vertexShader, fragmentShader) {
    super();
    this.geom = new THREE.PlaneBufferGeometry(w, h);
    this.mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }

  set_uniforms = (unifomrs) => {
    this.mat.uniforms = { ...this.mat.uniforms, ...unifomrs };
  };

  update = () => {};

  draw = () => {};
}

export default Shaderplane;
