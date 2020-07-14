  // Three options:
  // 1. Create image data in JS. Populate image data in JS.
  // 2. Create image data in WASM. Populate image data in JS.
  // 3. Create image data in WASM. Populate image data in WASM (slow option).

import { memory } from "wasm-canvas/wasm_canvas_bg";
import { LinearImageData } from "wasm-canvas";

const width = 1240;
const height = 580;

const canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

// Create image data in WASM:
const linearImageData = LinearImageData.new(width, height);
const pixels = linearImageData.pixels();
const arr = new Uint8ClampedArray(memory.buffer, pixels, 4 * width * height);
const imageData = new ImageData(arr, width);

// Create image data in JS:
// const imageData = ctx.createImageData(width, height);

let t = 0;

const renderLoop = () => {
  // Populate image data in WASM (slow option):
  linearImageData.frame_example(t++);

  // Populate image data in JS:
  // frame_example(t++);

  ctx.putImageData(imageData, 0, 0);
  requestAnimationFrame(renderLoop);
};

requestAnimationFrame(renderLoop);

// JS functions for populating data
//
function frame_example(t) {
  for (let i = 0; i < width; i++)
    for (let j = 0; j < height; j++) {
      put_pixel(
        (i + t) % width,
        j,
        i % 256,
        j % 256,
        i * j % 256,
        i * j % 256
      );
    }
}

function put_pixel(x, y, r, g, b, a) {
  let offset = 4 * (width * y + x);
  imageData.data[offset + 0] = r;
  imageData.data[offset + 1] = g;
  imageData.data[offset + 2] = b;
  imageData.data[offset + 3] = a;
}
