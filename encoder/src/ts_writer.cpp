#include "ts_writer.h"
#include <cstring>
#include <vector>

static FILE* outFile;
static uint16_t pid_video = 0x100;
static int continuity_counter = 0;

void write_ts_packet(const uint8_t* data, int len) {
    uint8_t packet[188];
    memset(packet, 0xff, sizeof(packet));

    packet[0] = 0x47; // sync
    packet[1] = (pid_video >> 8) & 0x1f;
    packet[2] = pid_video & 0xff;
    packet[3] = 0x10 | (continuity_counter++ & 0x0f);

    int payload_size = 184;
    int copy_len = len < payload_size ? len : payload_size;
    memcpy(packet + 4, data, copy_len);

    fwrite(packet, 1, 188, outFile);
}

void init_ts_writer(FILE* f) {
    outFile = f;
    continuity_counter = 0;
    // TODO: write PAT/PMT here for complete compliance
}

void write_nal_to_ts(uint8_t* data, int len) {
    while (len > 0) {
        int chunk = len > 184 ? 184 : len;
        write_ts_packet(data, chunk);
        data += chunk;
        len -= chunk;
    }
}

void finalize_ts_writer() {
    // TODO: flush PAT/PMT properly
}
