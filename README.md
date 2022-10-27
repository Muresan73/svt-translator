# SVT Player Translator

This Firefox extension provides added translation to SVT's Swedish subtitles.

It uses Libretranslate local instance to translate the text.

By default the text will be translated to English, but other languages can be supported easily.

### Requirements

- Docker

- Firefox

## Usage

1. At `about:debugging` url in Firefox select **This Firefox** in the left side panel.

2. Then you should click the **Load Temporary Add-on** button and select any file from the project to load the extension for this session into the browser.

3. Start Docker and use the provided `start_libretranslate.sh` script to run Libretranslate

```bash
docker run -ti --rm -p 5000:5000 --name libretranslate  libretranslate/libretranslate --load-only "en,sv"
```

4. Click the `Activete Translation` button after you started the video. It is a shortcoming of the script that it can not handle errors and other corner cases but it work :D





> Many thanks to the people at [Libretranslate](https://libretranslate.com) and [Argos Translate](https://github.com/argosopentech/argos-translate)
