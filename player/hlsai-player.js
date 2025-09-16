export class HLSAIPlayer {
  constructor(containerId, manifestUrl) {
    this.container = document.querySelector(containerId);
    this.manifestUrl = manifestUrl;

    this.video = document.createElement("video");
    this.video.autoplay = true;
    this.video.muted = true;
    this.video.loop = true;
    this.video.controls = true;
    this.container.appendChild(this.video);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);

    this.zones = [];
  }

  async load() {
    const res = await fetch(this.manifestUrl);
    const manifestText = await res.text();
    this.parseZonesFromManifest(manifestText);

    if (this.zones.length === 0) {
      const zonesUrl = this.manifestUrl.replace("index.m3u8", "zones.json");
      const res2 = await fetch(zonesUrl);
      const json = await res2.json();
      this.zones = json.segments[0].zones;
    }

    this.video.src = this.manifestUrl;

    let maxW = 0, maxH = 0;
    this.zones.forEach(z => {
      maxW = Math.max(maxW, z.x + z.w);
      maxH = Math.max(maxH, z.y + z.h);
    });
    this.canvas.width = maxW;
    this.canvas.height = maxH;

    this.startRendering();
  }

  parseZonesFromManifest(manifestText) {
    const lines = manifestText.split("\n");
    for (let line of lines) {
      if (line.startsWith("#EXT-X-ZONE")) {
        const attrs = Object.fromEntries(
          line.replace("#EXT-X-ZONE:", "").split(",").map(pair => {
            const [k, v] = pair.split("=");
            return [k.trim(), v.trim()];
          })
        );
        this.zones.push({
          id: parseInt(attrs.id),
          x: parseInt(attrs.x),
          y: parseInt(attrs.y),
          w: parseInt(attrs.width),
          h: parseInt(attrs.height),
          fps: parseInt(attrs.fps)
        });
      }
    }
  }

  startRendering() {
    this.zones.forEach(zone => {
      const interval = 1000 / zone.fps;
      setInterval(() => {
        this.ctx.drawImage(
          this.video,
          zone.x, zone.y, zone.w, zone.h,
          zone.x, zone.y, zone.w, zone.h
        );
      }, interval);
    });
  }
}