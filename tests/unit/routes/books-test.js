import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | books', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:books');
    assert.ok(route);
  });

  test('toggleShowAll action transitions with queryParams limit equal to total from the controller', function(assert) {
    let route = this.owner.lookup('route:books');
    let transitionToArgs = {}
    route.controllerFor = modelName => ({
      get(key) { return modelName === "books" && key === "total" ? 100 : undefined },
    })
    route.transitionTo = args => { transitionToArgs = args }

    route.toggleShowAll()

    assert.equal(transitionToArgs.queryParams.limit, 100);
  });
});
