cmake_minimum_required(VERSION 3.10)
project(openh264_demo)

set(CMAKE_CXX_STANDARD 17)

list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")

find_package(OpenH264 REQUIRED)

include_directories(${OPENH264_INCLUDE_DIRS})

add_executable(openh264_demo
    src/openh264_demo.cpp
    src/ts_writer.cpp
)

target_link_libraries(openh264_demo ${OPENH264_LIBRARIES})
