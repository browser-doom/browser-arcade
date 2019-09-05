FROM ubuntu:18.04
ENV DEBIAN_FRONTEND noninteractive

# Install some required packages
RUN apt-get update && \
    apt-get -y install python2.7 build-essential wget git libxml2 default-jre

# Need to build a recent version of CMake (>= 3.12)

RUN mkdir -p /tools/src && cd /tools/src && \
    wget https://github.com/Kitware/CMake/releases/download/v3.15.3/cmake-3.15.3.tar.gz && \
    tar xf cmake-3.15.3.tar.gz && \
    cd cmake-3.15.3 && \
    ./bootstrap && make && make install

RUN ln -s /usr/bin/python2.7 /usr/local/bin/python

# Download and activate Emscripten toolchain
RUN cd /tools/src && \
    git clone https://github.com/emscripten-core/emsdk.git && \
    cd emsdk && \
    ./emsdk install 1.38.42 && \
    ./emsdk activate 1.38.42

ENV PATH=/tools/src/emsdk:/tools/src/emsdk/fastcomp/emscripten:/tools/src/emsdk/node/12.9.1_64bit/bin:${PATH}

# The SDL2_mixer that is included with Emscripten does not support automatic
# audio format conversions, which is required for sound to work in some games.
# So patch the Emscripten toolchain so it uses a more recent version of SDL2_mixer
RUN sed -i 's/release-2.0.1/release-2.0.2/;s/81fac757bd058adcb3eb5b2cc46addeaa44cee2cd4db653dad5d9666bdc0385cdc21bf5b72872e6dd6dd8eb65812a46d7752298827d6c61ad5ce2b6c963f7ed0/b9d03061d177f20f4e03f3e3553afd7bfe0c05da7b9a774312b389318e747cf9724e0475e9afff6a64ce31bab0217e2afb2619d75556753fbbb6ecafa9775219/' /tools/src/emsdk/fastcomp/emscripten/tools/ports/sdl2_mixer.py && \
    sed -i 's/2.0.0/2.0.9/' /tools/src/emsdk/fastcomp/emscripten/system/bin/sdl2-config

# Compile a dummy project with the ports that will be used. This ensures the ports are present in the toolchain image,
# and does not need to be downloaded and built each time
RUN mkdir -p /tools/src/dummy && \
    cd /tools/src/dummy && \
    echo "int main(int argc, char** argv) { return 0; }" > dummy.c && \
    emcc -s WASM=1 -s USE_SDL=2 -s USE_SDL_MIXER=2 -s USE_SDL_NET=2 -s USE_ZLIB=1 -s USE_LIBPNG=1 dummy.c

# The build environment should be ready at this point