class Keyboard {

  props = {
    board: null,
    keys: [],
    capsLock: false
  }

  constructor() {
    this.props.board = document.createElement("div");
    this.props.board.classList.add('keyboard');
    document.body.append(this.props.board);
  }

  createKeys() {
    const keys = [
      "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "Backspace",
      "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", 'DEL',
      "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
      "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "w", "Shift",
      "Ctrl", "Win", "Alt", "Spacebar", "Alt", "Ctrl", "a", "s", "d"
    ]

    keys.forEach(key => {
      const keyBtn = document.createElement("button");

      keyBtn.textContent = key;
      this.props.board.append(keyBtn);

    })

  }
}

let keyboard = new Keyboard();
keyboard.createKeys();