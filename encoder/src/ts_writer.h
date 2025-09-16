#pragma once
#include <cstdint>
#include <cstdio>

void init_ts_writer(FILE* f);
void write_nal_to_ts(uint8_t* data, int len);
void finalize_ts_writer();
