class HomeController {
  constructor($state) {
    "ngInject";
    this._$state = $state;
    this.text = 'Hola Amigo';
    this.init();
  };
  
  init = () => {
    this._$state.go('simon');
  };
}

export default HomeController;
