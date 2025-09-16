# HLS.ai

HLS.ai is a next-generation video streaming technology designed to improve on
traditional HLS/DASH/RTMP protocols. With our patent-pending algorithms, HLS.ai
delivers:

- ⚡ Lower latency
- 📉 Reduced bandwidth usage
- 🎬 Smooth playback across devices

---

## 🚀 Quick Start

### Player (Web Demo)

We provide a lightweight JavaScript player that can render HLS.ai zone-based
streams onto a `<canvas>` at different frame rates per region.

```bash
npm install hlsai-player
```

```javascript
import { HLSAIPlayer } from "hlsai-player";

const player = new HLSAIPlayer("#videoElement", {
  src: "https://example.com/stream.m3u8"
});
```

See [`/player`](./player) for a standalone HTML demo.

---

### Encoder (OpenH264 Demo – Current Default)

For now, the encoder includes a simple demo using **OpenH264**.  
It generates a short synthetic video, encodes it, and outputs `out.ts` (playable in VLC/Safari).

```bash
cd encoder
mkdir build && cd build
cmake ..
make
./openh264_demo
```

Output:

```
out.ts   # Play this in VLC or Safari
```

---

## 🛣️ Roadmap

- [ ] Add true MP4 demuxing (real video input instead of synthetic frames)  
- [ ] Implement GOP-aligned segmentation for compliant `.m3u8` + multiple `.ts` files  
- [ ] Zone-aware frame dropping (per-region FPS control at encoding time)  
- [ ] Extend web player for adaptive zone rendering (multi-stream support)  
- [ ] Provide SaaS encoder service and CDN distribution option  

---

## 📖 Documentation
See [docs/](./docs) for API usage, design notes, and integration examples.

---

## 📜 License

- Free for **personal and non-commercial use**  
- Commercial use **requires a license agreement** with ReceiptRoller Inc.  
- Patent Pending

👉 [Request a commercial license](https://hls.ai/hlsai/license)

---

## 🤝 Contributing
Contributions are welcome under the terms of the non-commercial license.  
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting pull requests.
