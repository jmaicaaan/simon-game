class SimonController {
  constructor($state, $stateParams) {
    "ngInject";
    this.name = 'simon';
    this.buttons = [];
    this.demoKeys = [];
    this.userKeys = [];
    this.initializeButtons();
  }

  initializeButtons = () => {
    for (let i = 1; i <= 4; i++) {
      this.buttons.push({
        id: i,
        class: `key-button-${i}`,
        backslash: (i == 2 || i == 3)
      });
    }
  };

  start = (clearDemoKeys) => {
    if (clearDemoKeys) this.demoKeys = [];
  };

  addDemoKey = () => {
    this.demoKeys.push(this.getRandomNumber());
  };

  getRandomNumber = () => {
    let randomNumber = Math.floor(Math.random(1 * 10) * 4) + 1;
    return randomNumber;
  };
  // todo: pre-cache the mp3 resource
  playSound = (keyId) => {
    if (!keyId) return;
    let links = {
      1: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 
      2: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
      3: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 
      4: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
    };
    return new Audio(links[keyId])
      .play();
  };

  onKeyPress = (buttonKey) => {
    this.playSound(buttonKey.id);
  };
}

export default SimonController;
