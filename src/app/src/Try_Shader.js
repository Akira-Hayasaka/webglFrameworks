import * as aa from "../lib/Includer";
import defaultvert from "../data/shader/default/default.vert";
import blendfrag from "../data/shader/blend.frag";

// https://64.media.tumblr.com/2050dd64e4f68a2492fdddfa62b7f29d/tumblr_mhio55gjis1qeffsuo1_1280.jpg
// https://64.media.tumblr.com/tumblr_lzz742vlLn1qeffsuo1_1280.jpg
class Try_Shader {
  constructor() {
    this.shaderplane = new aa.Shaderplane(300, 200, defaultvert, blendfrag, {
      base_tex: { value: null },
      blend_tex: { value: null },
      blendMode: { value: 2 },
    });

    this.img1 = new aa.Image();
    this.img1
      .load(
        "https://64.media.tumblr.com/2050dd64e4f68a2492fdddfa62b7f29d/tumblr_mhio55gjis1qeffsuo1_1280.jpg"
      )
      .then((img) => {
        img.resize(100, 100);
        this.shaderplane.set_uniforms({
          base_tex: { value: img.get_tex() },
        });
      });
    this.img2 = new aa.Image();
    this.img2
      .load("https://64.media.tumblr.com/tumblr_lzz742vlLn1qeffsuo1_1280.jpg")
      .then((img) => {
        img.resize(100, 100);
        this.shaderplane.set_uniforms({
          blend_tex: { value: img.get_tex() },
        });
      });
  }

  update = () => {};

  draw = () => {
    this.img1.draw(0, aa.Globals.APP_H - 100);
    this.img2.draw(100, aa.Globals.APP_H - 100);
    this.shaderplane.draw(600, 700);
  };

  set_mode = (mode) => {};

  shaderplane = null;
  img1;
  img2;
}

export default Try_Shader;
