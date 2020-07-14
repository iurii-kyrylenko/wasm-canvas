mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct LinearImageData {
    width: usize,
    height: usize,
    rgbas: Vec<u8>,
}

#[wasm_bindgen]
impl LinearImageData {
    pub fn new(width: usize, height: usize) -> Self {
        Self {
            width,
            height,
            rgbas: vec![0; 4 * width * height],
        }
    }

    pub fn put_pixel(&mut self, x: usize, y: usize, r: u8, g: u8, b: u8, a: u8) {
        let offset = 4 * (self.width * y + x);
        self.rgbas[offset + 0] = r;
        self.rgbas[offset + 1] = g;
        self.rgbas[offset + 2] = b;
        self.rgbas[offset + 3] = a;
    }

    pub fn pixels(&self) -> *const u8 {
        self.rgbas.as_ptr()
    }

    pub fn frame_example(&mut self, t: usize) {
        for i in 0..self.width {
            for j in 0..self.height {
                self.put_pixel(
                    (i + t) % self.width,
                    j,
                    (i % 256) as u8,
                    (j % 256) as u8,
                    (i * j % 256) as u8,
                    (i * j % 256) as u8
                );
            }
        }
    }
}
