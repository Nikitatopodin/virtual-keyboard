class Keyboard {
  props = {
    textArea: null,
    wrapper: null,
    board: null,
    capsLock: false,
    value: '',
    shift: false,
    ctrl: false,
    alt: false,
    language: 'eng',
    selectionStart: 0,
    selectionEnd: 0,
  };

  eventHanlders = {
    onclick: null,
    onkeydown: null,
    onkeyup: null,
  };

  keyObjEng = {
    Backquote: '`',
    Digit1: '1',
    Digit2: '2',
    Digit3: '3',
    Digit4: '4',
    Digit5: '5',
    Digit6: '6',
    Digit7: '7',
    Digit8: '8',
    Digit9: '9',
    Digit0: '0',
    Minus: '-',
    Equal: '=',
    Backspace: 'Backspace',
    Tab: 'Tab',
    KeyQ: 'q',
    KeyW: 'w',
    KeyE: 'e',
    KeyR: 'r',
    KeyT: 't',
    KeyY: 'y',
    KeyU: 'u',
    KeyI: 'i',
    KeyO: 'o',
    KeyP: 'p',
    BracketLeft: '[',
    BracketRight: ']',
    Backslash: '\\',
    CapsLock: 'CapsLock',
    KeyA: 'a',
    KeyS: 's',
    KeyD: 'd',
    KeyF: 'f',
    KeyG: 'g',
    KeyH: 'h',
    KeyJ: 'j',
    KeyK: 'k',
    KeyL: 'l',
    Semicolon: ';',
    Quote: "'",
    Enter: 'Enter',
    ShiftLeft: 'Shift',
    KeyZ: 'z',
    KeyX: 'x',
    KeyC: 'c',
    KeyV: 'v',
    KeyB: 'b',
    KeyN: 'n',
    KeyM: 'm',
    Comma: ',',
    Period: '.',
    Slash: '/',
    ArrowUp: '',
    ShiftRight: 'Shift',
    ControlLeft: 'Ctrl',
    MetaLeft: 'Win',
    AltLeft: 'Alt',
    Space: 'Space',
    AltRight: 'Alt',
    ControlRight: 'Ctrl',
    ArrowLeft: '',
    ArrowDown: '',
    ArrowRight: '',
    Delete: 'DEL',
  };

  keyObjRus = {
    Backquote: 'ё',
    Digit1: '1',
    Digit2: '2',
    Digit3: '3',
    Digit4: '4',
    Digit5: '5',
    Digit6: '6',
    Digit7: '7',
    Digit8: '8',
    Digit9: '9',
    Digit0: '0',
    Minus: '-',
    Equal: '=',
    Backspace: 'Backspace',
    Tab: 'Tab',
    KeyQ: 'й',
    KeyW: 'ц',
    KeyE: 'у',
    KeyR: 'к',
    KeyT: 'е',
    KeyY: 'н',
    KeyU: 'г',
    KeyI: 'ш',
    KeyO: 'щ',
    KeyP: 'з',
    BracketLeft: 'х',
    BracketRight: 'ъ',
    Backslash: '\\',
    CapsLock: 'CapsLock',
    KeyA: 'ф',
    KeyS: 'ы',
    KeyD: 'в',
    KeyF: 'а',
    KeyG: 'п',
    KeyH: 'р',
    KeyJ: 'о',
    KeyK: 'л',
    KeyL: 'д',
    Semicolon: 'ж',
    Quote: 'э',
    Enter: 'Enter',
    ShiftLeft: 'Shift',
    KeyZ: 'я',
    KeyX: 'ч',
    KeyC: 'с',
    KeyV: 'м',
    KeyB: 'и',
    KeyN: 'т',
    KeyM: 'ь',
    Comma: 'б',
    Period: 'ю',
    Slash: '.',
    ArrowUp: '',
    ShiftRight: 'Shift',
    ControlLeft: 'Ctrl',
    MetaLeft: 'Win',
    AltLeft: 'Alt',
    Space: 'Space',
    AltRight: 'Alt',
    ControlRight: 'Ctrl',
    ArrowLeft: '',
    ArrowDown: '',
    ArrowRight: '',
    Delete: 'DEL',
  };

  constructor() {
    this.props.textArea = document.createElement('textarea');
    this.props.textArea.classList.add('textarea');
    this.props.textArea.rows = 10;
    this.props.textArea.cols = 100;
    this.props.wrapper = document.createElement('div');
    this.props.wrapper.classList.add('wrapper');
    this.props.board = document.createElement('div');
    this.props.board.classList.add('keyboard');

    document.body.append(this.props.textArea);
    document.body.append(this.props.wrapper);
    this.props.wrapper.append(this.props.board);

    this.props.textArea.autofocus = true;
    this.props.textArea.focus();
    this.props.selectionStart = this.props.textArea.selectionStart;
    this.props.selectionEnd = this.props.textArea.selectionEnd;

    document.addEventListener('keydown', (e) => e.preventDefault());
    document.addEventListener('keyup', (e) => this.upKey(e.code));
    document.addEventListener('keydown', (e) => this.downKey(e.code));
    document.addEventListener('mousedown', (e) => this.downKey(e.target.classList[1]));
    document.addEventListener('mouseup', (e) => this.upKey(e.target.classList[1], true));
    this.props.textArea.addEventListener('click', (e) => {
      this.props.selectionEnd = e.target.selectionEnd;
      this.props.textArea.selectionStart = this.props.selectionEnd;
      this.props.selectionStart = e.target.selectionStart;
      this.props.textArea.selectionEnd = this.props.selectionStart;
    });

    const setLocalStorage = () => {
      localStorage.setItem('currentLng', this.props.language);
    };

    const getLocalStorage = () => {
      if (localStorage.getItem('currentLng', this.props.language)) {
        this.props.language = localStorage.getItem('currentLng', this.props.language);
        if (this.props.language === 'eng') {
          this.createKeys(this.keyObjEng);
        } else {
          this.createKeys(this.keyObjRus);
        }
      } else {
        this.createKeys(this.keyObjEng);
      }
    };
    window.addEventListener('beforeunload', setLocalStorage);
    window.addEventListener('load', getLocalStorage);
  }

  createKeys(keyObj) {
    const keys = Object.entries(keyObj);
    const edgeKeys = ['Backspace', '\\', 'Enter', 'Shift'];
    const wideKeys = ['CapsLock', 'Enter', 'Shift', 'Backspace', 'Tab'];

    keys.forEach((pair, index) => {
      const keyBtn = document.createElement('button');
      const br = document.createElement('br');
      const keyValue = pair[1];
      const keyCode = pair[0];
      keyBtn.textContent = keyValue;
      keyBtn.classList.add('keyboard__key');
      keyBtn.classList.add(keyCode);
      this.props.board.append(keyBtn);

      // Adding break lines for correct keyboard display
      if (edgeKeys.includes(keyValue)) {
        if (keyValue === 'Shift' && keys[index - 1] === 'up') {
          this.props.board.append(br);
        }

        if (keyValue !== 'Shift') {
          this.props.board.append(br);
        }
      }

      // Special cases
      if (keyValue === 'Space') {
        keyBtn.classList.add('keyboard__key_space', 'Space');
      } else if (wideKeys.includes(keyValue)) {
        keyBtn.classList.add('keyboard__key_wide');
      }
    });
  }

  toggleCapsLock() {
    this.props.capsLock = !this.props.capsLock;

    const keyBtns = document.querySelectorAll('.keyboard__key');

    keyBtns.forEach((k) => {
      const kCopy = k;
      if (this.props.capsLock) {
        if (k.textContent.length === 1) {
          kCopy.textContent = k.textContent.toUpperCase();
        }
      } else if (!this.props.capsLock) {
        if (k.textContent.length === 1) {
          kCopy.textContent = k.textContent.toLowerCase();
        }
      }
    });
  }

  toggleShift() {
    const nonShiftSpecialKeysEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '[', ']', '\\', ';', "'", ',', '.', '/'];
    const shiftSpecialKeysEng = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'];
    const nonShiftSpecialKeysRus = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'х', 'ъ', '\\', 'ж', 'э', 'б', 'ю', '.'];
    const shiftSpecialKeysRus = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Х', 'Ъ', '/', 'Ж', 'Э', 'Б', 'Ю', ','];
    const keyBtns = document.querySelectorAll('.keyboard__key');

    const shiftSpecialKeys = this.props.language === 'eng' ? shiftSpecialKeysEng : shiftSpecialKeysRus;
    const nonShiftSpecialKeys = this.props.language === 'eng' ? nonShiftSpecialKeysEng : nonShiftSpecialKeysRus;

    keyBtns.forEach((k) => {
      const kCopy = k;
      if (this.props.shift) {
        if (this.props.capsLock) {
          if (k.textContent.length === 1) {
            kCopy.textContent = k.textContent.toLowerCase();
          }

          if (nonShiftSpecialKeys.indexOf(k.textContent) !== -1) {
            kCopy.textContent = shiftSpecialKeys[nonShiftSpecialKeys.indexOf(k.textContent)]
              .toLowerCase();
          }
        } else {
          if (k.textContent.length === 1) {
            kCopy.textContent = k.textContent.toUpperCase();
          }

          if (nonShiftSpecialKeys.indexOf(k.textContent) !== -1) {
            kCopy.textContent = shiftSpecialKeys[nonShiftSpecialKeys.indexOf(k.textContent)]
              .toLowerCase();
          }
        }
      } else if (!this.props.shift) {
        if (this.props.capsLock) {
          if (k.textContent.length === 1) {
            kCopy.textContent = k.textContent.toUpperCase();
          }

          if (shiftSpecialKeys.indexOf(k.textContent) !== -1) {
            kCopy.textContent = nonShiftSpecialKeys[shiftSpecialKeys.indexOf(k.textContent)]
              .toUpperCase();
          }
        } else {
          if (k.textContent.length === 1) {
            kCopy.textContent = k.textContent.toLowerCase();
          }

          if (shiftSpecialKeys.indexOf(k.textContent) !== -1) {
            kCopy.textContent = nonShiftSpecialKeys[shiftSpecialKeys.indexOf(k.textContent)]
              .toLowerCase();
          }
        }
      }
    });
  }

  downKey(className) {
    const textField = this.props.textArea;
    textField.focus();
    const keyBtns = document.querySelectorAll('.keyboard__key');
    keyBtns.forEach((keyElem) => {
      if (keyElem.classList.contains(className)) {
        if (keyElem.textContent === 'CapsLock') {
          this.toggleCapsLock();
          keyElem.classList.toggle('keyboard__key_active', this.props.capsLock);
        } else if (keyElem.textContent === 'Space') {
          textField.value = `${textField.value.substring(0, this.props.selectionEnd)} ${textField.value.substring(this.props.selectionEnd)}`;

          this.props.selectionStart += 1;
          this.props.selectionEnd += 1;

          keyElem.classList.add('keyboard__key_active');
        } else if (keyElem.textContent === 'Enter') {
          keyElem.classList.add('keyboard__key_active');

          textField.value = `${textField.value.substring(0, this.props.selectionEnd)}\n${textField.value.substring(this.props.selectionEnd)}`;

          this.props.selectionStart += 1;
          this.props.selectionEnd += 1;

          textField.selectionStart = this.props.selectionStart;
          textField.selectionEnd = this.props.selectionEnd;
        } else if (keyElem.textContent === 'Tab') {
          keyElem.classList.add('keyboard__key_active');
          textField.value = `${textField.value.substring(0, this.props.selectionEnd)}  ${textField.value.substring(this.props.selectionEnd)}`;

          this.props.selectionStart += 2;
          this.props.selectionEnd += 2;
          textField.selectionStart = this.props.selectionStart;
          textField.selectionEnd = this.props.selectionEnd;
        } else if (keyElem.textContent === 'Backspace') {
          keyElem.classList.add('keyboard__key_active');

          textField.value = textField.value.substring(0, this.props.selectionEnd - 1)
            + textField.value.substring(this.props.selectionEnd);

          if (this.props.selectionEnd > 0) {
            this.props.selectionEnd -= 1;
            this.props.selectionStart -= 1;
          }

          textField.selectionStart = this.props.selectionStart;
          textField.selectionEnd = this.props.selectionEnd;
        } else if (keyElem.textContent === 'Shift') {
          this.props.shift = true;
          keyElem.classList.add('keyboard__key_active');
          this.toggleShift();
        } else if (keyElem.textContent === 'DEL') {
          textField.value = textField.value.substring(0, this.props.selectionEnd)
            + textField.value.substring(this.props.selectionEnd + 1);

          keyElem.classList.add('keyboard__key_active');

          textField.selectionStart = this.props.selectionStart;
          textField.selectionEnd = this.props.selectionEnd;
        } else if (keyElem.textContent === 'Ctrl' || keyElem.textContent === 'Alt') {
          keyElem.classList.add('keyboard__key_active');
          if (keyElem.textContent === 'Ctrl') {
            this.props.ctrl = true;
            if (this.props.alt) {
              if (this.props.language === 'eng') {
                this.changeLanguage(this.keyObjRus);
              } else {
                this.changeLanguage(this.keyObjEng);
              }
            }
          }
          if (keyElem.textContent === 'Alt') {
            this.props.alt = true;
            if (this.props.ctrl) {
              if (this.props.language === 'eng') {
                this.changeLanguage(this.keyObjRus);
              } else {
                this.changeLanguage(this.keyObjEng);
              }
            }
          }
        } else if (keyElem.textContent.length > 1) {
          keyElem.classList.add('keyboard__key_active');
        } else {
          keyElem.classList.add('keyboard__key_active');

          textField.value = textField.value.substring(0, this.props.selectionEnd)
            + keyElem.textContent
            + textField.value.substring(this.props.selectionEnd);

          this.props.selectionStart += 1;
          this.props.selectionEnd += 1;
          textField.selectionStart = this.props.selectionStart;
          textField.selectionEnd = this.props.selectionEnd;
        }
      }
    });
  }

  upKey(className, click = false) {
    const textField = this.props.textArea;
    textField.focus();
    const keyBtns = document.querySelectorAll('.keyboard__key');
    if (click) {
      keyBtns.forEach((keyElem) => {
        if (keyElem.textContent === 'CapsLock') {
          keyElem.classList.toggle('keyboard__key_active', this.props.capsLock);
        } else if (keyElem.textContent === 'Shift') {
          this.props.shift = false;
          keyElem.classList.remove('keyboard__key_active');
          this.toggleShift();
        } else if (keyElem.textContent === 'Ctrl' || keyElem.textContent === 'Alt') {
          keyElem.classList.remove('keyboard__key_active');
          if (keyElem.textContent === 'Ctrl') {
            this.props.ctrl = false;
          }
          if (keyElem.textContent === 'Alt') {
            this.props.alt = false;
          }
        } else {
          keyElem.classList.remove('keyboard__key_active');
        }
      });
    } else {
      keyBtns.forEach((keyElem) => {
        if (keyElem.classList.contains(className)) {
          if (keyElem.textContent === 'CapsLock') {
            keyElem.classList.toggle('keyboard__key_active', this.props.capsLock);
          } else if (keyElem.textContent === 'Shift') {
            this.props.shift = false;
            keyElem.classList.remove('keyboard__key_active');
            this.toggleShift();
          } else if (keyElem.textContent === 'Ctrl' || keyElem.textContent === 'Alt') {
            keyElem.classList.remove('keyboard__key_active');
            if (keyElem.textContent === 'Ctrl') {
              this.props.ctrl = false;
            }
            if (keyElem.textContent === 'Alt') {
              this.props.alt = false;
            }
          } else {
            keyElem.classList.remove('keyboard__key_active');
          }
        }
      });
    }
  }

  changeLanguage(keyObj) {
    if (this.props.language === 'eng') {
      this.props.language = 'rus';
    } else {
      this.props.language = 'eng';
    }
    const keyBtns = document.querySelectorAll('.keyboard__key');
    const keys = Object.entries(keyObj);
    keyBtns.forEach((keyElem) => {
      keys.forEach((pair) => {
        const keyValue = pair[1];
        const keyCode = pair[0];

        if (keyElem.classList.contains(keyCode)) {
          const keyCopy = keyElem;
          keyCopy.textContent = keyValue;
        }
      });
    });
  }
}
const keyboard = new Keyboard();
