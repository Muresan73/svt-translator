#!/bin/bash
docker run -ti --rm -p 5000:5000 --name libretranslate  libretranslate/libretranslate --load-only "en,sv"