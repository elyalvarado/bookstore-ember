import Model, { attr, belongsTo } from '@ember-data/model';

export default class BookModel extends Model {
  @attr('string') title;
  @attr('number') price;
  @belongsTo('author', { inverse: 'books' }) author;
  @belongsTo('publisher', { polymorphic: true, inverse: 'published' }) publisher;
}
