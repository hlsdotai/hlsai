export class HLSAIPlayer {
  constructor(containerId, manifestUrl) {
    this.container = document.querySelector(containerId);
    this.manifestUrl = manifestUrl;
    this.videoZones = [];
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);
  }

  async load() {
    const res = await fetch(this.manifestUrl);
    const manifestText = await res.text();
    this.parseManifest(manifestText);

    // canvas size
    let maxW = 0, maxH = 0;
    this.videoZones.forEach(z => {
      maxW = Math.max(maxW, z.x + z.width);
      maxH = Math.max(maxH, z.y + z.height);
    });
    this.canvas.width = maxW;
    this.canvas.height = maxH;

    this.videoZones.forEach(zone => this.startZonePlayback(zone));
  }

  parseManifest(manifest) {
    const lines = manifest.split("\n");
    let currentZone = null;
    for (let line of lines) {
      if (line.startsWith("#EXT-X-ZONE")) {
        const attrs = Object.fromEntries(
          line.replace("#EXT-X-ZONE:", "").split(",").map(pair => {
            const [k, v] = pair.split("=");
            return [k.trim(), v.trim()];
          })
        );
        currentZone = {
          id: attrs.id,
          x: parseInt(attrs.x),
          y: parseInt(attrs.y),
          width: parseInt(attrs.width),
          height: parseInt(attrs.height),
          fps: parseInt(attrs.fps),
          url: null,
          video: null
        };
        this.videoZones.push(currentZone);
      } else if (line.endsWith(".mp4") || line.endsWith(".m3u8")) {
        if (currentZone) currentZone.url = line.trim();
      }
    }
  }

  async startZonePlayback(zone) {
    const video = document.createElement("video");
    video.src = zone.url;
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    await video.play();

    zone.video = video;

    const interval = 1000 / zone.fps;
    setInterval(() => {
      this.ctx.drawImage(video, zone.x, zone.y, zone.width, zone.height);
    }, interval);
  }
}