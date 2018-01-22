const browser = (typeof browser === 'undefined') ? chrome : browser; // eslint-disable-line no-use-before-define

/**
 * @param {string} messageName
 * @returns {Promise<any>}
 */
export async function getMessage(messageName) {
  const response = browser.i18n.getMessage(messageName);

  if (response === '') {
    throw new Error(`${messageName} is not defined.`);
  }

  return response;
}

/**
 * get value from browser storage
 * @param {string} key
 * @returns {Promise<any>}
 */
export async function getValue(key) {
  let resolve;
  let reject;

  const promise = new Promise((_resolve, _reject) => {
    [resolve, reject] = [_resolve, _reject];
  });

  const features = {
    NewTweetLoader: true,
    TranslationButtonHider: true,
  };

  browser.storage.sync.get(features, (items) => {
    if (typeof items[key] === 'undefined') {
      reject(new Error(`${key} is not stored.`));
    } else {
      resolve(items[key]);
    }
  });

  return promise;
}
