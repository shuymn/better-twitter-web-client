const browser = (typeof browser === 'undefined') ? chrome : browser; // eslint-disable-line no-use-before-define

const settings = document.getElementById('settings');
const t = settings.querySelector('#setting-template');
const instance = t.content.cloneNode(true);
settings.appendChild(instance);
