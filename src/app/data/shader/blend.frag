#pragma glslify: getBlendCol = require("./common/ps_blend.glsl")

varying vec2 v_uv;

uniform sampler2D base_tex;
uniform sampler2D blend_tex;
uniform int blendMode;

void main ()
{
    vec4 baseCol = texture2D(base_tex, v_uv);
    vec4 blendCol = texture2D(blend_tex, v_uv);
    gl_FragColor = getBlendCol(blendCol, baseCol, blendMode);
}