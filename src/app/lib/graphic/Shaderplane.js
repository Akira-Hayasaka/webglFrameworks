import * as THREE from "three";
import { Disposable, Baseplane } from "./Mixins";

class Shaderplane extends Baseplane(Disposable(THREE.Object3D)) {
  constructor(
    w,
    h,
    vertexShader,
    fragmentShader,
    uniforms = {} // need to create uniform placeholder before first render
  ) {
    super();
    this.uniforms = uniforms;
    this.geom = new THREE.PlaneBufferGeometry(w, h);
    this.mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.position.set(w / 2, h / 2, 0);
    this.add(this.mesh);
  }

  set_uniforms = (_uniforms) => {
    // do not merge like this
    // => this.uniforms = { ...this.uniforms, ..._uniforms };
    // it refresh the reference of uniform object
    // below reuse same reference.
    Object.keys(_uniforms).forEach((key) => {
      this.uniforms[key] = _uniforms[key];
    });
  };

  uniforms = null;
}

export default Shaderplane;
