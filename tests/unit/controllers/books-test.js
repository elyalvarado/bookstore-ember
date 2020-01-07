import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | books', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:books');
    assert.ok(controller);
  });

  test('query params should be only limit', function(assert) {
    let controller = this.owner.lookup('controller:books');
    assert.equal(controller.queryParams.length, 1);
    assert.equal(controller.queryParams[0], 'limit');
  });

  test('has default limit to 5', function(assert) {
    let controller = this.owner.lookup('controller:books');
    assert.equal(controller.limit, 5);
  });

  test('total should be taken from the meta', function(assert) {
    let controller = this.owner.lookup('controller:books');
    controller.model = { meta: { total: 100 } }
    assert.equal(controller.total, 100);
  });

  test('showAll should be true if there are more books than in the model', function(assert) {
    let controller = this.owner.lookup('controller:books');
    controller.model = { meta: { total: 100 }, length: 15 }
    assert.equal(controller.showAll, true);
  });

  test('showAll should be false if all books are in the model', function(assert) {
    let controller = this.owner.lookup('controller:books');
    controller.model = { meta: { total: 100 }, length: 100 }
    assert.equal(controller.showAll, false);
  });
});
