const browser = (typeof browser === 'undefined') ? chrome : browser; // eslint-disable-line no-use-before-define

/**
 * @param {string} messageName
 * @returns {Promise<any>}
 */
async function getMessage(messageName) {
  const response = browser.i18n.getMessage(messageName);

  if (response === '') {
    throw new Error(`${messageName} is not defined.`);
  } else {
    return response;
  }
}

/**
 * get value from browser storage
 * @param {string} key
 * @returns {Promise<any>}
 */
async function getValue(key) {
  let resolve;
  let reject;

  const promise = new Promise((_resolve, _reject) => {
    [resolve, reject] = [_resolve, _reject];
  });

  browser.storage.sync.get(key, (item) => {
    if (Object.keys(item).length === 0) {
      reject(`${key} is not stored.`);
    } else {
      resolve(item[key]);
    }
  });

  return promise;
}

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

  return Promise.resolve(key);
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
  input.checked = await getValue(key);

  input.addEventListener('click', (e) => {
    browser.storage.sync.set({
      [key]: e.target.checked,
    });
  });

  return document.getElementById('setting-list').appendChild(instance);
}
