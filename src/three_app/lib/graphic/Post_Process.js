import * as THREE from "three";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

import Constants from "../Constants";
import Globals from "../Globals";
import ev from "../util/Event";
import { debounce } from "../util/Util";

const RT_Settings = {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.NearestFilter,
  format: THREE.RGBAFormat,
};

class Post_Process {
  constructor(
    { scene, camera, renderer, width, height },
    rt_settings = RT_Settings
  ) {
    this.px_ratio = renderer.getPixelRatio();
    this.initial_width = width;
    this.initial_height = height;
    this.cur_width = this.initial_width;
    this.cur_height = this.initial_height;

    const dispose = () => {
      if (this.composer) {
        this.composer.reset(this.offscreen_tex);
        this.composer = null;
      }
      if (this.offscreen_tex) this.offscreen_tex.dispose();
    };

    const setup = () => {
      dispose();
      this.offscreen_tex = new THREE.WebGLRenderTarget(
        this.cur_width,
        this.cur_height,
        {
          ...rt_settings,
        }
      );
      const render_path = new RenderPass(scene, camera);
      this.composer = new EffectComposer(renderer, this.offscreen_tex);
      this.composer.addPass(render_path);
      this.composer.setSize(this.cur_width, this.cur_height);
    };

    setup();

    ev.add_listener(
      Constants.WINDOW_RESIZED_EVENT,
      debounce(() => {
        this.px_ratio = renderer.getPixelRatio();
        this.cur_width = this.initial_width + Globals.APP_WINRESIZE_DIFFX;
        this.cur_height = this.initial_height + Globals.APP_WINRESIZE_DIFFY;
        setup();
        if (this.fxaapass) this.add_fxaa();
      }, Constants.DEFAULT_WINDOW_RESIZE_DEBOUNCE_MSEC)
    );
  }

  add_fxaa = () => {
    if (this.fxaapass) this.fxaapass = null;
    this.fxaapass = new ShaderPass(FXAAShader);
    this.fxaapass.material.uniforms["resolution"].value.x =
      1 / (this.cur_width * this.px_ratio);
    this.fxaapass.material.uniforms["resolution"].value.y =
      1 / (this.cur_height * this.px_ratio);
    this.composer.addPass(this.fxaapass);
  };

  render = () => {
    this.composer.render();
  };

  scene;
  camera;

  initial_width;
  initial_height;
  cur_width;
  cur_height;
  px_ratio;

  offscreen_tex;
  composer;

  fxaapass = null;
}

export default Post_Process;
