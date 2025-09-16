# Try to find OpenH264 library

find_path(OPENH264_INCLUDE_DIRS
    NAMES wels/codec_api.h
)

find_library(OPENH264_LIBRARIES
    NAMES openh264
)

include(FindPackageHandleStandardArgs)
find_package_handle_standard_args(OpenH264 DEFAULT_MSG
    OPENH264_INCLUDE_DIRS OPENH264_LIBRARIES)

mark_as_advanced(OPENH264_INCLUDE_DIRS OPENH264_LIBRARIES)
