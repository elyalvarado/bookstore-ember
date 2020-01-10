import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import ENV from 'bookstore/config/environment'

module('Unit | Adapter | application', function(hooks) {
  setupTest(hooks);

  test('it sets the host to the BACKEND_HOST variable set in ENV', function(assert) {
    ENV.BACKEND_HOST = 'http://example.com'
    let adapter = this.owner.lookup('adapter:application');
    assert.equal(adapter.host, 'http://example.com');
  });
});
