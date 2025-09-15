# HLS.ai

HLS.ai is a next-generation video streaming technology designed to improve on
traditional HLS/DASH/RTMP protocols. With our patent-pending algorithms, HLS.ai
delivers:

- ⚡ Lower latency
- 📉 Reduced bandwidth usage
- 🎬 Smooth playback across devices

---

## 🚀 Quick Start

### Player
```bash
npm install hlsai-player
```

```javascript
import { HLSAIPlayer } from "hlsai-player";

const player = new HLSAIPlayer("#videoElement", {
  src: "https://example.com/stream.m3u8"
});
```

### Encoder
```bash
hlsai-encoder -i input.mp4 -o output.m3u8
```

---

## 📖 Documentation
See [docs/](./docs) for detailed API usage and integration examples.

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
