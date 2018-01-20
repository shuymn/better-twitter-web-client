(async () => {
  const browser = (typeof browser === 'undefined') ? chrome : browser; // eslint-disable-line no-use-before-define

  /**
   * @param {string} messageName
   * @return {string}
   */
  function getMessage(messageName) {
    return browser.i18n.getMessage(messageName);
  }

  const extensionName = getMessage('extName');

  // head要素の変更
  (document.head.querySelector('head')).textContent = extensionName;

  // headerの中にあるh1タグの中身を変える
  const header = document.getElementById('header-title');
  header.textContent = extensionName;

  // aboutの部分の要素を変更する
  (document.getElementById('about-title')).textContent = getMessage('optAboutTitle');
  (document.getElementById('about-description')).textContent = getMessage('extDesc');

  // settingの部分の要素を変更する
  (document.getElementById('setting-title')).textContent = getMessage('optSettingTitle');
  (document.getElementById('setting-description')).textContent = getMessage('optSettingDesc');

  // settingの部分のul要素を取ってくる
  const settingRoot = document.getElementById('setting-list');

  // templateを取ってくる
  const t = document.getElementById('setting-template');

  // templateを複製
  let instance = t.content.cloneNode(true);
  let label = instance.querySelector('label');
  label.textContent = getMessage('optSettingLabelOfNewTweetLoader');

  function getValue(key) {
    return new Promise((resolve) => {
      browser.storage.sync.get(key, (item) => {
        if (Object.keys(item).length === 0) {
          resolve(true);
        } else {
          resolve(item[key]);
        }
      });
    });
  }

  let input = instance.querySelector('input');
  input.checked = await getValue('NewTweetLoader');

  input.addEventListener('click', (e) => {
    browser.storage.sync.set({
      NewTweetLoader: e.target.checked,
    });
  });

  settingRoot.appendChild(instance);

  instance = t.content.cloneNode(true);

  label = instance.querySelector('label');
  label.textContent = getMessage('optSettingLabelOfTranslationButtonHider');

  input = instance.querySelector('input');
  input.checked = await getValue('TranslationButtonHider');

  input.addEventListener('click', (e) => {
    browser.storage.sync.set({
      TranslationButtonHider: e.target.checked,
    });
  });

  settingRoot.appendChild(instance);
})();
