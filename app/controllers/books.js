import Controller from '@ember/controller';

export default class BooksController extends Controller {
  queryParams = ['limit']
  limit = 5

  get total() {
    return this.model.meta.total
  }

  get showAll() {
    return this.total > this.model.length
  }
}
