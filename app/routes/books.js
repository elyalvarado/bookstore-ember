import Route from '@ember/routing/route';

export default class BooksRoute extends Route {
  model() {
    return this.store.findAll('book')
  }
}
