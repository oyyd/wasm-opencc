include_directories(..)

add_executable(opencc-asm Wasm.cpp)
target_link_libraries(opencc-asm libopencc)
