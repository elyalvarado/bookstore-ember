import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | books', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting / the books are shown', async function(assert) {
    let author = this.server.create('author')
    this.server.createList('book', 10, { author });

    await visit('/');

    assert.equal(currentURL(), '/');
    assert.ok(document.querySelector("body").textContent.match(/Bestselling Books/));
  });

  test('visiting / shows 5 books by default', async function(assert) {
    let author = this.server.create('author')
    this.server.createList('book', 10, { author });

    await visit('/');

    assert.equal(5, document.querySelectorAll('.book').length);
  });

  test('visiting / clicking the show all button shows all books', async function(assert) {
    let author = this.server.create('author')
    this.server.createList('book', 10, { author });

    await visit('/');

    let viewAllBtn = document.evaluate("//*[contains(text(),'View All')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    await click(viewAllBtn)

    assert.equal(10, document.querySelectorAll('.book').length);
  });

  test('visiting / clicking the buy button shows the purchase confirmation', async function(assert) {
    let author = this.server.create('author')
    this.server.create('book', { author });

    await visit('/');

    let buyBtn = document.evaluate("//*[contains(text(),'Buy')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    await click(buyBtn)

    assert.ok(document.querySelector('.modal'));
    assert.equal(document.querySelector('.modal h3').textContent,'Purchase confirmation');
  });

  test('visiting / showing the purchase confirmation dialog blurs the page', async function(assert) {
    let author = this.server.create('author')
    this.server.create('book', { author });

    await visit('/');

    let buyBtn = document.evaluate("//*[contains(text(),'Buy')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    await click(buyBtn)

    assert.ok(document.querySelector('header.blur-background'));
    assert.ok(document.querySelector('.container.blur-background'));
  });

  test('visiting / clicking the purchase button closes the dialog', async function(assert) {
    let author = this.server.create('author')
    this.server.create('book', { author });

    await visit('/');

    let buyBtn = document.evaluate("//*[contains(text(),'Buy')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    await click(buyBtn)

    await click('.modal span.btn')

    assert.notOk(document.querySelector('.modal'));
  });

  test('visiting / clicking the author name visits the author page', async function(assert) {
    let author = this.server.create('author')
    this.server.create('book', { author });

    await visit('/');

    await click('.book__description-author a')

    assert.equal(currentURL(), `/authors/${author.id}`);
  });
});
