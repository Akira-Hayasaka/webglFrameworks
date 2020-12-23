import * as THREE from "three";
import Disposable from "./Disposable";
import { draw_img } from "../graphic/Easy_Draw";

class Shaderplane extends Disposable(THREE.Object3D) {
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

  resize = (w, h) => {
    if (w !== this.get_width() || h !== this.get_height()) {
      this.geom.dispose();
      this.geom = new THREE.PlaneBufferGeometry(w, h);
      this.remove(this.mesh);
      this.mesh = new THREE.Mesh(this.geom, this.mat);
      this.mesh.position.set(w / 2, h / 2, 0);
      this.add(this.mesh);
    }
  };

  draw = (
    x,
    y,
    z = 0,
    sx = 1.0,
    sy = 1.0,
    {
      rot = new THREE.Euler(0, 0, 0, "XYZ"),
      opacity = 1.0,
      blending = THREE.NormalBlending,
    } = {}
  ) => {
    draw_img(this, x, y, z, sx, sy, { rot, opacity, blending });
  };

  get_width = () => {
    if (this.geom) return this.geom.parameters.width;
  };

  get_height = () => {
    if (this.geom) return this.geom.parameters.height;
  };

  set_anchor = (x, y) => {
    if (this.mesh) this.mesh.position.set(x, y);
  };

  uniforms = null;
  mesh = null;
}

export default Shaderplane;
