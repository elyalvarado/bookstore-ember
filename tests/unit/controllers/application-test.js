import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | application', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:application');
    assert.ok(controller);
  });

  test('toggles dark class on the body on toggleDarkLightTheme', function(assert) {
    let controller = this.owner.lookup('controller:application');
    controller.toggleDarkLightTheme()
    assert.ok(document.querySelector("body").classList.contains("dark"))
  })
});
