import { keyObjEng, keyObjRus } from './modules/keyObj.js';

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
    selectStart: 0,
    selectEnd: 0,
    keyClicked: null,
  };

  constructor() {
    this.props.textArea = document.createElement('textarea');
    this.props.textArea.classList.add('textarea');
    this.props.textArea.rows = 10;
    this.props.textArea.cols = 100;
    this.props.textArea.wrap = 'hard';
    this.props.wrapper = document.createElement('div');
    this.props.wrapper.classList.add('wrapper');
    this.props.board = document.createElement('div');
    this.props.board.classList.add('keyboard');

    document.body.append(this.props.textArea);
    document.body.append(this.props.wrapper);
    this.props.wrapper.append(this.props.board);

    this.props.textArea.autofocus = true;
    this.props.textArea.focus();
    this.props.selectStart = this.props.textArea.selectionStart;
    this.props.selectEnd = this.props.textArea.selectionEnd;

    document.addEventListener('keydown', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => this.downKey(e.code));
    document.addEventListener('keyup', (e) => this.upKey(e.code));
    document.addEventListener('mousedown', (e) => this.downKey(e.target.classList[1], e, true));
    document.addEventListener('mouseup', (e) => this.upKey(e.target.classList[1], e, true));

    this.props.textArea.addEventListener('click', (e) => {
      this.props.selectEnd = e.target.selectionEnd;
      this.props.selectStart = e.target.selectionStart;
      this.props.textArea.selectionStart = this.props.selectStart;
      this.props.textArea.selectionEnd = this.props.selectEnd;
    });

    const setLocalStorage = () => {
      localStorage.setItem('currentLng', this.props.language);
    };

    const getLocalStorage = () => {
      if (localStorage.getItem('currentLng', this.props.language)) {
        this.props.language = localStorage.getItem('currentLng', this.props.language);
        if (this.props.language === 'eng') {
          this.createKeys(keyObjEng);
        } else {
          this.createKeys(keyObjRus);
        }
      } else {
        this.createKeys(keyObjEng);
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
          kCopy.textContent = this.props.shift ? k.textContent.toLowerCase()
            : k.textContent.toUpperCase();
        }
      } else if (!this.props.capsLock) {
        if (k.textContent.length === 1) {
          kCopy.textContent = this.props.shift ? k.textContent.toUpperCase()
            : k.textContent.toLowerCase();
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
        if (k.textContent.length === 1) {
          kCopy.textContent = this.props.capsLock ? k.textContent.toLowerCase()
            : k.textContent.toUpperCase();
        }

        if (nonShiftSpecialKeys.indexOf(k.textContent) !== -1) {
          kCopy.textContent = shiftSpecialKeys[nonShiftSpecialKeys.indexOf(k.textContent)]
            .toLowerCase();
        }
      } else {
        if (k.textContent.length === 1) {
          kCopy.textContent = this.props.capsLock ? k.textContent.toUpperCase()
            : k.textContent.toLowerCase();
        }

        if (shiftSpecialKeys.indexOf(k.textContent) !== -1) {
          kCopy.textContent = nonShiftSpecialKeys[shiftSpecialKeys.indexOf(k.textContent)]
            .toUpperCase();
        }
      }
    });
  }

  downKey(className, event, click = false) {
    const textField = this.props.textArea;
    if (click) {
      this.props.keyClicked = event;
    }
    textField.focus();
    const keyBtns = document.querySelectorAll('.keyboard__key');

    keyBtns.forEach((keyElem) => {
      if (keyElem.classList.contains(className)) {
        if (keyElem.textContent === 'CapsLock') {
          this.toggleCapsLock();
          keyElem.classList.toggle('keyboard__key_active', this.props.capsLock);
        } else if (keyElem.textContent === 'Space') {
          keyElem.classList.add('keyboard__key_active');
          textField.value = `${textField.value.substring(0, this.props.selectEnd)} ${textField.value.substring(this.props.selectEnd)}`;

          this.changeCarriagePos(1);
        } else if (keyElem.textContent === 'Enter') {
          keyElem.classList.add('keyboard__key_active');

          textField.value = `${textField.value.substring(0, this.props.selectEnd)}\n${textField.value.substring(this.props.selectEnd)}`;

          this.changeCarriagePos(1);
        } else if (keyElem.textContent === 'Tab') {
          keyElem.classList.add('keyboard__key_active');
          textField.value = `${textField.value.substring(0, this.props.selectEnd)}\t${textField.value.substring(this.props.selectEnd)}`;

          this.changeCarriagePos(1);
        } else if (keyElem.textContent === 'Backspace') {
          keyElem.classList.add('keyboard__key_active');

          textField.value = textField.value.substring(0, this.props.selectEnd - 1)
            + textField.value.substring(this.props.selectEnd);

          this.changeCarriagePos(1, false);
        } else if (keyElem.textContent === 'Shift') {
          keyElem.classList.add('keyboard__key_active');
          if (this.props.shift) {
            return;
          }
          this.props.shift = true;
          this.toggleShift();
        } else if (keyElem.textContent === 'Del') {
          keyElem.classList.add('keyboard__key_active');

          textField.value = textField.value.substring(0, this.props.selectEnd)
            + textField.value.substring(this.props.selectEnd + 1);
          this.changeCarriagePos(0);
        } else if (keyElem.textContent === 'Win'
          || keyElem.classList.contains('AltRight')
          || keyElem.classList.contains('ControlRight')) {
          keyElem.classList.add('keyboard__key_active');
        } else if (keyElem.classList.contains('ControlLeft') || keyElem.classList.contains('AltLeft')) {
          keyElem.classList.add('keyboard__key_active');
          if (keyElem.textContent === 'Ctrl') {
            if (this.props.ctrl) {
              return;
            }
            this.props.ctrl = true;
            if (this.props.alt) {
              if (this.props.language === 'eng') {
                this.changeLanguage(keyObjRus);
              } else {
                this.changeLanguage(keyObjEng);
              }
            }
          }
          if (keyElem.classList.contains('AltLeft')) {
            if (this.props.alt) {
              return;
            }
            this.props.alt = true;
            if (this.props.ctrl) {
              if (this.props.language === 'eng') {
                this.changeLanguage(keyObjRus);
              } else {
                this.changeLanguage(keyObjEng);
              }
            }
          }
        } else if (keyElem.classList.contains('ArrowRight')) {
          keyElem.classList.add('keyboard__key_active');

          this.changeCarriagePos(1);
        } else if (keyElem.classList.contains('ArrowLeft')) {
          keyElem.classList.add('keyboard__key_active');

          this.changeCarriagePos(1, false);
        } else if (keyElem.classList.contains('ArrowUp')) {
          keyElem.classList.add('keyboard__key_active');

          const partTextArea = textField.value.substring(0, this.props.selectStart);
          const prev = partTextArea.substring(partTextArea.lastIndexOf('\n'), this.props.selectStart);
          const prevPrev = partTextArea.substring(partTextArea.lastIndexOf('\n', this.props.selectStart - prev.length - 1) + 1);

          if (prev.length > prevPrev.length - prev.length) {
            this.changeCarriagePos(prev.length, false);
          } else {
            this.changeCarriagePos(prevPrev.length - prev.length + 1, false);
          }
        } else if (keyElem.classList.contains('ArrowDown')) {
          keyElem.classList.add('keyboard__key_active');

          const partTextArea = textField.value.substring(textField.value.lastIndexOf('\n', this.props.selectStart), textField.value.indexOf('\n', this.props.selectStart));
          const lstIndOf = textField.value.indexOf('\n', this.props.selectStart + 1) !== -1 ? textField.value.indexOf('\n', this.props.selectStart + 1) : textField.value.length;

          if (this.props.selectStart < textField.value.indexOf('\n')) {
            this.changeCarriagePos(partTextArea.length + 1);
          } else if (textField.value[this.props.selectStart] !== '\n' && this.props.selectStart > textField.value.indexOf('\n')) {
            this.changeCarriagePos(partTextArea.length);
          } else {
            this.props.selectStart = lstIndOf;
            this.props.selectEnd = lstIndOf;
          }

          textField.selectionStart = this.props.selectStart;
          textField.selectionEnd = this.props.selectEnd;
        } else {
          keyElem.classList.add('keyboard__key_active');

          textField.value = textField.value.substring(0, this.props.selectEnd)
            + keyElem.textContent
            + textField.value.substring(this.props.selectEnd);
          this.changeCarriagePos(1);
        }
      }
    });
  }

  upKey(className, click = false) {
    const textField = this.props.textArea;
    textField.focus();
    const keyBtns = document.querySelectorAll('.keyboard__key');
    const { keyClicked } = this.props;

    if (click) {
      keyBtns.forEach((keyElem) => {
        if (keyElem.textContent === 'CapsLock') {
          keyElem.classList.toggle('keyboard__key_active', this.props.capsLock);
        } else if (keyElem.textContent === 'Shift' && keyClicked.target.textContent === 'Shift') {
          this.props.shift = false;
          keyElem.classList.toggle('keyboard__key_active', this.props.shift);
          this.toggleShift();
        } else if ((keyElem.classList.contains('ControlLeft') && keyClicked.target.textContent === 'Ctrl')
          || (keyElem.classList.contains('AltLeft') && keyClicked.target.textContent === 'Alt')) {
          if (keyElem.classList.contains('ControlLeft')) {
            this.props.ctrl = false;
            keyElem.classList.toggle('keyboard__key_active', this.props.ctrl);
          }
          if (keyElem.classList.contains('AltLeft')) {
            this.props.alt = false;
            keyElem.classList.toggle('keyboard__key_active', this.props.alt);
          }
        } else if (keyClicked.shiftKey) {
          if (keyElem.textContent !== 'Shift') {
            keyElem.classList.remove('keyboard__key_active');
          }
        } else if (keyClicked.altKey) {
          if (keyElem.textContent !== 'Alt') {
            keyElem.classList.remove('keyboard__key_active');
          }
        } else if (keyClicked.ctrlKey) {
          if (keyElem.textContent !== 'Ctrl') {
            keyElem.classList.remove('keyboard__key_active');
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
          } else if (keyElem.classList.contains('ControlLeft') || keyElem.classList.contains('AltLeft')) {
            keyElem.classList.remove('keyboard__key_active');
            if (keyElem.classList.contains('ControlLeft')) {
              this.props.ctrl = false;
            }
            if (keyElem.classList.contains('AltLeft')) {
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

          if (this.props.shift && this.props.capsLock) {
            keyCopy.textContent = keyValue;
          } else if (this.props.shift || this.props.capsLock) {
            if (keyCopy.textContent.length === 1) {
              keyCopy.textContent = keyValue.toUpperCase();
            }
          } else {
            keyCopy.textContent = keyValue;
          }
        }
      });
    });
  }

  changeCarriagePos(n, plus = true) {
    const textField = this.props.textArea;

    if (plus) {
      if (this.props.selectStart + n <= textField.value.length) {
        this.props.selectStart += n;
        this.props.selectEnd += n;
      }
    } else if (!plus) {
      if (this.props.selectStart - n >= 0) {
        this.props.selectStart -= n;
        this.props.selectEnd -= n;
      }
    }
    textField.selectionStart = this.props.selectStart;
    textField.selectionEnd = this.props.selectEnd;
  }
}
const keyboard = new Keyboard();
