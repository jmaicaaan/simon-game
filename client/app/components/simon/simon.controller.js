class SimonController {
  constructor($state, $stateParams) {
    "ngInject";
    this.name = 'simon';
    this.buttons = [];
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

  test = (i) => {
    alert(i);
  }
}

export default SimonController;
