import * as _ from 'lodash';

class SimonController {
  constructor($timeout, $q, $scope) {
    "ngInject";
    this._$timeout = $timeout;
    this._$q = $q;
    this.$scope = $scope;
    this.name = 'simon';
    this.isDemo = true;
    this.isStrictMode = true;
    this.isUserPressedWrongKey = false;
    this.isStart = true;
    this.isPowerOn = false;
    this.gameHasStarted = false;
    this.gameHasRestarted = false;
    this.buttons = [];
    this.demoKeys = [];
    this.userKeys = [];
    this.round = 1;
    this.totalRounds = 20;
    this.init();
  }

  init = () => {
    this.initializeButtons();
    this.start();
    this.startWatching();
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

  clearDemoKeys = () => {
    this.demoKeys = [];
  };

  clearUserKeys = () => {
    this.userKeys = [];
  }

  compareKeys = () => {
    let gameRestarted = false;
    this.userKeys.forEach((userKey, index) => {
      let demoKey = this.demoKeys[index];
      if (userKey !== demoKey) {
        alert('You pressed the wrong key!');
        this.isUserPressedWrongKey = true;
        gameRestarted = true;
        this.restartGame();
      }
    });

    if (gameRestarted) {
      return;
    }
    if (this.userKeys.length === this.demoKeys.length) {
      this.isUserPressedWrongKey = false;
      if (this.round === this.totalRounds) {
        alert('Game is done!');
        this.clearUserKeys();
        this.round = 1;
        this.start(true);
        return;
      }
      this._$timeout(() => {
        this.playDemoKeys();
        this.clearUserKeys();
        this.round++;
      }, 1000);
    }
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
    if (this.isDemo) {
      return;
    }
    if (!this.isStart && !this.isPowerOn) {
      return;
    }
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
    
    if (!this.isUserPressedWrongKey) {
      this.addDemoKey();
    }

    if (this.gameHasRestarted) {
      this.addDemoKey();
      this.gameHasRestarted = false;

    }
    
    let promise = Promise.resolve();

    for (let i = 0; i <= this.demoKeys.length - 1; i++) {
      let key = this.demoKeys[i];
      promise = promise.then(() => {
        return new Promise((resolve) => {
          this._$timeout(() => {
            this.playSound(key).then(() => {
              this.isDemo = false;
            });
            resolve();
          }, 1500);
        });
      });
    }
  };

  restartGame = () => {
    this.isDemo = true;
    this.clearUserKeys();
    if (this.isStrictMode) {
      this.gameHasRestarted = true;
      this.start(true);
      this.round = 1;
      alert('Game will reset');
      return;
    }
    // this.start();
  };

  start = (clearDemoKeys) => {
    if (this.isPowerOn && this.isStart) {
      if (clearDemoKeys) {
        this.clearDemoKeys();
      }
      if (this.isDemo) {
        this.playDemoKeys();
      }
    }
  };

  startWatching = () => {
    this.$scope.$watch(() => {
      return this.isPowerOn;
    }, (newVal, oldVal) => {
      if (this.isStart && newVal) {
        this.isDemo = true;
        this.start();
      } else {
        this.clearDemoKeys();
      }
    });

    this.$scope.$watch(() => {
      return this.isStart;
    }, (newVal, oldVal) => {
      if (this.isPowerOn && newVal) {
        this.isDemo = true;
        this.start();
      } else {
        this.clearDemoKeys();
      }
    });
  };
}

export default SimonController;
