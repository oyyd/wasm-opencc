include_directories(..)

add_executable(asm Wasm.cpp)
target_link_libraries(asm libopencc)
