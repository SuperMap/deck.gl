// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

export default `\
#define SHADER_NAME advanced-text-layer-fragment-shader

#ifdef GL_ES
precision highp float;
#endif

uniform float opacity;
uniform sampler2D iconsTexture;

varying float vColorMode;
varying vec4 vColor;
varying vec2 vTextureCoords;

void main(void) {
  float smoothing = 0.25 / (9.0 * opacity);
  vec4 texColor = texture2D(iconsTexture, vTextureCoords);
  float distance = texColor.a;
  float outlineFactor = smoothstep(0.5 - smoothing, 0.5 + smoothing, distance);
  vec3 color = mix(vec3(0.0,0.0,1.0), vColor.rgb, outlineFactor);
  float outlineDistance = 0.2;
  float alpha = smoothstep(outlineDistance - smoothing, outlineDistance + smoothing, distance);
  gl_FragColor = vec4(color, alpha);

  // use highlight color if this fragment belongs to the selected object.
  gl_FragColor = picking_filterHighlightColor(gl_FragColor);

  // use picking color if rendering to picking FBO.
  gl_FragColor = picking_filterPickingColor(gl_FragColor);
}
`;
