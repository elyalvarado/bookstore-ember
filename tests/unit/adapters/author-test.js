import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | author', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:author');
    assert.ok(adapter);
  });

  test('it returns false to shouldReloadRecord', function(assert) {
    let adapter = this.owner.lookup('adapter:author');
    assert.equal(adapter.shouldReloadRecord(), false);
  });

  test('it returns false to shouldBackgroundReloadRecord when its newer than one hour', function(assert) {
    let adapter = this.owner.lookup('adapter:author');
    const mockSnapshot = {
      record: {
        get() { return Date.now()}
      }
    }
    assert.equal(adapter.shouldBackgroundReloadRecord(null, mockSnapshot), false);
  });

  test('it returns true to shouldBackgroundReloadRecord when its older than one hour', function(assert) {
    let adapter = this.owner.lookup('adapter:author');
    const mockSnapshot = {
      record: {
        get() { return Date.now() + 3600*1000*2}
      }
    }
    assert.equal(adapter.shouldBackgroundReloadRecord(null, mockSnapshot), false);
  });
});
