import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('book',{ title: 'Test Title', author: { name: 'Test Author' }});

    await render(hbs`<BookCover @book={{this.book}}/>`);

    assert.ok(/Test Author/.test(this.element.textContent.trim()));
  });
});
