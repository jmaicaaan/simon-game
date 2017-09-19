import SimonModule from './simon';
import SimonController from './simon.controller';
import SimonComponent from './simon.component';
import SimonTemplate from './simon.html';

describe('Simon', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SimonModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SimonController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(SimonTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = SimonComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(SimonTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(SimonController);
    });
  });
});
