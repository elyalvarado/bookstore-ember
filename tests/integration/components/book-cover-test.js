import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | book-cover', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the Book title', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('book',{ title: 'Test Title', author: { name: 'Test Author' }});

    await render(hbs`<BookCover @book={{this.book}}/>`);

    assert.ok(/Test Title/.test(this.element.textContent.trim()));
  });

  test('it renders the Book Author', async function(assert) {
    this.set('book',{ title: 'Test Title', author: { name: 'Test Author' }});

    await render(hbs`<BookCover @book={{this.book}}/>`);

    assert.ok(/Test Author/.test(this.element.textContent.trim()));
  });

  test('by default does not show the purchase confirmation', async function(assert) {
    this.set('book',{ title: 'Test Title', author: { name: 'Test Author' }});

    await render(hbs`<BookCover @book={{this.book}}/>`);

    assert.notOk(/Purchase confirmation/.test(this.element.textContent.trim()));
  });

  test('it shows the purchase confirmation modal when clicking on itself', async function(assert) {
    this.set('book',{ title: 'Test Title', author: { name: 'Test Author' }});

    await render(hbs`<BookCover @book={{this.book}}/>`);

    await click("li")

    assert.ok(/Purchase confirmation/.test(this.element.textContent.trim()));
  });

  test('it dismisses the purchase confirmation modal when clicking the purchase button', async function(assert) {
    this.set('book',{ title: 'Test Title', author: { name: 'Test Author' }});

    await render(hbs`<BookCover @book={{this.book}}/>`);

    await click("li")

    await click("button")

    assert.notOk(/Purchase confirmation/.test(this.element.textContent.trim()));
  });
});
