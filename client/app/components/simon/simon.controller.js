import * as _ from 'lodash';

class SimonController {
  constructor($state, $stateParams, $timeout, $q) {
    "ngInject";
    this._$timeout = $timeout;
    this._$q = $q;
    this.name = 'simon';
    this.buttons = [];
    this.demoKeys = [];
    this.userKeys = [];
    this.isDemo = true;
    this.init();
  }

  init = () => {
    this.initializeButtons();
    this.start();
  };

  initializeButtons = () => {
    for (let i = 1; i <= 4; i++) {
      this.buttons.push({
        id: i,
        class: `key-button-${i}`,
      });
    }
  };

  addDemoKey = () => {
    this.demoKeys.push(this.getRandomNumber());
  };

  compareKeys = () => {
    let _copyDemoKeys = angular.copy(this.demoKeys);
    if (this.userKeys.length === this.demoKeys.length) {
      if (this.userKeys[0] === this.demoKeys[0]) { // compare first input since 
        this._$timeout(() => {
          this.playDemoKeys();
          this.userKeys = [];
        }, 1000);
      }
      else {
        // restart game
        console.log('wrong input', );
        console.log('this.userKeys[0]', this.userKeys[0]);
        console.log('this.demoKeys[0]', this.demoKeys[0]);
        this.restartGame();
      }
    } else {
      // compare the userkeys to demoKeys
      // compare the userkey's last pop item to the first of demoKeys
      let _copyDemoKeys = angular.copy(this.demoKeys);
      while (this.userKeys.length > 0) {
        let userKey = this.userKeys.pop();
        let demoKey = _copyDemoKeys.shift();
        console.log('userKey', userKey);
        console.log('demoKey', demoKey);
        if (userKey !== demoKey) {
          this.restartGame();
          return false;
        }
      }
    }
    console.log('this.userKeys', this.userKeys);
    console.log('this.demoKeys', this.demoKeys);
    // this.playDemoKeys();
  };

  getRandomNumber = () => {
    let randomNumber = Math.floor(Math.random(1 * 10) * 4) + 1;
    return randomNumber;
  };

  lightButton = (id) => {
    if (id) {
      let button = _.find(this.buttons, { id: id });
      if (button) {
        button.isLight = true;
        this._$timeout(() => {
          button.isLight = false;
        }, 1000);
      }
    }
  };

  onKeyPress = (buttonKey) => {
    this.userKeys.push(buttonKey.id);
    this.playSound(buttonKey.id)
      .then(() => {
        this.compareKeys();
      });
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
    this.lightButton(keyId);
    return new Audio(links[keyId])
      .play();
  };
  
  playDemoKeys = () => {
    this.isDemo = true;    
    this.addDemoKey();
    let promise = Promise.resolve();

    for (let i = 0; i <= this.demoKeys.length - 1; i++) {
      let key = this.demoKeys[i];
      promise = promise.then(() => {
        return new Promise((resolve) => {
          this._$timeout(() => {
            this.playSound(key);
            resolve();
          }, 1500);
        });
      });
    }
  };

  restartGame = () => {
    alert('Game will reset');
    this.demoKeys = [];
    this.userKeys = [];
    this.isDemo = true;
    this.start();
  };

  start = (clearDemoKeys) => {
    if (clearDemoKeys) this.demoKeys = [];
    if (this.isDemo) {
      this.playDemoKeys();
    }
  };
}

export default SimonController;
