#pragma glslify: getBlendCol = require("./common/ps_blend.glsl")

varying vec2 v_uv;

uniform sampler2D base;
uniform sampler2D blend;
uniform int blendMode;
uniform float g;

void main ()
{
    vec4 baseCol = texture2D(base, v_uv);
    vec4 blendCol = texture2D(blend, v_uv);
    vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 green = vec4(0.0, g, 0.0, 1.0);
    gl_FragColor = green;//getBlendCol(blendCol, baseCol, blendMode);
}