import {
  getMessage,
  getValue,
} from './browser-helper';

const browser = (typeof browser === 'undefined') ? chrome : browser; // eslint-disable-line no-use-before-define

/**
 * @param {string} messageName
 * @param {string} key
 * @returns {Promise<any>}
 */
export async function setTextContent(messageName, key) {
  const target = document.querySelector(key);

  if (target === null) {
    throw new Error(`incorrect selector : '${key}'`);
  }

  target.textContent = await getMessage(messageName);

  return key;
}

/**
 * @param {string} messageName
 * @param {string} key
 * @returns {Promise<any>}
 */
export async function setCheckbox(messageName, key) {
  const instance = document.getElementById('setting-template').content.cloneNode(true);
  const input = instance.querySelector('input');

  instance.querySelector('label').textContent = await getMessage(messageName);

  try {
    input.checked = await getValue(key);
  } catch (e) {
    input.checked = true;
  }

  input.addEventListener('click', (e) => {
    browser.storage.sync.set({
      [key]: e.target.checked,
    });
  });

  return document.getElementById('setting-list').appendChild(instance);
}
