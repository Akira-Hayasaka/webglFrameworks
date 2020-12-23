#pragma glslify: getBlendCol = require("./common/ps_blend.glsl")

varying vec2 v_uv;

uniform sampler2D base_tex;
uniform sampler2D blend_tex;
uniform int blendMode;

void main ()
{
    vec2 uv = v_uv;
    uv.y = 1.0 - uv.y;
    vec4 baseCol = texture2D(base_tex, uv);
    vec4 blendCol = texture2D(blend_tex, uv);
    gl_FragColor = getBlendCol(blendCol, baseCol, blendMode);
}