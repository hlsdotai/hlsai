#include "wels/codec_api.h"
#include "ts_writer.h"
#include <iostream>
#include <vector>
#include <cstring>

int main() {
    ISVCEncoder* encoder = nullptr;
    if (WelsCreateSVCEncoder(&encoder) != 0 || !encoder) {
        std::cerr << "Failed to create OpenH264 encoder" << std::endl;
        return -1;
    }

    SEncParamBase param;
    memset(&param, 0, sizeof(param));
    param.iUsageType = CAMERA_VIDEO_REAL_TIME;
    param.iPicWidth  = 320;
    param.iPicHeight = 240;
    param.iTargetBitrate = 500000;
    param.iRCMode = RC_BITRATE_MODE;
    param.fMaxFrameRate = 30.0f;

    if (encoder->Initialize(&param) != 0) {
        std::cerr << "Failed to initialize OpenH264 encoder" << std::endl;
        return -1;
    }

    SSourcePicture pic;
    memset(&pic, 0, sizeof(pic));
    pic.iColorFormat = videoFormatI420;
    pic.iPicWidth = param.iPicWidth;
    pic.iPicHeight = param.iPicHeight;
    pic.iStride[0] = pic.iPicWidth;
    pic.iStride[1] = pic.iPicWidth / 2;
    pic.iStride[2] = pic.iPicWidth / 2;

    std::vector<uint8_t> yuv(pic.iPicWidth * pic.iPicHeight * 3 / 2);

    SFrameBSInfo info;
    FILE* f = fopen("out.ts", "wb");
    if (!f) {
        std::cerr << "Failed to open output file" << std::endl;
        return -1;
    }
    init_ts_writer(f);

    for (int frame = 0; frame < 60; ++frame) {
        // Grey background
        std::fill(yuv.begin(), yuv.begin() + pic.iPicWidth * pic.iPicHeight, 128);
        std::fill(yuv.begin() + pic.iPicWidth * pic.iPicHeight,
                  yuv.end(), 128);

        pic.pData[0] = yuv.data();
        pic.pData[1] = yuv.data() + pic.iPicWidth * pic.iPicHeight;
        pic.pData[2] = yuv.data() + pic.iPicWidth * pic.iPicHeight * 5 / 4;

        memset(&info, 0, sizeof(SFrameBSInfo));
        encoder->EncodeFrame(&pic, &info);

        for (int i = 0; i < info.iLayerNum; i++) {
            SLayerBSInfo* layer = &info.sLayerInfo[i];
            uint8_t* buf = layer->pBsBuf;
            for (int j = 0; j < layer->iNalCount; j++) {
                int len = layer->pNalLengthInByte[j];
                write_nal_to_ts(buf, len);
                buf += len;
            }
        }
    }

    finalize_ts_writer();
    fclose(f);

    encoder->Uninitialize();
    WelsDestroySVCEncoder(encoder);

    std::cout << "Wrote out.ts (playable in VLC)" << std::endl;
    return 0;
}
