// https://threejs.org/examples/?q=render#webgl_rtt
// https://stackoverflow.com/questions/21533757/three-js-use-framebuffer-as-texture

import * as THREE from "three";
import Constants from "../Constants";
import Globals from "../Globals";
import { Camera2d } from "./Camera";

const RT_Settings = {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.NearestFilter,
  format: THREE.RGBAFormat,
};

const Shader_Mat_Settings = {
  vertexShader: Constants.MINIMUM_VERT,
  fragmentShader: Constants.MINIMUM_FRAG_VFLIP,
  depthWrite: false,
  transparent: true,
  side: THREE.DoubleSide,
};

class RBO {
  constructor(
    _width,
    _height,
    rt_settings = RT_Settings,
    sm_settings = Shader_Mat_Settings,
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
      uniforms: { tex: { value: this.offscreen_tex.texture } },
      ...sm_settings,
    });
    console.log(mat_for_quad_mesh.toJSON());
    const mesh = new THREE.Mesh(geom_for_quad_mesh, mat_for_quad_mesh);
    mesh.position.set(this.width / 2, this.height / 2, 0);
    this.quad_mesh = new THREE.Object3D();
    this.quad_mesh.add(mesh);

    this.screen_quad_scene = new THREE.Scene();
    this.screen_quad_scene.add(this.quad_mesh);
    this.camera_2d = new Camera2d();
  }

  feed = (scene, camera, b_clear = true) => {
    this.renderer.setRenderTarget(this.offscreen_tex);
    b_clear && this.renderer.clear();
    this.renderer.render(scene, camera);
    this.renderer.setRenderTarget(null);
  };

  draw = (
    x = 0,
    y = 0,
    scale = new THREE.Vector3(1, 1, 1),
    rot = new THREE.Euler(0, 0, 0, "XYZ"),
    to_canvas = true
  ) => {
    if (to_canvas) {
      this.renderer.setRenderTarget(null);
    }
    this.quad_mesh.position.set(x, y, 0);
    this.quad_mesh.scale.set(scale.x, scale.y, scale.z);
    this.quad_mesh.rotation.set(rot.x, rot.y, rot.z, rot.order);
    this.renderer.render(this.screen_quad_scene, this.camera_2d);
  };

  get_tex = () => {
    return this.offscreen_tex.texture;
  };

  swap_renderer = (_renderer) => {
    this.renderer = _renderer;
  };

  get_postprocess_params = () => {
    const params = {
      scene: this.screen_quad_scene,
      camera: this.camera_2d,
      renderer: this.renderer,
      width: this.width,
      height: this.height,
    };
    return params;
  };

  width;
  height;
  renderer;
  offscreen_tex;
  quad_mesh;
  screen_quad_scene;
  camera_2d;

  composer;
}

export { RBO, RT_Settings, Shader_Mat_Settings };
