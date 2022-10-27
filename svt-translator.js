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
  console.log('translation activated');

  console.log('subtitle_container searching...');
  let subtitle_container = document.querySelector("div[class^='_video-player__text']");
  if (subtitle_container == null) return console.log('subtitle_container can not be found');
  console.log('subtitle_container detected');

  subtitle_container.addEventListener('DOMSubtreeModified', subtitleChanged);
  console.log('subtitle_container onchange listener attached');
  document.body.style.border = 'red 5px solid';

  const translation = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo');
    }, 1);
  });

  console.log('stub promise initiated');

  function subtitleChanged(e) {
    console.log('subtitle changed');

    let subtitle_container = e.target;

    let text_container = subtitle_container.querySelector('p');
    let clone = text_container.firstChild.cloneNode(true);
    text_container.appendChild(document.createElement('br'));
    text_container.appendChild(clone);

    Array.from(clone.querySelectorAll('span>span>span'))
      .filter(span => !span.innerHTML.startsWith('<span>'))
      .forEach(span => span.textContent = "text");

    // Array.from(clone.querySelectorAll('span>span>span'))
    //   .filter(span => !span.innerHTML.startsWith('<span>'))
    //   .forEach(span => translation.then(text => (span.textContent = text)));

    console.log('new element added ');
  }

  document.querySelector('#activator-button').remove();
};
