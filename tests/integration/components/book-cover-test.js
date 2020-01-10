import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | book-cover', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('book',{ title: 'Test Title', author: { name: 'Test Author' }, reload() { return Promise.resolve(this) }});
    this.set('blurBackground', () => null);
  })

  test('it renders the Book title', async function(assert) {
    await render(hbs`<BookCover @book={{this.book}} @blurBackground={{this.blurBackground}}/>`);

    assert.ok(/Test Title/.test(this.element.textContent.trim()));
  });

  test('it renders the Book Author', async function(assert) {
    await render(hbs`<BookCover @book={{this.book}} @blurBackground={{this.blurBackground}}/>`);

    assert.ok(/Test Author/.test(this.element.textContent.trim()));
  });

  test('by default does not show the purchase confirmation', async function(assert) {
    await render(hbs`<BookCover @book={{this.book}} @blurBackground={{this.blurBackground}}/>`);

    assert.notOk(/Purchase confirmation/.test(this.element.textContent.trim()));
  });

  test('it shows the purchase confirmation modal when clicking on the buy button', async function(assert) {
    await render(hbs`<BookCover @book={{this.book}} @blurBackground={{this.blurBackground}}/>`);

    await click(".book__description-buy")

    assert.ok(/Purchase confirmation/.test(this.element.textContent.trim()));
  });

  test('it shows the purchase confirmation modal when clicking on the book cover', async function(assert) {
    await render(hbs`<BookCover @book={{this.book}} @blurBackground={{this.blurBackground}}/>`);

    await click(".book__cover")

    assert.ok(/Purchase confirmation/.test(this.element.textContent.trim()));
  });

  test('it dismisses the purchase confirmation modal when clicking the purchase button', async function(assert) {
    await render(hbs`<BookCover @book={{this.book}} @blurBackground={{this.blurBackground}}/>`);

    await click(".book__cover")

    await click(".modal .btn")

    assert.notOk(/Purchase confirmation/.test(this.element.textContent.trim()));
  });

  test('it calls reload on the book model before opening the dialog', async function(assert) {
    let reloaded = false
    this.book.reload = () => {
      reloaded = true
      return Promise.resolve(this.book)
    }
    await render(hbs`<BookCover @book={{this.book}} @blurBackground={{this.blurBackground}}/>`);

    await click(".book__cover")

    assert.equal(reloaded, true);
  });
});
