class Keyboard {
  props = {
    textArea: null,
    wrapper: null,
    board: null,
    capsLock: false,
    value: '',
    shift: false,
    language: 'eng',
  };

  eventHanlders = {
    onclick: null,
    onkeydown: null,
    onkeyup: null,
  };

  constructor() {
    this.props.textArea = document.createElement('textarea');
    this.props.wrapper = document.createElement('div');
    this.props.wrapper.classList.add('wrapper');
    this.props.board = document.createElement('div');
    this.props.board.classList.add('keyboard');

    document.body.append(this.props.textArea);
    document.body.append(this.props.wrapper);
    this.props.wrapper.append(this.props.board);

    this.props.textArea.autofocus = true;
    this.props.textArea.focus();

    document.addEventListener('keydown', (e) => e.preventDefault());
    document.addEventListener('keyup', (e) => this.upKey(e.code));
    document.addEventListener('keydown', (e) => this.downKey(e.code));
    document.addEventListener('mousedown', (e) => this.downKey(e.target.classList[1]));
    document.addEventListener('mouseup', (e) => this.upKey(e.target.classList[1], true));
  }

  createKeys() {
    const keyObjEng = {
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

    const keyObjRus = {
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

    const keys = this.props.language === 'eng' ? Object.entries(keyObjEng) : Object.entries(keyObjRus);
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
    this.props.textArea.focus();
    const keyBtns = document.querySelectorAll('.keyboard__key');
    keyBtns.forEach((keyElem) => {
      if (keyElem.classList.contains(className)) {
        if (keyElem.textContent === 'CapsLock') {
          this.toggleCapsLock();
          keyElem.classList.toggle('keyboard__key_active', this.props.capsLock);
        } else if (keyElem.textContent === 'Space') {
          this.props.value += ' ';
          keyElem.classList.add('keyboard__key_active');
        } else if (keyElem.textContent === 'Enter') {
          this.props.value += '\n';
          keyElem.classList.add('keyboard__key_active');
        } else if (keyElem.textContent === 'Tab') {
          this.props.value += '  ';
          keyElem.classList.add('keyboard__key_active');
        } else if (keyElem.textContent === 'Backspace') {
          this.props.value = this.props.value.substring(0, this.props.value.length - 1);
          keyElem.classList.add('keyboard__key_active');
        } else if (keyElem.textContent === 'Shift') {
          this.props.shift = true;
          keyElem.classList.add('keyboard__key_active');
          this.toggleShift();
        } else if (keyElem.textContent.length > 1) {
          keyElem.classList.add('keyboard__key_active');
        } else {
          this.props.value += keyElem.textContent;
          keyElem.classList.add('keyboard__key_active');
        }
      }
    });
    this.props.textArea.value = this.props.value;
  }

  upKey(className, click = false) {
    this.props.textArea.focus();
    const keyBtns = document.querySelectorAll('.keyboard__key');
    if (click) {
      keyBtns.forEach((keyElem) => {
        if (keyElem.textContent === 'CapsLock') {
          keyElem.classList.toggle('keyboard__key_active', this.props.capsLock);
        } else if (keyElem.textContent === 'Shift') {
          this.props.shift = false;
          keyElem.classList.remove('keyboard__key_active');
          this.toggleShift();
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
          } else {
            keyElem.classList.remove('keyboard__key_active');
          }
        }
      });
    }
  }
}

const keyboard = new Keyboard();
keyboard.createKeys();
