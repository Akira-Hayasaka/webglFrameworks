import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

import * as ew from "../lib/Includer";

class Try_Transparent_RBO_2 {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      ew.Globals.APP_W / ew.Globals.APP_H,
      1,
      1000
    );
    this.camera.position.z = 400;

    this.scene = new THREE.Scene();
    this.efxScene = new THREE.Scene();
    this.foregroundScene = new THREE.Scene();

    var geometry = new THREE.SphereBufferGeometry(1, 4, 4);
    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    for (var i = 0; i < 100; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .normalize();
      mesh.position.multiplyScalar(Math.random() * 400);
      mesh.rotation.set(
        Math.random() * 2,
        Math.random() * 2,
        Math.random() * 2
      );
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
      this.scene.add(mesh);
    }

    var mesh1 = new THREE.Mesh(
      new THREE.SphereBufferGeometry(14, 4, 4),
      material
    );
    this.efxScene.add(mesh1);
    mesh1.scale.x = mesh1.scale.y = mesh1.scale.z = 6;

    this.efxScene.add(new THREE.AmbientLight(0x222222));
    this.efxScene.add(new THREE.DirectionalLight(0xffffff));

    var mesh2 = new THREE.Mesh(
      new THREE.SphereBufferGeometry(14, 4, 4),
      material
    );
    this.foregroundScene.add(mesh2);
    mesh2.scale.x = mesh2.scale.y = mesh2.scale.z = 3;

    this.foregroundScene.add(new THREE.AmbientLight(0xffffff));
    this.foregroundScene.add(new THREE.DirectionalLight(0x0000ff));

    this.scene.add(new THREE.AmbientLight(0x222222));

    var light = new THREE.DirectionalLight(0xffff00);
    light.position.set(1, 1, 1);
    this.scene.add(light);

    // postprocessing
    var width = window.innerWidth;
    var height = window.innerHeight;
    var parameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: true,
    };

    var renderTarget = new THREE.WebGLRenderTarget(width, height, parameters);

    this.composer = new EffectComposer(ew.Globals.RENDERER, renderTarget);

    var renderPass = new RenderPass(this.efxScene, this.camera);
    renderPass.clearColor = new THREE.Color(0, 0, 0);
    renderPass.clearAlpha = 0;

    var fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms.resolution.value.set(
      1 / window.innerWidth,
      1 / window.innerHeight
    );
    fxaaPass.renderToScreen = true;
    fxaaPass.material.transparent = true; // FIX

    this.composer.addPass(renderPass);
    this.composer.addPass(fxaaPass);
  }

  update = () => {
    this.scene.rotation.x += 0.005;
    this.scene.rotation.y += 0.01;

    this.efxScene.rotation.x += 0.005;
    this.efxScene.rotation.y += 0.01;
  };

  draw = () => {
    ew.Globals.RENDERER.render(this.scene, this.camera);
    this.composer.render();
  };

  on_mousemove = (arg) => {};

  camera;
  scene;
  efxScene;
  foregroundScene;
  renderer;
  composer;
  efxComposer;
}

export default Try_Transparent_RBO_2;
