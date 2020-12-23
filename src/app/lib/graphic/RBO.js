// https://threejs.org/examples/?q=render#webgl_rtt
// https://stackoverflow.com/questions/21533757/three-js-use-framebuffer-as-texture

import * as THREE from "three";
import Constants from "../Constants";
import Globals from "../Globals";
import { Camera_Orho } from "./Camera";
import ev from "../event/Event";
import { debounce } from "../util/Util";
import Disposable from "./Disposable";

class RBO extends Disposable(THREE.Object3D) {
  constructor(
    _width,
    _height,
    rt_settings = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
    },
    sm_settings = {
      vertexShader: Constants.MINIMUM_VERT,
      fragmentShader: Constants.MINIMUM_FRAG_VFLIP,
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
    },
    _renderer = Globals.RENDERER
  ) {
    super();
    this.initial_app_width = Globals.APP_W;
    this.initial_app_height = Globals.APP_H;
    this.initial_width = _width;
    this.initial_height = _height;
    this.cur_width = this.initial_width;
    this.cur_height = this.initial_height;
    this.renderer = _renderer;
    this.sm_settings = sm_settings;

    this.camera_2d = new Camera_Orho();
    this.screen_quad_scene = new THREE.Scene();

    this.setup(rt_settings);

    ev.add_listener(
      Constants.WINDOW_RESIZED_EVENT,
      debounce(() => {
        this.cur_width = this.initial_width + Globals.APP_WINRESIZE_DIFFX;
        this.cur_height = this.initial_height + Globals.APP_WINRESIZE_DIFFY;
        this.setup();
      }, Constants.DEFAULT_WINDOW_RESIZE_DEBOUNCE_MSEC)
    );
  }

  setup = (rt_settings) => {
    this.dispose();
    this.tex = new THREE.WebGLRenderTarget(this.cur_width, this.cur_height, {
      ...rt_settings,
    });
    this.geom = new THREE.PlaneBufferGeometry(this.cur_width, this.cur_height);
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        tex: { value: this.tex.texture },
      },
      ...this.sm_settings,
    });
    this.inner_mesh = new THREE.Mesh(this.geom, this.mat);
    this.inner_mesh.position.set(this.cur_width / 2, this.cur_height / 2, 0);
    this.quad_mesh = new THREE.Object3D();
    this.quad_mesh.add(this.inner_mesh);

    this.screen_quad_scene.add(this.quad_mesh);
  };

  dispose = () => {
    super.dispose();
    if (this.quad_mesh) this.screen_quad_scene.remove(this.quad_mesh);
  };

  feed = (scene, camera, b_clear = true) => {
    this.renderer.setRenderTarget(this.tex);
    b_clear && this.renderer.clear();
    this.renderer.render(scene, camera);
  };

  draw = (
    x = 0,
    y = 0,
    scale = new THREE.Vector3(1, 1, 1),
    rot = new THREE.Euler(0, 0, 0, "XYZ"),
    to_canvas = true
  ) => {
    this.quad_mesh.position.set(x, y, 0);
    this.quad_mesh.scale.set(scale.x, scale.y, scale.z);
    this.quad_mesh.rotation.set(rot.x, rot.y, rot.z, rot.order);
    if (to_canvas) {
      this.renderer.setRenderTarget(null);
    }
    this.renderer.render(this.screen_quad_scene, this.camera_2d);
  };

  get_tex = () => {
    return this.tex.texture;
  };

  swap_renderer = (_renderer) => {
    this.renderer = _renderer;
  };

  get_postprocess_params = () => {
    const params = {
      scene: this.screen_quad_scene,
      camera: this.camera_2d,
      renderer: this.renderer,
      width: this.cur_width,
      height: this.cur_height,
    };
    return params;
  };

  initial_width;
  initial_height;
  cur_width;
  cur_height;

  renderer;
  sm_settings;
  inner_mesh;
  quad_mesh;

  screen_quad_scene;
  camera_2d;
}

export default RBO;
