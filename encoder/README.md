# OpenH264 Demo Encoder

This project builds a simple demo that uses **OpenH264** to encode synthetic frames and mux them into a TS file.

## Build

```bash
mkdir build && cd build
cmake ..
make
```

## Run

```bash
./openh264_demo
```

This generates `out.ts`, which you can play in VLC or Safari.

## Dependencies

- [OpenH264](https://github.com/cisco/openh264)

On Ubuntu/Debian:

```bash
sudo apt install libopenh264-dev
```
