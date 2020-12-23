import * as THREE from "three";
import * as aa from "../lib/Includer";
import defaultvert from "../data/shader/default/default.vert";
import blendfrag from "../data/shader/blend.frag";
import testimg from "../data/img/ant.png";

// https://64.media.tumblr.com/2050dd64e4f68a2492fdddfa62b7f29d/tumblr_mhio55gjis1qeffsuo1_1280.jpg
// https://64.media.tumblr.com/tumblr_lzz742vlLn1qeffsuo1_1280.jpg
class Try_Shader {
  constructor() {
    // const object1 = {
    //   name: "Flavio",
    // };

    // const object2 = {
    //   age: 35,
    // };

    // let object3 = object1;
    // object3 = { ...object3, ...object2 };
    // console.log(JSON.stringify(object3, null, 2));

    this.shaderplane = new aa.Shaderplane(300, 200, defaultvert, blendfrag);
    this.shaderplane.set_uniforms({
      blendMode: { value: 2 },
      g: { value: 1.0 },
    });

    this.shaderplane.set_uniforms({
      g: { value: 0.0 },
    });

    this.img1 = new aa.Image();
    this.img1
      .load(
        "https://64.media.tumblr.com/2050dd64e4f68a2492fdddfa62b7f29d/tumblr_mhio55gjis1qeffsuo1_1280.jpg"
      )
      .then((img) => {
        img.resize(100, 100);
        // this.shaderplane.set_uniforms({
        //   base_tex: { value: img.get_tex() },
        // });
      });
    this.img2 = new aa.Image();
    this.img2
      .load("https://64.media.tumblr.com/tumblr_lzz742vlLn1qeffsuo1_1280.jpg")
      .then((img) => {
        img.resize(100, 100);
        // this.shaderplane.set_uniforms({
        //   blend_tex: { value: img.get_tex() },
        //   g: { value: 1.0 },
        // });
      });

    const loader = new THREE.ImageLoader();
    loader.load(testimg, (img) => {
      this.tex = new THREE.CanvasTexture(img);
      this.setto();
      console.log(this);
    });
  }
  tex;
  update = () => {};

  setto = () => {
    this.shaderplane.set_uniforms({
      g: { value: 1.0 },
    });
  };

  draw = () => {
    this.img1.draw(0, aa.Globals.APP_H - 100);
    this.img2.draw(100, aa.Globals.APP_H - 100);
    this.shaderplane.draw(600, 700);
  };

  shaderplane = null;
  img1;
  img2;
}

export default Try_Shader;
