import * as THREE from "three";
import * as ew from "../lib/Includer";

const fragment_shader_screen = `
varying vec2 vUv;
uniform sampler2D tDiffuse;

void main() {

    gl_FragColor = texture2D( tDiffuse, vUv );
    // gl_FragColor = vec4(texture2D( tDiffuse, vUv ).rgb, 0.0);

}
`;

const fragment_shader_pass_1 = `
varying vec2 vUv;
uniform float time;

void main() {

    float r = vUv.x;
    if( vUv.y < 0.5 ) r = 0.0;
    float g = vUv.y;
    if( vUv.x < 0.5 ) g = 0.0;

    gl_FragColor = vec4( r, g, time, 1.0 );

}
`;

const vertexShader = `
varying vec2 vUv;

void main() {

    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`;

class Try_Transparent_RBO {
  constructor() {
    this.cameraRTT = new THREE.PerspectiveCamera(
      30,
      ew.Globals.APP_W / ew.Globals.APP_H,
      1,
      10000
    );
    this.cameraRTT.position.z = 100;

    this.camera = new THREE.OrthographicCamera(
      ew.Globals.APP_W / -2,
      ew.Globals.APP_W / 2,
      ew.Globals.APP_H / 2,
      ew.Globals.APP_H / -2,
      -10000,
      10000
    );
    this.camera.position.z = 100;

    this.sceneRTT = new THREE.Scene();
    this.scene = new THREE.Scene();
    this.sceneScreen = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1).normalize();
    this.scene.add(light);

    light = new THREE.DirectionalLight(0xffaaaa, 1.5);
    light.position.set(0, 0, -1).normalize();
    this.scene.add(light);

    this.rtTexture = new THREE.WebGLRenderTarget(
      ew.Globals.APP_W,
      ew.Globals.APP_H,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBFormat,
      }
    );

    this.material = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0.0 } },
      vertexShader: vertexShader,
      fragmentShader: fragment_shader_pass_1,
    });

    const materialScreen = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: this.rtTexture.texture } },
      vertexShader: vertexShader,
      fragmentShader: fragment_shader_screen,
      depthWrite: false,
      transparent: true,
    });

    const plane = new THREE.PlaneBufferGeometry(
      ew.Globals.APP_W,
      ew.Globals.APP_H
    );

    const quad_scene = new THREE.Mesh(plane, this.material);
    quad_scene.position.z = -100;
    this.scene.add(quad_scene);

    this.quad = new THREE.Mesh(plane, materialScreen);
    this.quad.position.z = -100;
    this.sceneScreen.add(this.quad);

    const n = 5,
      geometry = new THREE.SphereBufferGeometry(10, 64, 32),
      material2 = new THREE.MeshBasicMaterial({
        color: ew.Constants.COLOR.red,
      });

    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        const mesh = new THREE.Mesh(geometry, material2);

        mesh.position.x = (i - (n - 1) / 2) * 20;
        mesh.position.y = (j - (n - 1) / 2) * 20;
        mesh.position.z = 0;

        mesh.rotation.y = -Math.PI / 2;

        this.sceneRTT.add(mesh);
      }
    }
  }

  update = () => {
    this.cameraRTT.position.x +=
      (this.mouseX - this.cameraRTT.position.x) * 0.05;
    this.cameraRTT.position.y +=
      (-this.mouseY - this.cameraRTT.position.y) * 0.05;
    this.cameraRTT.lookAt(this.sceneRTT.position);
  };

  draw = () => {
    ew.Globals.RENDERER.setRenderTarget(this.rtTexture);
    ew.Globals.RENDERER.clear();
    ew.Globals.RENDERER.render(this.sceneRTT, this.cameraRTT);

    ew.Globals.RENDERER.setRenderTarget(null);
    ew.Globals.RENDERER.clear();
    ew.Globals.RENDERER.render(this.scene, this.camera);
    ew.Globals.RENDERER.render(this.sceneScreen, this.camera);
  };

  on_mousemove = (arg) => {
    this.mouseX = arg.val.canvas.x;
    this.mouseY = arg.val.canvas.y;
  };

  camera;
  cameraRTT;

  scene;
  sceneScreen;
  sceneRTT;

  mouseX = 0;
  mouseY = 0;
}

export default Try_Transparent_RBO;
