import { hasMany } from '@ember-data/model';
import PublisherModel from "./publisher"

export default class AuthorModel extends PublisherModel {
  @hasMany books;
}
