# Encoder Demo

This is a simple demonstration of how HLS.ai might encode a video into zones
with different FPS.

## Requirements
- FFmpeg installed

## Usage
```bash
./run-encoder.sh
```

This will generate:
- `zone1.mp4` (cropped + 60fps)
- `zone2.mp4` (cropped + 30fps)
- `manifest.m3u8` (zone definition)

You can then copy the files into `../player-demo/` and open `demo.html` to view.
