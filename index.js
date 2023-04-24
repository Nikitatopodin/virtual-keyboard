class Keyboard {
  props = {
    textArea: null,
    wrapper: null,
    board: null,
    keys: [],
    capsLock: false,
    value: '',
    shiftLeft: false,
    shiftRight: false,
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
    const keys = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', 'left', 'down', 'right', 'DEL',
    ];

    const edgeKeys = ['Backspace', '\\', 'Enter', 'Shift'];
    const wideKeys = ['CapsLock', 'Enter', 'Shift', 'Backspace', 'Tab'];

    keys.forEach((key, index) => {
      const keyBtn = document.createElement('button');
      const br = document.createElement('br');

      keyBtn.textContent = key;
      keyBtn.classList.add('keyboard__key');
      this.props.board.append(keyBtn);

      // Adding break lines for correct keyboard display
      if (edgeKeys.includes(key)) {
        if (key === 'Shift' && keys[index - 1] === 'up') {
          this.props.board.append(br);
        }

        if (key !== 'Shift') {
          this.props.board.append(br);
        }
      }

      if (wideKeys.includes(key)) {
        keyBtn.classList.add('keyboard__key_wide');
      }

      // Special cases
      if (key === 'Space') {
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
      } else if (key === 'CapsLock') {
        keyBtn.classList.add(key);

        keyBtn.addEventListener('mousedown', () => {
          this.toggleCapsLock();
          keyBtn.classList.toggle('keyboard__key_active', this.props.capsLock);
        });

        keyBtn.addEventListener('keydown', (e) => this.downKey(e));
        keyBtn.addEventListener('keyup', (e) => this.upKey(e));
      } else if (key === 'Backspace') {
        keyBtn.addEventListener('mousedown', () => {
          this.props.value = this.props.value.substring(0, this.props.value.length - 1);
          this.props.textArea.value = this.props.value;
        });
      } else if (key === 'Enter') {
        keyBtn.classList.add(key);

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
      } else if (key === 'Tab') {
        keyBtn.classList.add(key);

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
      } else {
        keyBtn.classList.add(`Key${key.toUpperCase()}`);

        keyBtn.addEventListener('mousedown', () => {
          this.props.value += this.props.capsLock ? key.toUpperCase() : key.toLowerCase();
          keyBtn.classList.add('keyboard__key_active');
          this.props.textArea.value = this.props.value;
        });

        this.props.board.addEventListener('mouseup', () => {
          const keyBtns = document.querySelectorAll('.keyboard__key');

          keyBtns.forEach((keyElem) => {
            if (keyElem.classList.contains(`Key${keyElem.textContent[0].toUpperCase()}`)) {
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
        } else {
          if (this.props.capsLock) {
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
        } else {
          keyElem.classList.remove('keyboard__key_active');
        }
      }
    });
  }
}

const keyboard = new Keyboard();
keyboard.createKeys();
