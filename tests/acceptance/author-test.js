import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | author', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /authors/:id the author information is shown', async function(assert) {
    let name = 'Yehuda Katz'
    let bio = 'Ember creator'
    let author = this.server.create('author', { name, bio })
    this.server.createList('book', 2, { author });

    await visit(`/authors/${author.id}`);

    assert.equal(currentURL(), `/authors/${author.id}`);
    assert.ok(document.querySelector("body").textContent.match(/Highlighted Author/));
    assert.ok(document.querySelector("body").textContent.match(/Yehuda Katz/));
    assert.ok(document.querySelector("body").textContent.match(/Ember creator/));
  });

  test('visiting /authors/:id the author books are shown', async function(assert) {
    let author = this.server.create('author')
    let anotherAuthor = this.server.create('author')
    this.server.createList('book', 2, { author });
    this.server.create('book', { author: anotherAuthor });

    await visit(`/authors/${author.id}`);

    assert.equal(currentURL(), `/authors/${author.id}`);
    assert.equal(2, document.querySelectorAll('.book').length);
  });

  test('visiting /authors/:id clicking the buy button shows the purchase confirmation', async function(assert) {
    let author = this.server.create('author')
    this.server.create('book', { author });

    await visit(`/authors/${author.id}`);

    let buyBtn = document.evaluate("//*[contains(text(),'Buy')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    await click(buyBtn)

    assert.ok(document.querySelector('.modal'));
    assert.equal(document.querySelector('.modal h3').textContent,'Purchase confirmation');
  });

  test('visiting /authors/:id showing the purchase confirmation dialog blurs the page', async function(assert) {
    let author = this.server.create('author')
    this.server.create('book', { author });

    await visit(`/authors/${author.id}`);

    let buyBtn = document.evaluate("//*[contains(text(),'Buy')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    await click(buyBtn)

    assert.ok(document.querySelector('header.blur-background'));
    assert.ok(document.querySelector('.container.blur-background'));
  });

  test('visiting /authors/:id clicking the purchase button in the purchase confirmation dialog closes it', async function(assert) {
    let author = this.server.create('author')
    this.server.create('book', { author });

    await visit(`/authors/${author.id}`);

    let buyBtn = document.evaluate("//*[contains(text(),'Buy')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    await click(buyBtn)

    await click('.modal span.btn')

    assert.notOk(document.querySelector('.modal'));
  });

  test('visiting /authors/:id clicking the page title returns to the main page', async function(assert) {
    let author = this.server.create('author')
    this.server.create('book', { author });

    await visit(`/authors/${author.id}`);

    await click('.page-title a')

    assert.equal(currentURL(), '/');
    // assert.equal(document.documentElement.innerHTML, 10 );
  });
});
