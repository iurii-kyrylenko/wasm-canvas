import { memory } from "wasm-canvas/wasm_canvas_bg";
import { LinearImageData } from "wasm-canvas";

const width = 1240;
const height = 580;

const canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

const linearImageData = LinearImageData.new(width, height);
const pixels = linearImageData.pixels();

const arr = new Uint8ClampedArray(memory.buffer, pixels, 4 * width * height);
const imageData = new ImageData(arr, width);

let t = 0;

const renderLoop = () => {
  linearImageData.frame_example(t++);
  // frame_example_2(t++);
  ctx.putImageData(imageData, 0, 0);
  requestAnimationFrame(renderLoop);
};

requestAnimationFrame(renderLoop);

function frame_example_2(t) {
  for (let i = 0; i < width; i++)
    for (let j = 0; j < height; j++) {
      linearImageData.put_pixel(
        (i + t) % width,
        j,
        i % 256,
        j % 256,
        i * j % 256,
        i * j % 256
      );
    }
}
