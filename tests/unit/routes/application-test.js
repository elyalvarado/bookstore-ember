import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:application');
    assert.ok(route);
  });

  test('it changes the blur on the application controller', function(assert) {
    let route = this.owner.lookup('route:application');
    const mockController = {
      blur: false,
      set(key, value) {
        this.blur = value
      }
    }
    const mockControllerFor = controllerName => controllerName == 'application' ? mockController : {}
    route.controllerFor = mockControllerFor

    route.blurBackground(true)

    assert.equal(true, mockController.blur);
  });
});
