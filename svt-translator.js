document.body.style.border = 'blue 5px solid';

let activatorButton = document.createElement('button');
activatorButton.appendChild(document.createTextNode('Activate Translation'));
activatorButton.style.position = 'fixed';
activatorButton.style.right = '0px';
activatorButton.style.top = '0px';
activatorButton.style.zIndex = '1000';
activatorButton.id = 'activator-button';
document.body.appendChild(activatorButton);

activatorButton.onclick = () => {
  const subtitle_container = document.querySelector("div[class^='_video-player__text']");
  if (subtitle_container == null) return console.log('subtitle_container can not be found');

  subtitleChanged = translation => e => {
    const subtitle_container = e.target;

    const text_container = subtitle_container.querySelector('p');
    if (text_container.querySelector('#translation')) return;
    const clone = text_container.firstChild.cloneNode(true);
    text_container.appendChild(document.createElement('br'));
    text_container.appendChild(clone);
    clone.id = 'translation';

    Array.from(clone.querySelectorAll('span>span>span'))
      .filter(span => !span.innerHTML.startsWith('<span>'))
      .forEach(span => {
        translation(span.innerText).then(translation_text => (span.innerText = translation_text));
        span.style.borderBottom = 'yellow 1px solid';
        span.innerText = '  ';
      });
  };

  activatorButton.remove();

  subtitle_container.addEventListener('DOMSubtreeModified', subtitleChanged(translation_mymemory));
  document.body.style.border = 'red 5px solid';
};

const translationLocal = text =>
  fetch('http://localhost:5000/translate', {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      source: 'sv',
      target: 'en'
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(translate_json => translate_json.translatedText);

const translation_mymemory = text =>
  fetch(
    `https://api.mymemory.translated.net/get?${new URLSearchParams({
      q: text.replaceAll('-', '').replaceAll('\n', ' \n ')
    })}&langpair=sv|en`
  )
    .then(response => response.json())
    .then(x => (console.log(x), x))
    .then(translate_json => translate_json.matches.find(match => match.model === 'neural').translation);
