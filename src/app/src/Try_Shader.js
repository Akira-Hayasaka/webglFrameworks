import * as aa from "../lib/Includer";
import defaultvert from "../data/shader/default/default.vert";
import blendfrag from "../data/shader/blend.frag";

// https://64.media.tumblr.com/2050dd64e4f68a2492fdddfa62b7f29d/tumblr_mhio55gjis1qeffsuo1_1280.jpg
// https://64.media.tumblr.com/tumblr_lzz742vlLn1qeffsuo1_1280.jpg
class Try_Shader {
  constructor() {
    this.shaderplane = new aa.Shaderplane(500, 300, defaultvert, blendfrag, {
      base_tex: { value: null },
      blend_tex: { value: null },
      blendMode: { value: 2 },
    });

    this.img1 = new aa.Image();
    this.img1
      .load(
        "https://64.media.tumblr.com/37dbb5fbd2c67153a99ed4027fe2fdbd/tumblr_mtgl88cEhI1qeffsuo1_500.jpg"
      )
      .then((img) => {
        img.resize(100, 100);
        this.shaderplane.set_uniforms({
          base_tex: { value: img.get_tex() },
        });
      });
    this.img2 = new aa.Image();
    this.img2
      .load(
        "https://64.media.tumblr.com/3427bc153df8d3a5d1f9858675dc45f7/tumblr_mtsim3Db3r1qeffsuo1_500.jpg"
      )
      .then((img) => {
        img.resize(100, 100);
        this.shaderplane.set_uniforms({
          blend_tex: { value: img.get_tex() },
        });
      });

    setInterval(() => {
      this.shaderplane.set_uniforms({
        blendMode: { value: this.blendMode },
      });
      this.blendMode++;
      if (this.blendMode > 24) this.blendMode = 0;
    }, 200);
    setInterval(() => {
      aa.log.push(Math.random());
    }, 250);
  }
  blendMode = 0;
  update = () => {};

  draw = () => {
    this.img1.draw(0, aa.Globals.APP_H - 100);
    this.img2.draw(100, aa.Globals.APP_H - 100);
    this.shaderplane.draw(500, 700);
  };

  set_mode = (mode) => {};

  shaderplane = null;
  img1;
  img2;
}

export default Try_Shader;
