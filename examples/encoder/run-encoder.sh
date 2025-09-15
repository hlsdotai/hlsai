#!/bin/bash
# Simple encoder demo: split video into two zones with different FPS

INPUT=input.mp4

# Create zone1 (higher fps)
ffmpeg -i $INPUT -filter:v "crop=640:360:0:0,fps=60" zone1.mp4

# Create zone2 (lower fps)
ffmpeg -i $INPUT -filter:v "crop=640:360:640:0,fps=30" zone2.mp4

# Create manifest
cat > manifest.m3u8 <<EOL
#EXTM3U
#EXT-X-VERSION:1

#EXT-X-ZONE:id=1,x=0,y=0,width=640,height=360,fps=60
zone1.mp4

#EXT-X-ZONE:id=2,x=640,y=0,width=640,height=360,fps=30
zone2.mp4
EOL

echo "Encoder demo complete. Run ../player-demo/demo.html to test."
