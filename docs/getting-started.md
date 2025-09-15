# Getting Started with HLS.ai

## Installation

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

## Next Steps
- See [Technical Overview](./technical-overview.md) for details.
- For business use, please review the [Commercial License](./commercial-license.md).
