import Route from '@ember/routing/route';
import { action } from "@ember/object";

export default class BooksRoute extends Route {
  queryParams = {
    limit: {
      refreshModel: true
    }
  }

  model(params) {
    return this.store.query('book', params)
  }

  @action
  toggleShowAll() {
    const total = this.controllerFor('books').get('total');
    this.transitionTo({ queryParams: { limit: total }})
  }
}
