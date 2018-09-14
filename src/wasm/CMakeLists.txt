include_directories(..)

add_executable(opencc_wasm Wasm.cpp)
target_link_libraries(opencc_wasm libopencc)
