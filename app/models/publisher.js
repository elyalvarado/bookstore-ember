import Model, {attr, hasMany} from '@ember-data/model';

export default class PublisherModel extends Model {
  @attr('string') name;
  @attr('number') discount;
  @hasMany('book', { polymorphic: true }) published;
}
