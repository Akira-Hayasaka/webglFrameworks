import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

class Post_Process {
  constructor({ scene, camera, renderer, width, height }) {
    this.px_ratio = renderer.getPixelRatio();
    this.width = width;
    this.height = height;
    const render_path = new RenderPass(scene, camera);
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(render_path);
    this.composer.setSize(width, height);
  }

  add_fxaa = () => {
    const fxaa = new ShaderPass(FXAAShader);
    fxaa.material.uniforms["resolution"].value.x =
      1 / (this.width * this.px_ratio);
    fxaa.material.uniforms["resolution"].value.y =
      1 / (this.height * this.px_ratio);
    this.composer.addPass(fxaa);
  };

  render = () => {
    this.composer.render();
  };

  width;
  height;
  px_ratio;
  composer;
}

export default Post_Process;
