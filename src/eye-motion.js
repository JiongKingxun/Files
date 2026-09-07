// A local texture warp moves only the irises in a flat illustration
// The original image remains visible when motion or GPU rendering is unavailable
const vertexSource = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = vec2((a_position.x + 1.0) * 0.5, (1.0 - a_position.y) * 0.5);
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
const fragmentSource = `
precision highp float;
uniform sampler2D u_image;
uniform vec2 u_crop;
uniform vec2 u_gaze;
varying vec2 v_uv;
float eyeMask(vec2 uv, vec2 center, vec2 radius, float angle) {
  vec2 p = uv - center;
  p = vec2(p.x * cos(angle) - p.y * sin(angle), p.x * sin(angle) + p.y * cos(angle));
  float distance = length(p / radius);
  return 1.0 - smoothstep(0.30, 1.0, distance);
}
void main() {
  vec2 uv = (v_uv - 0.5) * u_crop + 0.5;
  float leftEye = eyeMask(uv, vec2(0.5987, 0.4166), vec2(0.0250, 0.0165), 0.12);
  float rightEye = eyeMask(uv, vec2(0.7291, 0.3550), vec2(0.0290, 0.0190), 0.18);
  vec2 offset = u_gaze * vec2(4.5 / 1672.0, 2.2 / 941.0) * max(leftEye, rightEye);
  gl_FragColor = texture2D(u_image, uv - offset);
}`;

export function createEyeMotion(canvas, source) {
  let gl;
  try { gl = canvas.getContext('webgl', { alpha:false, antialias:false, depth:false, powerPreference:'low-power' }); }
  catch { return () => {}; }
  if (!gl) return () => {};
  const shaders = [], buffers = [], textures = [];
  let program, stopped = false, ready = false, visible = true, frame = 0, lastTime = 0;
  let width = 1, height = 1;
  const current = [0, 0], target = [0, 0];
  const compile = (type, sourceText) => {
    const shader = gl.createShader(type);
    shaders.push(shader);
    gl.shaderSource(shader, sourceText); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Eye shader unavailable');
    return shader;
  };
  const release = () => {
    canvas.style.opacity = '0';
    buffers.forEach(item => gl.deleteBuffer(item));
    textures.forEach(item => gl.deleteTexture(item));
    shaders.forEach(item => gl.deleteShader(item));
    if (program) gl.deleteProgram(program);
  };
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Eye program unavailable');
    gl.useProgram(program);
    const buffer = gl.createBuffer(); buffers.push(buffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  } catch { release(); return () => {}; }
  const cropUniform = gl.getUniformLocation(program, 'u_crop');
  const gazeUniform = gl.getUniformLocation(program, 'u_gaze');
  const hero = canvas.closest('.portrait-hero');
  const draw = () => {
    if (!ready || stopped || gl.isContextLost()) return;
    gl.useProgram(program);
    const imageRatio = 1672 / 941, displayRatio = width / height;
    gl.uniform2f(cropUniform, Math.min(1, displayRatio / imageRatio), Math.min(1, imageRatio / displayRatio));
    gl.uniform2f(gazeUniform, current[0], current[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
  const tick = time => {
    frame = 0;
    if (!ready || !visible || stopped || document.hidden) return;
    const blend = 1 - Math.exp(-Math.min(time - (lastTime || time - 16), 50) / 95);
    lastTime = time;
    current[0] += (target[0] - current[0]) * blend;
    current[1] += (target[1] - current[1]) * blend;
    draw();
    if (Math.abs(target[0] - current[0]) + Math.abs(target[1] - current[1]) > .001) frame = requestAnimationFrame(tick);
    else lastTime = 0;
  };
  const schedule = () => { if (!frame && ready && visible && !stopped && !document.hidden) frame = requestAnimationFrame(tick); };
  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    width = Math.max(1, bounds.width); height = Math.max(1, bounds.height);
    const ratio = Math.min(devicePixelRatio || 1, 1.5, 2560 / width);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    gl.viewport(0, 0, canvas.width, canvas.height); draw();
  };
  const reset = () => { target[0] = 0; target[1] = 0; schedule(); };
  const move = event => {
    if (event.pointerType !== 'mouse' || !visible) return;
    const bounds = canvas.getBoundingClientRect();
    target[0] = Math.max(-1, Math.min(1, (event.clientX - bounds.left - width * .67) / (width * .38)));
    target[1] = Math.max(-1, Math.min(1, (event.clientY - bounds.top - height * .38) / (height * .48)));
    schedule();
  };
  const visibility = () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
    else { reset(); draw(); }
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) { draw(); schedule(); }
    else { cancelAnimationFrame(frame); frame = 0; lastTime = 0; current.fill(0); target.fill(0); }
  });
  observer.observe(canvas);
  const sizeObserver = new ResizeObserver(resize); sizeObserver.observe(canvas);
  const image = new Image();
  image.onload = () => {
    if (stopped || gl.isContextLost()) return;
    const texture = gl.createTexture(); textures.push(texture);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(gl.getUniformLocation(program, 'u_image'), 0);
    ready = true; resize(); canvas.style.opacity = '1';
  };
  image.src = source;
  const lost = () => { ready = false; canvas.style.opacity = '0'; cancelAnimationFrame(frame); frame = 0; };
  canvas.addEventListener('webglcontextlost', lost);
  hero.addEventListener('pointermove', move, { passive:true });
  hero.addEventListener('pointerleave', reset);
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', visibility);
  return () => {
    stopped = true; cancelAnimationFrame(frame); image.onload = null;
    observer.disconnect(); sizeObserver.disconnect();
    canvas.removeEventListener('webglcontextlost', lost);
    hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', reset);
    window.removeEventListener('blur', reset); document.removeEventListener('visibilitychange', visibility);
    release();
  };
}
