class Keyboard {
  props = {
    textArea: null,
    wrapper: null,
    board: null,
    capsLock: false,
    value: '',
    shift: false,
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

    document.addEventListener('keydown', (e) => {
      e.preventDefault();
    });
  }

  createKeys() {
    const keysObj = {
      Backquote: '`',
      Digit1: '!',
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
      ArrowUp: 'up',
      ShiftRight: 'Shift',
      ControlLeft: 'Ctrl',
      MetaLeft: 'Win',
      AltLeft: 'Alt',
      Space: 'Space',
      AltRight: 'Alt',
      ControlRight: 'Ctrl',
      ArrowLeft: 'left',
      ArrowDown: 'down',
      ArrowRight: 'right',
      Delete: 'DEL',
    };
    const keys = Object.entries(keysObj);
    const edgeKeys = ['Backspace', '\\', 'Enter', 'Shift'];
    const wideKeys = ['CapsLock', 'Enter', 'Shift', 'Backspace', 'Tab'];

    keys.forEach((pair, index) => {
      const keyBtn = document.createElement('button');
      const br = document.createElement('br');
      const keyValue = pair[1];
      const keyCode = pair[0];
      keyBtn.textContent = keyValue;
      keyBtn.classList.add('keyboard__key');
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

      if (wideKeys.includes(keyValue)) {
        keyBtn.classList.add('keyboard__key_wide');
      }

      // Special cases
      if (keyValue === 'Space') {
        keyBtn.classList.add('keyboard__key_space', 'Space');

        keyBtn.addEventListener('mousedown', () => {
          keyBtn.classList.add('keyboard__key_active');
          this.props.value += ' ';
          this.props.textArea.value = this.props.value;
        });

        keyBtn.addEventListener('mouseup', () => {
          keyBtn.classList.remove('keyboard__key_active');
        });

        keyBtn.addEventListener('keydown', (e) => this.downKey(e));
        keyBtn.addEventListener('keyup', (e) => this.upKey(e));
      } else if (keyValue === 'CapsLock') {
        keyBtn.classList.add(keyValue);

        keyBtn.addEventListener('mousedown', () => {
          this.toggleCapsLock();
          keyBtn.classList.toggle('keyboard__key_active', this.props.capsLock);
        });

        keyBtn.addEventListener('keydown', (e) => this.downKey(e));
        keyBtn.addEventListener('keyup', (e) => this.upKey(e));
      } else if (keyValue === 'Backspace') {
        keyBtn.classList.add(keyValue);

        keyBtn.addEventListener('mousedown', () => {
          keyBtn.classList.add('keyboard__key_active');
          this.props.value = this.props.value.substring(0, this.props.value.length - 1);
          this.props.textArea.value = this.props.value;
        });
        keyBtn.addEventListener('mouseup', () => {
          keyBtn.classList.remove('keyboard__key_active');
        });
      } else if (keyValue === 'Enter') {
        keyBtn.classList.add(keyValue);

        keyBtn.addEventListener('mousedown', () => {
          keyBtn.classList.add('keyboard__key_active');
          this.props.value += '\n';
          this.props.textArea.value = this.props.value;
        });

        keyBtn.addEventListener('mouseup', () => {
          keyBtn.classList.remove('keyboard__key_active');
        });

        keyBtn.addEventListener('keydown', (e) => this.downKey(e));
        keyBtn.addEventListener('keyup', (e) => this.upKey(e));
      } else if (keyValue === 'Tab') {
        keyBtn.classList.add(keyValue);

        keyBtn.addEventListener('mousedown', () => {
          keyBtn.classList.add('keyboard__key_active');
          this.props.value += '  ';
          this.props.textArea.value = this.props.value;
        });

        keyBtn.addEventListener('mouseup', () => {
          keyBtn.classList.remove('keyboard__key_active');
        });

        keyBtn.addEventListener('keydown', (e) => this.downKey(e));
        keyBtn.addEventListener('keyup', (e) => this.upKey(e));
      } else if (keyValue === 'Shift') {
        keyBtn.classList.add(keyCode);

        keyBtn.addEventListener('mousedown', () => {
          keyBtn.classList.add('keyboard__key_active');
          this.props.shift = true;
          this.toggleShift();
        });

        keyBtn.addEventListener('mouseup', () => {
          keyBtn.classList.remove('keyboard__key_active');
          this.props.shift = false;
          this.toggleShift();
        });

        keyBtn.addEventListener('keydown', (e) => this.downKey(e));
        keyBtn.addEventListener('keyup', (e) => this.upKey(e));
      } else {
        keyBtn.classList.add(keyCode);

        keyBtn.addEventListener('mousedown', () => {
          const keyBtns = document.querySelectorAll('.keyboard__key');
          keyBtns.forEach((k) => {
            if (this.props.capsLock || this.props.shift) {
              if (k.classList.contains(keyCode)) {
                this.props.value += k.textContent.toUpperCase();
              }
            } else if (!this.props.capsLock && !this.props.shift) {
              if (k.classList.contains(keyCode)) {
                this.props.value += k.textContent.toLowerCase();
              }
            }
          });
          keyBtn.classList.add('keyboard__key_active');
          this.props.textArea.value = this.props.value;
        });

        this.props.board.addEventListener('mouseup', () => {
          const keyBtns = document.querySelectorAll('.keyboard__key');

          keyBtns.forEach((keyElem) => {
            if (keyElem.classList.contains(keyCode)) {
              keyElem.classList.remove('keyboard__key_active');
            }
          });
        });

        keyBtn.addEventListener('keydown', (e) => this.downKey(e));
        keyBtn.addEventListener('keyup', (e) => this.upKey(e));
      }
    });
  }

  toggleCapsLock() {
    this.props.capsLock = !this.props.capsLock;
  }

  toggleShift() {
    const nonShiftSpecialKeys = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '[', ']', '\\', ';', "'", ',', '.', '/'];
    const shiftSpecialKeys = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'];
    const keyBtns = document.querySelectorAll('.keyboard__key');

    keyBtns.forEach((k) => {
      if (this.props.shift) {
        if (k.textContent.length === 1) {
          k.textContent = k.textContent.toUpperCase();
          if (nonShiftSpecialKeys.indexOf(k.textContent) !== -1) {
            k.textContent = shiftSpecialKeys[nonShiftSpecialKeys.indexOf(k.textContent)];
          }
        }
      } else if (!this.props.shift) {
        if (k.textContent.length === 1) {
          k.textContent = k.textContent.toLowerCase();
          if (shiftSpecialKeys.indexOf(k.textContent) !== -1) {
            k.textContent = nonShiftSpecialKeys[shiftSpecialKeys.indexOf(k.textContent)];
          }
        }
      }
    });
  }

  downKey(e) {
    const keyBtns = document.querySelectorAll('.keyboard__key');
    keyBtns.forEach((keyElem) => {
      if (keyElem.classList.contains(e.code)) {
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
        } else {
          if (this.props.capsLock || this.props.shift) {
            this.props.value += keyElem.textContent.toUpperCase();
          } else {
            this.props.value += keyElem.textContent.toLowerCase();
          }
          keyElem.classList.add('keyboard__key_active');
        }
      }
    });
    this.props.textArea.value = this.props.value;
  }

  upKey(e) {
    const keyBtns = document.querySelectorAll('.keyboard__key');
    keyBtns.forEach((keyElem) => {
      if (keyElem.classList.contains(e.code)) {
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

const keyboard = new Keyboard();
keyboard.createKeys();
